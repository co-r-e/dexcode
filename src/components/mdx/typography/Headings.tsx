import type { ComponentPropsWithoutRef } from "react";

export function SlideH1(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className="mb-8 text-6xl font-bold leading-tight"
      style={{ color: "var(--slide-primary)", fontFamily: "var(--slide-font-heading)" }}
      {...props}
    />
  );
}

export function SlideH2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mb-6 text-4xl font-semibold leading-snug"
      style={{ color: "var(--slide-primary)", fontFamily: "var(--slide-font-heading)" }}
      {...props}
    />
  );
}

export function SlideH3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="mb-4 text-3xl font-semibold"
      style={{ fontFamily: "var(--slide-font-heading)" }}
      {...props}
    />
  );
}
