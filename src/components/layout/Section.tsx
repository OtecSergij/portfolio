"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useRevealFade } from "@/hooks/useReveal";

export type SectionProps = {
  id: string;
  title: string;
  align?: "left" | "right";
  meta?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  align = "left",
  meta,
  children,
}: SectionProps) {
  const { ref, fadeClass } = useRevealFade<HTMLElement>();

  const shellClass = cn(
    "border-t border-rule-1 py-16 first-of-type:border-t-0 md:py-[120px]",
    fadeClass,
  );

  if (meta !== undefined) {
    return (
      <section id={id} ref={ref} className={shellClass}>
        <SectionHeading title={title} align={align} meta={meta} />
        {children}
      </section>
    );
  }

  return (
    <section id={id} ref={ref} className={shellClass}>
      <div
        className={cn(
          "grid items-start gap-10 md:gap-20",
          align === "right"
            ? "md:grid-cols-[3fr_1fr]"
            : "md:grid-cols-[1fr_3fr]",
        )}
      >
        <SectionHeading
          title={title}
          align={align}
          className={cn(align === "right" && "md:order-2")}
        />
        <div className={cn(align === "right" && "md:order-1")}>{children}</div>
      </div>
    </section>
  );
}
