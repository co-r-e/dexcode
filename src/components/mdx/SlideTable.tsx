import type { ComponentPropsWithoutRef } from "react";

export function SlideTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-3xl" {...props} />
    </div>
  );
}

export function SlideTh(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="border-b-2 px-6 py-4 text-left font-semibold text-white"
      style={{ backgroundColor: "var(--slide-primary)" }}
      {...props}
    />
  );
}

export function SlideTd(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className="border-b border-gray-200 px-6 py-4 even:bg-gray-50"
      {...props}
    />
  );
}
