"use client";

import type { DeckConfig, LogoPosition, FooterPosition, SlideType } from "@/types/deck";
import { cn } from "@/lib/utils";

interface SlideOverlayProps {
  config: DeckConfig;
  currentPage: number;
  slideType: SlideType;
  deckName: string;
}

const positionClasses: Record<LogoPosition | FooterPosition, string> = {
  "top-left": "top-6 left-6",
  "top-center": "top-6 left-1/2 -translate-x-1/2",
  "top-right": "top-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-6 right-6",
};

export function SlideOverlay({
  config,
  currentPage,
  slideType,
  deckName,
}: SlideOverlayProps) {
  const hidePageOnCover =
    config.pageNumber?.hideOnCover !== false && slideType === "cover";

  return (
    <>
      {config.logo && (
        <div
          className={cn(
            "absolute z-10",
            positionClasses[config.logo.position],
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveAssetPath(config.logo.src, deckName)}
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>
      )}

      {config.copyright && (
        <div
          className={cn(
            "absolute z-10 text-xl text-gray-400",
            positionClasses[config.copyright.position],
          )}
        >
          {config.copyright.text}
        </div>
      )}

      {config.pageNumber && !hidePageOnCover && (
        <div
          className={cn(
            "absolute z-10 text-xl text-gray-400",
            positionClasses[config.pageNumber.position],
          )}
        >
          {currentPage + (config.pageNumber.startFrom ?? 1)}
        </div>
      )}
    </>
  );
}

function resolveAssetPath(src: string, deckName: string): string {
  if (src.startsWith("http") || src.startsWith("/")) return src;
  const encoded = encodeURIComponent(deckName);
  if (src.startsWith("./assets/")) {
    return `/api/decks/${encoded}/${src.slice(2)}`;
  }
  return `/api/decks/${encoded}/assets/${src}`;
}
