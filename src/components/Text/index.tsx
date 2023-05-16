import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

export interface TextProps {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export default function Text({
  size = "md",
  children,
  asChild,
  className = "",
}: TextProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={clsx("text-gray-400 font-sans", {
        "text-xs": size == "sm",
        "text-sm": size === "md",
        "text-base": size === "lg",
      }, className)}
    >
      {children}
    </Comp>
  );
}
