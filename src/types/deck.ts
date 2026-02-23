export type SlideType = "cover" | "section" | "content";
export type TransitionType = "fade" | "slide" | "none";

export type LogoPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type FooterPosition = "bottom-left" | "bottom-center" | "bottom-right";

export interface SlideFrontmatter {
  type: SlideType;
  transition?: TransitionType;
  notes?: string;
  background?: string;
}

export interface DeckConfig {
  title: string;
  logo?: {
    src: string;
    position: LogoPosition;
  };
  copyright?: {
    text: string;
    position: FooterPosition;
  };
  pageNumber?: {
    position: FooterPosition;
    startFrom?: number;
    hideOnCover?: boolean;
  };
  theme: {
    colors: {
      primary: string;
      secondary?: string;
      background?: string;
      text?: string;
    };
    fonts?: {
      heading?: string;
      body?: string;
    };
  };
  transition?: TransitionType;
}

export interface SlideData {
  index: number;
  filename: string;
  frontmatter: SlideFrontmatter;
  rawContent: string;
  notes?: string;
}

export interface DeckSummary {
  name: string;
  title: string;
  slideCount: number;
}

export interface Deck {
  name: string;
  config: DeckConfig;
  slides: SlideData[];
}
