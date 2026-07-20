import type { ReactNode } from "react";

import { Led, type LedTone } from "@/components/ui/Led";
import { cn } from "@/lib/cn";

export type PillProps = {
  led?: LedTone;
  children: ReactNode;
  className?: string;
};

export function Pill({ led, children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6.5 items-center gap-2 rounded-full border border-rule-2 bg-plate-2 px-2.5 font-mono text-[10.5px] tracking-[0.14em] text-fg-mute uppercase",
        className,
      )}
    >
      {led ? <Led tone={led} /> : null}
      {children}
    </span>
  );
}
