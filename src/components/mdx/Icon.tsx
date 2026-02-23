"use client";

import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface IconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") as keyof typeof icons;

  const LucideIcon = icons[pascalName] as React.ComponentType<LucideProps> | undefined;

  if (!LucideIcon) {
    return <span className="text-red-500">[Icon: {name}]</span>;
  }

  return <LucideIcon {...props} />;
}
