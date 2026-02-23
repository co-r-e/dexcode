import type { MDXComponents } from "mdx/types";
import { SlideH1, SlideH2, SlideH3 } from "./typography/Headings";
import { SlideParagraph } from "./typography/Paragraph";
import { SlideBlockquote } from "./typography/Blockquote";
import { SlideCode, SlidePreCode } from "./CodeBlock";
import { SlideImage } from "./SlideImage";
import { SlideTable, SlideTh, SlideTd } from "./SlideTable";
import { Columns, Column } from "./layout/Columns";
import { Chart } from "./Chart";
import { Icon } from "./Icon";
import { Shape } from "./Shape";
import { Video } from "./Video";
import { Fragment } from "./Fragment";

export const slideComponents: MDXComponents = {
  h1: SlideH1,
  h2: SlideH2,
  h3: SlideH3,
  p: SlideParagraph,
  blockquote: SlideBlockquote,
  code: SlideCode,
  pre: SlidePreCode,
  img: SlideImage,
  table: SlideTable,
  th: SlideTh,
  td: SlideTd,
  ul: (props) => <ul className="mb-6 list-disc space-y-3 pl-12 text-4xl" {...props} />,
  ol: (props) => <ol className="mb-6 list-decimal space-y-3 pl-12 text-4xl" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  hr: () => <hr className="my-8 border-t-2 border-gray-200" />,
  a: (props) => (
    <a
      className="text-4xl underline decoration-2 underline-offset-4"
      style={{ color: "var(--slide-primary)" }}
      {...props}
    />
  ),
  // Custom components (available in MDX as <ComponentName />)
  Columns,
  Column,
  Chart,
  Icon,
  Shape,
  Video,
  Fragment,
};
