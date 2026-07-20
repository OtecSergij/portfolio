import { cn } from "@/lib/cn";

export type SectionHeadingProps = {
  title: string;
  align?: "left" | "right";
  meta?: string;
  className?: string;
};

function HeadingBlock({
  title,
  align,
}: Pick<SectionHeadingProps, "title" | "align">) {
  return (
    <div>
      <span
        aria-hidden
        className={cn(
          "mb-5.5 block h-0.5 w-7 bg-gold shadow-glow-gold-soft",
          align === "right" && "ml-auto",
        )}
      />
      <h2
        className={cn(
          "disp text-[clamp(38px,6vw,56px)] leading-[0.95] text-fg",
          align === "right" && "text-right",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

export function SectionHeading({
  title,
  align = "left",
  meta,
  className,
}: SectionHeadingProps) {
  if (meta === undefined) {
    return (
      <div className={className}>
        <HeadingBlock title={title} align={align} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-10 grid items-end gap-4 md:mb-14 md:gap-20",
        align === "right" ? "md:grid-cols-[3fr_1fr]" : "md:grid-cols-[1fr_3fr]",
        className,
      )}
    >
      <HeadingBlock title={title} align={align} />
      <div
        className={cn(
          "border-b border-rule-1 pb-2.5 font-mono text-[11px] tracking-[0.18em] text-fg-dim uppercase",
          align === "right" && "md:-order-1",
        )}
      >
        {meta}
      </div>
    </div>
  );
}
