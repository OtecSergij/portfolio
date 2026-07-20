import type { ReactNode } from "react";

import { Led, type LedTone } from "@/components/ui/Led";
import { cn } from "@/lib/cn";

export type ChipProps = {
  led?: LedTone;
  children: ReactNode;
  className?: string;
};

export function Chip({ led, children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-2 border border-rule-2 px-2.5 font-mono text-[10.5px] tracking-[0.1em] uppercase",
        led ? "bg-plate-2 text-fg" : "bg-plate-4 text-fg-mute",
        className,
      )}
    >
      {led ? <Led tone={led} size={6} className="mr-2" /> : null}
      {children}
    </span>
  );
}
