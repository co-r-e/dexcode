import type { DeckConfig, SlideFrontmatter } from "@/types/deck";

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;

const DEFAULT_BACKGROUND = "#FFFFFF";

export function resolveSlideBackground(
  frontmatter: SlideFrontmatter,
  config: DeckConfig,
): string {
  return (
    frontmatter.background ?? config.theme.colors.background ?? DEFAULT_BACKGROUND
  );
}
