import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";
import type { LedTone } from "@/lib/tones";

export type { LedTone };

const toneColor: Record<LedTone, string> = {
  ok: "var(--ok)",
  gold: "var(--gold)",
  warn: "var(--warn)",
  alert: "var(--alert)",
  cold: "var(--cold)",
};

export type LedProps = {
  tone?: LedTone;
  size?: number;
  className?: string;
};

export function Led({ tone = "ok", size = 7, className }: LedProps) {
  return (
    <span
      aria-hidden
      className={cn("led inline-block shrink-0", className)}
      style={
        {
          width: size,
          height: size,
          "--led-color": toneColor[tone],
        } as CSSProperties
      }
    />
  );
}
