import { cn } from "@/lib/cn";
import type { CaseStackRow } from "@/content/cases/types";

export function StackRows({
  rows,
  className,
}: {
  rows: readonly CaseStackRow[];
  className?: string;
}) {
  return (
    <div className={cn("mt-3", className)}>
      {rows.map((row) => (
        <div
          key={row.name}
          className="grid grid-cols-1 items-baseline gap-y-1 border-b border-rule-1 py-4 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-x-9"
        >
          <div className="font-mono text-[13px] tracking-[0.04em] text-fg">
            {row.name}
          </div>
          <p className="text-[15.5px] leading-[1.5] text-fg-mute">
            {row.description}
          </p>
        </div>
      ))}
    </div>
  );
}
