"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

export type TypewriterProps = {
  text: string;
  className?: string;
};

const CHAR_INTERVAL_MS = 18;
const HYDRATION_BUDGET_MS = 300;

let hasPlayed = false;

export function Typewriter({ text, className }: TypewriterProps) {
  const [typedChars, setTypedChars] = useState<number | null>(null);

  useEffect(() => {
    if (hasPlayed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (performance.now() > HYDRATION_BUDGET_MS) {
      hasPlayed = true;
      return;
    }
    let typed = 0;
    const interval = setInterval(() => {
      setTypedChars(typed);
      typed += 1;
      if (typed > text.length) {
        hasPlayed = true;
        clearInterval(interval);
      }
    }, CHAR_INTERVAL_MS);
    return () => {
      clearInterval(interval);
    };
  }, [text]);

  const animating = typedChars !== null && typedChars < text.length;

  return (
    <span className={cn("relative inline-block", className)}>
      <span
        aria-hidden={animating || undefined}
        className={animating ? "invisible" : undefined}
      >
        {text}
      </span>
      {animating && (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden className="absolute inset-0">
            {text.slice(0, typedChars)}
            <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] bg-gold" />
          </span>
        </>
      )}
    </span>
  );
}
