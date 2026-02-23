"use client";

import { useCallback } from "react";
import type { Deck } from "@/types/deck";
import { SLIDE_WIDTH, SLIDE_HEIGHT, resolveSlideBackground } from "@/lib/slide-utils";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SlideContent } from "@/components/slide/SlideContent";
import { SlideOverlay } from "@/components/slide/SlideOverlay";
import { useDeckNavigation } from "@/hooks/useDeckNavigation";
import { useSlideScale } from "@/hooks/useSlideScale";

interface SlideViewerProps {
  deck: Deck;
}

export function SlideViewer({ deck }: SlideViewerProps) {
  const { containerRef, scale } = useSlideScale({ padding: 64 });

  const { currentSlide, handleNavigate } = useDeckNavigation({
    deckName: deck.name,
    totalSlides: deck.slides.length,
    role: "viewer",
  });

  const handlePresenterMode = useCallback(() => {
    window.open(`/${deck.name}/presenter`, "nipry-presenter");
  }, [deck.name]);

  const slide = deck.slides[currentSlide];
  if (!slide) return null;

  const bg = resolveSlideBackground(slide.frontmatter, deck.config);

  return (
    <div className="flex h-screen">
      <Sidebar
        deck={deck}
        currentSlide={currentSlide}
        onSlideSelect={handleNavigate}
        onPresenterMode={handlePresenterMode}
      />

      <main
        ref={containerRef}
        className="flex flex-1 items-center justify-center bg-[#F0F2F5] overflow-hidden"
      >
        <div
          className="shadow-xl"
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
      </main>
    </div>
  );
}
