"use client";

import type { ReactNode } from "react";

import { useRevealFade } from "@/hooks/useReveal";
import { cn } from "@/lib/cn";

export function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const { ref, fadeClass } = useRevealFade<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={cn("mt-[72px] scroll-mt-9 first:mt-0 md:mt-[88px]", fadeClass)}
    >
      <h2 className="mb-7 max-w-[720px] disp text-[clamp(34px,5.5vw,48px)] leading-none text-fg">
        <span
          aria-hidden
          className="mb-[18px] block h-0.5 w-6 bg-gold shadow-glow-gold-soft"
        />
        {title}
      </h2>
      {children}
    </section>
  );
}
