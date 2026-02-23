"use client";

import { MDXRenderer } from "@/lib/mdx-runtime";
import type { SlideData, DeckConfig } from "@/types/deck";
import { slideComponents } from "@/components/mdx";

interface SlideContentProps {
  slide: SlideData;
  config: DeckConfig;
  deckName: string;
}

export function SlideContent({ slide, config, deckName }: SlideContentProps) {
  const themeStyle = {
    "--slide-primary": config.theme.colors.primary,
    "--slide-secondary": config.theme.colors.secondary ?? config.theme.colors.primary,
    "--slide-bg": slide.frontmatter.background ?? config.theme.colors.background ?? "#FFFFFF",
    "--slide-text": config.theme.colors.text ?? "#1a1a1a",
    "--slide-font-heading": config.theme.fonts?.heading ?? "Inter, sans-serif",
    "--slide-font-body": config.theme.fonts?.body ?? "Noto Sans JP, sans-serif",
  } as React.CSSProperties;

  // Transform relative asset paths in MDX content (both markdown and JSX attributes)
  const apiBase = `/api/decks/${encodeURIComponent(deckName)}/assets/`;
  const processedContent = slide.rawContent
    .replace(/\(\.\/assets\//g, `(${apiBase}`)
    .replace(/"\.\/assets\//g, `"${apiBase}`)
    .replace(/'\.\/assets\//g, `'${apiBase}`);

  return (
    <div
      className="h-full w-full"
      style={{
        ...themeStyle,
        color: "var(--slide-text)",
        fontFamily: "var(--slide-font-body)",
      }}
    >
      <MDXRenderer source={processedContent} components={slideComponents} />
    </div>
  );
}
