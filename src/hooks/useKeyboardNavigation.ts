"use client";

import { useEffect, useCallback } from "react";

interface UseKeyboardNavigationOptions {
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
  onEscape?: () => void;
  onFullscreen?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  onNext,
  onPrevious,
  onFirst,
  onLast,
  onEscape,
  onFullscreen,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      const target = e.target as HTMLElement;
      const tag = target.tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "VIDEO" ||
        target.isContentEditable
      ) return;

      // Preserve Space/Enter for native button/link activation
      const isActivatable = tag === "BUTTON" || tag === "A";

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          onPrevious();
          break;
        case " ":
        case "Enter":
          if (isActivatable) return;
          e.preventDefault();
          onNext();
          break;
        case "Home":
          e.preventDefault();
          onFirst();
          break;
        case "End":
          e.preventDefault();
          onLast();
          break;
        case "Escape":
          e.preventDefault();
          onEscape?.();
          break;
        case "f":
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            onFullscreen?.();
          }
          break;
      }
    },
    [enabled, onNext, onPrevious, onFirst, onLast, onEscape, onFullscreen],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
