"use client";

import { useState, useCallback, useRef } from "react";

interface UseSlideNavigationOptions {
  totalSlides: number;
  onSlideChange?: (index: number) => void;
}

export function useSlideNavigation({
  totalSlides,
  onSlideChange,
}: UseSlideNavigationOptions) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const currentSlideRef = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(totalSlides - 1, index));
      currentSlideRef.current = clamped;
      setCurrentSlide(clamped);
      onSlideChange?.(clamped);
    },
    [totalSlides, onSlideChange],
  );

  const next = useCallback(() => {
    goTo(currentSlideRef.current + 1);
  }, [goTo]);

  const previous = useCallback(() => {
    goTo(currentSlideRef.current - 1);
  }, [goTo]);

  const first = useCallback(() => goTo(0), [goTo]);
  const last = useCallback(() => goTo(totalSlides - 1), [goTo, totalSlides]);

  return {
    currentSlide,
    goTo,
    next,
    previous,
    first,
    last,
  };
}
