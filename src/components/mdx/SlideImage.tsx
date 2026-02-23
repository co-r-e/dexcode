import type { ComponentPropsWithoutRef } from "react";

export function SlideImage(props: ComponentPropsWithoutRef<"img">) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-4 max-h-[60%] rounded-lg object-contain"
      alt={props.alt ?? ""}
      {...props}
    />
  );
}
