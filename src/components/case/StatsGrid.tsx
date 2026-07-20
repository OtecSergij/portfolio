import { cn } from "@/lib/cn";
import type { CaseStatItem } from "@/content/cases/types";

const smSpan: Partial<Record<number, string>> = { 2: "sm:col-span-2" };
const lgSpan: Partial<Record<number, string>> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

function fillerSpan(count: number, columns: number): number {
  return columns - ((count - 1) % columns);
}

export function StatsGrid({
  items,
  className,
}: {
  items: readonly CaseStatItem[];
  className?: string;
}) {
  const lgColumns = items.length % 3 === 1 ? 2 : 3;
  return (
    <dl
      className={cn(
        "my-6 grid grid-cols-1 gap-px overflow-hidden rounded-3 border border-rule-1 bg-rule-1 sm:grid-cols-2",
        lgColumns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div
            key={item.k}
            className={cn(
              "bg-plate-3 px-[22px] py-6",
              isLast && smSpan[fillerSpan(items.length, 2)],
              isLast && lgSpan[fillerSpan(items.length, lgColumns)],
            )}
          >
            <dt className="mb-3 font-mono text-[10.5px] tracking-[0.18em] text-fg-dim uppercase">
              {item.k}
            </dt>
            <dd className="disp text-[26px] leading-none text-fg md:text-[30px]">
              {item.v}
            </dd>
            {item.note !== undefined && (
              <dd className="mt-2.5 font-mono text-[10.5px] leading-[1.6] tracking-[0.06em] text-fg-dim">
                {item.note}
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}
