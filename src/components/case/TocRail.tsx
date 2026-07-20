"use client";

import { useMemo } from "react";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";

export type TocItem = { id: string; label: string };

export function TocRail({ items }: { items: readonly TocItem[] }) {
  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeId = useScrollSpy(ids) ?? ids[0];

  return (
    <nav aria-label="Contents">
      <div className="mb-3.5 border-b border-rule-1 pb-3 font-mono text-[10px] tracking-[0.22em] text-fg-dim uppercase lg:mb-[18px]">
        Contents
      </div>
      <ol className="flex flex-wrap gap-x-6 lg:flex-col lg:gap-x-0">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex items-baseline gap-2.5 py-2 font-mono text-[11px] tracking-[0.12em] uppercase no-underline transition-colors duration-150 lg:-ml-3.5 lg:grid lg:grid-cols-[24px_1fr] lg:gap-3.5 lg:py-2.5 lg:pr-3 lg:pl-3.5",
                  isActive ? "text-fg" : "text-fg-dim hover:text-fg-mute",
                )}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-0 hidden h-4 w-0.5 -translate-y-1/2 bg-gold shadow-glow-gold lg:block"
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "transition-colors duration-150",
                    isActive ? "text-gold" : "text-fg-dim",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
