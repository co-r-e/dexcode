import type { ComponentPropsWithoutRef } from "react";

export function SlideBlockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="my-6 border-l-4 pl-6 text-4xl italic text-gray-600"
      style={{ borderColor: "var(--slide-primary)" }}
      {...props}
    />
  );
}
