import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/Chip";
import { Plate } from "@/components/ui/Plate";
import type { WorkProject } from "@/content/home";
import { externalLinkProps, type LinkAction } from "@/lib/links";

const crosshairPositions = [
  "top-3 left-3",
  "top-3 right-3",
  "bottom-3 left-3",
  "bottom-3 right-3",
];

function ActionLink({
  action,
  subtle = false,
  className: extraClassName,
}: {
  action: LinkAction;
  subtle?: boolean;
  className?: string;
}) {
  const className = cn(
    "inline-flex items-center gap-2.5 font-mono uppercase no-underline transition-colors duration-150 hover:text-gold",
    subtle
      ? "text-[10.5px] tracking-[0.16em] text-fg-dim"
      : "text-[11px] tracking-[0.16em] text-fg",
    extraClassName,
  );
  const content = (
    <>
      {action.label}
      <span aria-hidden className="text-gold">
        {action.arrow ?? "→"}
      </span>
    </>
  );
  if (action.external) {
    return (
      <a
        href={action.href}
        {...externalLinkProps(action)}
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={action.href} className={className}>
      {content}
    </Link>
  );
}

export function WorkCard({ project }: { project: WorkProject }) {
  return (
    <Plate variant="card" interactive className="flex flex-col">
      <div
        aria-hidden={project.media ? undefined : true}
        className="grid-bg-tight relative h-44 overflow-hidden border-b border-rule-1 bg-plate-2 sm:h-[280px]"
      >
        {project.media ? (
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
            style={
              project.media.position
                ? { objectPosition: project.media.position }
                : undefined
            }
          />
        ) : (
          <>
            <span className="absolute inset-0 grid place-items-center px-6 text-center font-mono text-[10px] tracking-[0.3em] text-fg-faint uppercase">
              SCREENSHOT · PENDING
            </span>
            {crosshairPositions.map((pos) => (
              <span key={pos} className={cn("absolute size-[9px]", pos)}>
                <span className="absolute top-1/2 left-0 h-px w-full bg-rule-3" />
                <span className="absolute top-0 left-1/2 h-full w-px bg-rule-3" />
              </span>
            ))}
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col px-6 pt-6 pb-6 sm:px-7.5 sm:pt-7">
        <h3 className="disp text-[34px] leading-[0.95] text-fg">
          {project.title}
        </h3>
        <p className="mt-3.5 max-w-[480px] text-[16px] leading-[1.5] text-fg-mute">
          {project.tagline}
        </p>
        <div className="mt-5.5 flex flex-wrap gap-1.5">
          {project.statusChips.map((chip) => (
            <Chip key={chip.label} led={chip.led}>
              {chip.label}
            </Chip>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stackChips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        {project.linkRows.map((row) => (
          <div
            key={row.action.label}
            className="flex items-center justify-between border-t border-rule-1"
          >
            <ActionLink
              action={row.action}
              className="flex-1 px-6 py-4 sm:px-7.5"
            />
            {typeof row.note === "string" ? (
              <span className="py-4 pr-6 font-mono text-[10.5px] tracking-[0.16em] text-fg-dim uppercase sm:pr-7.5">
                {row.note}
              </span>
            ) : row.note !== undefined ? (
              <ActionLink
                action={row.note}
                subtle
                className="py-4 pr-6 pl-3 sm:pr-7.5"
              />
            ) : null}
          </div>
        ))}
      </div>
    </Plate>
  );
}
