"use client";

import { useEffect, useRef, useState } from "react";
import { SLIDE_WIDTH, SLIDE_HEIGHT } from "@/lib/slide-utils";

interface UseSlideScaleOptions {
  padding?: number;
}

export function useSlideScale({ padding = 0 }: UseSlideScaleOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setScale(
          Math.min(
            (width - padding) / SLIDE_WIDTH,
            (height - padding) / SLIDE_HEIGHT,
          ),
        );
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [padding]);

  return { containerRef, scale };
}
