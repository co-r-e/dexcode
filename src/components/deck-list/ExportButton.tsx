"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Download, Loader2 } from "lucide-react";
import type { Deck } from "@/types/deck";
import { SLIDE_WIDTH, SLIDE_HEIGHT, resolveSlideBackground } from "@/lib/slide-utils";
import { SlideContent } from "@/components/slide/SlideContent";
import { SlideOverlay } from "@/components/slide/SlideOverlay";
import {
  captureSlide,
  extractSlideContent,
  savePdf,
  savePptx,
  saveNativePptx,
  type NativeSlideContent,
} from "@/lib/export";

type ExportFormat = "pdf" | "pptx-image" | "pptx-native";
type ExportPhase = "idle" | "menu" | "fetching" | "capturing" | "generating" | "error";

/** Generate a proper blank slide PNG at full resolution via canvas. */
function createBlankSlideDataUrl(): string {
  const canvas = document.createElement("canvas");
  canvas.width = SLIDE_WIDTH;
  canvas.height = SLIDE_HEIGHT;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);
  return canvas.toDataURL("image/png");
}

const FORMAT_LABELS: Record<ExportFormat, string> = {
  pdf: "PDF",
  "pptx-image": "PPTX",
  "pptx-native": "PPTX",
};

const MENU_ITEM_CLASS =
  "flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors";

interface ExportButtonProps {
  deckName: string;
}

export function ExportButton({ deckName }: ExportButtonProps) {
  const [phase, setPhase] = useState<ExportPhase>("idle");
  const [format, setFormat] = useState<ExportFormat>("pdf");
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [deck, setDeck] = useState<Deck | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);
  const imagesRef = useRef<string[]>([]);
  const nativeSlidesRef = useRef<NativeSlideContent[]>([]);
  const abortRef = useRef<AbortController | null>(null);
  const exportingRef = useRef(false);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (phase === "idle") setPhase("menu");
      else if (phase === "menu") setPhase("idle");
    },
    [phase],
  );

  useEffect(() => {
    if (phase !== "menu") return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPhase("idle");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [phase]);

  const resetExportState = useCallback(() => {
    imagesRef.current = [];
    nativeSlidesRef.current = [];
    setDeck(null);
    setProgress({ current: 0, total: 0 });
    exportingRef.current = false;
  }, []);

  const startExport = useCallback(
    async (selectedFormat: ExportFormat) => {
      if (exportingRef.current) return;
      exportingRef.current = true;

      setFormat(selectedFormat);
      setPhase("fetching");
      cancelledRef.current = false;
      imagesRef.current = [];
      nativeSlidesRef.current = [];

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const timeout = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(
          `/api/decks/${encodeURIComponent(deckName)}/data`,
          { signal: controller.signal },
        );
        clearTimeout(timeout);

        if (!res.ok) throw new Error("Failed to load deck data");
        const deckData: Deck = await res.json();

        if (cancelledRef.current) {
          resetExportState();
          return;
        }

        if (deckData.slides.length === 0) throw new Error("Deck has no slides");

        setDeck(deckData);
        setProgress({ current: 0, total: deckData.slides.length });
        setCurrentSlideIndex(0);
        setPhase("capturing");
      } catch {
        if (!cancelledRef.current) {
          setPhase("error");
          setTimeout(() => setPhase("idle"), 3000);
        }
        resetExportState();
      }
    },
    [deckName, resetExportState],
  );

  // Sequential processing: capture or extract each slide.
  // Double rAF ensures React has flushed all state updates (including
  // MDXRenderer's setContent(null)) before we start waiting for "ready".
  useEffect(() => {
    if (phase !== "capturing" || !deck) return;

    let cancelled = false;

    const outerFrame = requestAnimationFrame(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled || cancelledRef.current || !containerRef.current) return;

        (async () => {
          try {
            const slide = deck.slides[currentSlideIndex];
            const bg = resolveSlideBackground(slide.frontmatter, deck.config);

            if (format === "pptx-native") {
              const content = await extractSlideContent(
                containerRef.current!,
                bg,
                currentSlideIndex,
                slide.frontmatter.type,
              );
              nativeSlidesRef.current.push(content);
            } else {
              const dataUrl = await captureSlide(containerRef.current!);
              imagesRef.current.push(dataUrl);
            }
          } catch (err) {
            console.warn(`[nipry] Slide ${currentSlideIndex + 1} export failed:`, err);
            if (format !== "pptx-native") {
              imagesRef.current.push(createBlankSlideDataUrl());
            }
          }

          if (cancelled || cancelledRef.current) return;

          const nextIndex = currentSlideIndex + 1;
          setProgress({ current: nextIndex, total: deck.slides.length });

          if (nextIndex < deck.slides.length) {
            setCurrentSlideIndex(nextIndex);
          } else {
            setPhase("generating");
            await new Promise((r) => setTimeout(r, 50));

            try {
              if (format === "pdf") {
                savePdf(deck.name, imagesRef.current);
              } else if (format === "pptx-image") {
                await savePptx(deck.name, imagesRef.current);
              } else {
                await saveNativePptx(deck.name, nativeSlidesRef.current, deck.config);
              }
            } catch (err) {
              console.error("[nipry] Export generation failed:", err);
            }

            if (!cancelledRef.current) {
              resetExportState();
              setPhase("idle");
            }
          }
        })();
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(outerFrame);
    };
  }, [phase, deck, currentSlideIndex, format, resetExportState]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      abortRef.current?.abort();
      imagesRef.current = [];
      nativeSlidesRef.current = [];
    };
  }, []);

  const slide = deck?.slides[currentSlideIndex];

  const isWorking = phase === "fetching" || phase === "capturing" || phase === "generating";

  function renderButtonContent(): React.ReactNode {
    switch (phase) {
      case "idle":
      case "menu":
        return (
          <>
            <Download className="h-4 w-4" />
            <span>Export</span>
          </>
        );
      case "fetching":
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </>
        );
      case "capturing":
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              {FORMAT_LABELS[format]} {progress.current}/{progress.total}
            </span>
          </>
        );
      case "generating":
        return (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Generating...</span>
          </>
        );
      case "error":
        return <span className="text-red-300">Error</span>;
    }
  }

  function handleMenuItemClick(e: React.MouseEvent, selectedFormat: ExportFormat): void {
    e.preventDefault();
    e.stopPropagation();
    startExport(selectedFormat);
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={handleButtonClick}
        disabled={isWorking}
        className="flex items-center gap-1.5 rounded-lg bg-[#02001A] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#1a1a3a] disabled:opacity-50 disabled:cursor-not-allowed"
        title={`Export ${deckName}`}
      >
        {renderButtonContent()}
      </button>

      {phase === "menu" && (
        <div className="absolute right-0 top-full mt-1 z-20 w-44 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden">
          <button onClick={(e) => handleMenuItemClick(e, "pdf")} className={MENU_ITEM_CLASS}>
            PDF
          </button>
          <button onClick={(e) => handleMenuItemClick(e, "pptx-image")} className={MENU_ITEM_CLASS}>
            <span>PPTX<span className="ml-1.5 text-xs text-gray-400">Image</span></span>
          </button>
          <button onClick={(e) => handleMenuItemClick(e, "pptx-native")} className={MENU_ITEM_CLASS}>
            <span>PPTX<span className="ml-1.5 text-xs text-gray-400">Text</span></span>
          </button>
        </div>
      )}

      {phase === "capturing" && deck && slide &&
        createPortal(
          <div
            aria-hidden
            style={{ position: "fixed", left: -9999, top: 0, pointerEvents: "none" }}
          >
            <div
              ref={containerRef}
              className={typeof document !== "undefined" ? document.body.className : ""}
              style={{
                width: SLIDE_WIDTH,
                height: SLIDE_HEIGHT,
                background: resolveSlideBackground(slide.frontmatter, deck.config),
                overflow: "hidden",
              }}
            >
              <div className="relative h-full w-full p-16">
                <SlideOverlay
                  config={deck.config}
                  currentPage={currentSlideIndex}
                  slideType={slide.frontmatter.type}
                  deckName={deck.name}
                />
                <SlideContent
                  slide={slide}
                  config={deck.config}
                  deckName={deck.name}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
