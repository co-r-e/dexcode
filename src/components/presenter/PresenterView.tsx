"use client";

import { useEffect, useMemo } from "react";
import type { Deck } from "@/types/deck";
import { SLIDE_WIDTH, SLIDE_HEIGHT, resolveSlideBackground } from "@/lib/slide-utils";
import { SlideContent } from "@/components/slide/SlideContent";
import { SlideOverlay } from "@/components/slide/SlideOverlay";
import { useDeckNavigation } from "@/hooks/useDeckNavigation";
import { useSlideScale } from "@/hooks/useSlideScale";

interface PresenterViewProps {
  deck: Deck;
}

function toggleFullscreen(): void {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen().catch(() => {});
  }
}

export function PresenterView({ deck }: PresenterViewProps) {
  const { containerRef, scale } = useSlideScale();

  const keyboard = useMemo(
    () => ({
      onEscape: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      },
      onFullscreen: toggleFullscreen,
    }),
    [],
  );

  const { currentSlide } = useDeckNavigation({
    deckName: deck.name,
    totalSlides: deck.slides.length,
    role: "presenter",
    keyboard,
  });

  // Auto-enter fullscreen on mount
  useEffect(() => {
    document.documentElement.requestFullscreen().catch(() => {});
  }, []);

  const slide = deck.slides[currentSlide];
  if (!slide) return null;

  const bg = resolveSlideBackground(slide.frontmatter, deck.config);

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen bg-black overflow-hidden cursor-none"
    >
      <div className="flex h-screen w-screen items-center justify-center">
        <div
          style={{
            width: SLIDE_WIDTH,
            height: SLIDE_HEIGHT,
            background: bg,
            transform: scale != null ? `scale(${scale})` : undefined,
            opacity: scale != null ? 1 : 0,
            flexShrink: 0,
          }}
        >
          <div className="relative h-full w-full p-16">
            <SlideOverlay
              config={deck.config}
              currentPage={currentSlide}
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
      </div>
    </div>
  );
}
