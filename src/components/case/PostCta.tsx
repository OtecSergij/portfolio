import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Plate } from "@/components/ui/Plate";
import type { CaseCta, CaseCtaAction } from "@/content/cases/types";
import { externalLinkProps } from "@/lib/links";

function ActionButton({ action }: { action: CaseCtaAction }) {
  return (
    <Button
      href={action.href}
      variant={action.variant ?? "ghost"}
      {...externalLinkProps(action)}
    >
      {action.arrow === "←" ? (
        <>
          <span aria-hidden>←</span> {action.label}
        </>
      ) : (
        <>
          {action.label}{" "}
          <span aria-hidden className="text-gold">
            {action.arrow ?? "→"}
          </span>
        </>
      )}
    </Button>
  );
}

export function PostCta({
  cta,
  className,
}: {
  cta: CaseCta;
  className?: string;
}) {
  return (
    <Plate
      brushed
      className={cn(
        "px-7 py-10 sm:px-10 sm:py-12 md:px-16 md:py-14",
        className,
      )}
    >
      <h2 className="disp mb-4 text-[clamp(30px,5vw,44px)] leading-none text-fg">
        {cta.heading}
      </h2>
      <p className="mb-7 max-w-[560px] text-[17px] leading-[1.55] text-pretty text-fg-mute md:text-[18px]">
        {cta.body}
      </p>
      <div className="flex flex-wrap gap-3">
        {cta.actions.map((action) => (
          <ActionButton key={action.label} action={action} />
        ))}
      </div>
    </Plate>
  );
}
