"use client";

import { useCallback } from "react";
import { useSlideNavigation } from "./useSlideNavigation";
import { usePresenterSync } from "./usePresenterSync";
import { useKeyboardNavigation } from "./useKeyboardNavigation";

interface UseDeckNavigationOptions {
  deckName: string;
  totalSlides: number;
  role: "viewer" | "presenter";
  keyboard?: {
    onEscape?: () => void;
    onFullscreen?: () => void;
  };
}

export function useDeckNavigation({
  deckName,
  totalSlides,
  role,
  keyboard,
}: UseDeckNavigationOptions) {
  const { currentSlide, goTo, next, previous } = useSlideNavigation({
    totalSlides,
  });

  const { broadcastNavigation } = usePresenterSync({
    deckName,
    role,
    currentSlide,
    totalSlides,
    onNavigate: goTo,
  });

  const handleNavigate = useCallback(
    (index: number) => {
      goTo(index);
      broadcastNavigation(index);
    },
    [goTo, broadcastNavigation],
  );

  const handleNext = useCallback(() => {
    next();
    broadcastNavigation(Math.min(currentSlide + 1, totalSlides - 1));
  }, [next, broadcastNavigation, currentSlide, totalSlides]);

  const handlePrevious = useCallback(() => {
    previous();
    broadcastNavigation(Math.max(currentSlide - 1, 0));
  }, [previous, broadcastNavigation, currentSlide]);

  useKeyboardNavigation({
    onNext: handleNext,
    onPrevious: handlePrevious,
    onFirst: () => handleNavigate(0),
    onLast: () => handleNavigate(totalSlides - 1),
    onEscape: keyboard?.onEscape,
    onFullscreen: keyboard?.onFullscreen,
  });

  return { currentSlide, handleNavigate };
}
