import type { ComponentPropsWithoutRef } from "react";

export function SlideParagraph(props: ComponentPropsWithoutRef<"p">) {
  return <p className="mb-6 text-4xl leading-relaxed" {...props} />;
}
