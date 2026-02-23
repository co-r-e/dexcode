import type { ComponentPropsWithoutRef } from "react";

export function SlideCode(props: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded bg-gray-100 px-2 py-1 text-3xl font-mono text-pink-600"
      {...props}
    />
  );
}

export function SlidePreCode(props: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-gray-900 p-8 text-3xl leading-relaxed text-gray-100"
      {...props}
    />
  );
}
