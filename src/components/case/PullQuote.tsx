import { cn } from "@/lib/cn";

export type PullQuoteProps = {
  quote: string;
  attribution?: string;
  className?: string;
};

export function PullQuote({ quote, attribution, className }: PullQuoteProps) {
  return (
    <figure
      className={cn(
        "relative my-12 border-y border-rule-2 pt-9 pb-8 md:my-14",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute -top-px left-0 h-0.5 w-14 bg-gold shadow-glow-gold-soft"
      />
      <blockquote className="disp max-w-[800px] text-[clamp(24px,3.4vw,36px)] leading-[1.15] text-balance text-fg">
        {quote}
      </blockquote>
      {attribution !== undefined && (
        <figcaption className="mt-[18px] font-mono text-[11px] tracking-[0.18em] text-fg-mute uppercase">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
