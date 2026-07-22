import Image from "next/image";
import Link from "next/link";

import { Chip } from "@/components/ui/Chip";
import { Plate } from "@/components/ui/Plate";
import type { WorkProject } from "@/content/home";
import { cn } from "@/lib/cn";
import { externalLinkProps, type LinkAction } from "@/lib/links";
import type { LedTone } from "@/lib/tones";

const accentText: Record<LedTone, string> = {
  ok: "text-ok",
  gold: "text-gold",
  warn: "text-warn",
  alert: "text-alert",
  cold: "text-cold",
};

const accentHover: Record<LedTone, string> = {
  ok: "hover:text-ok",
  gold: "hover:text-gold",
  warn: "hover:text-warn",
  alert: "hover:text-alert",
  cold: "hover:text-cold",
};

const accentVar: Record<LedTone, string> = {
  ok: "var(--ok)",
  gold: "var(--gold)",
  warn: "var(--warn)",
  alert: "var(--alert)",
  cold: "var(--cold)",
};

const mix = (v: string, pct: number) =>
  `color-mix(in srgb, ${v} ${String(pct)}%, transparent)`;

const crosshairPositions = [
  "top-3 left-3",
  "top-3 right-3",
  "bottom-3 left-3",
  "bottom-3 right-3",
];

function ActionLink({
  action,
  accent,
  subtle = false,
  className: extraClassName,
}: {
  action: LinkAction;
  accent: LedTone;
  subtle?: boolean;
  className?: string;
}) {
  const className = cn(
    "inline-flex items-center gap-2.5 font-mono uppercase no-underline transition-colors duration-150",
    accentHover[accent],
    subtle
      ? "text-[10.5px] tracking-[0.16em] text-fg-dim"
      : "text-[11px] tracking-[0.16em] text-fg",
    extraClassName,
  );
  const content = (
    <>
      {action.label}
      <span aria-hidden className={accentText[accent]}>
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
  const accent = project.accent;
  const v = accentVar[accent];
  return (
    <Plate variant="card" interactive className="flex flex-col">
      <div
        aria-hidden={project.media ? undefined : true}
        className="grid-bg-tight relative h-44 overflow-hidden border-b bg-plate-2 sm:h-[280px]"
        style={{ borderBottomColor: mix(v, 58) }}
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
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),inset_0_0_0_1px_rgba(255,255,255,0.035),inset_0_-40px_44px_-40px_rgba(0,0,0,0.55)]"
        />
      </div>
      <div
        className="flex flex-1 flex-col"
        style={{
          background: `linear-gradient(to bottom, ${mix(v, 11)} 0%, ${mix(v, 5)} 200px)`,
        }}
      >
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
                accent={accent}
                className="flex-1 px-6 py-4 sm:px-7.5"
              />
              {typeof row.note === "string" ? (
                <span className="py-4 pr-6 font-mono text-[10.5px] tracking-[0.16em] text-fg-dim uppercase sm:pr-7.5">
                  {row.note}
                </span>
              ) : row.note !== undefined ? (
                <ActionLink
                  action={row.note}
                  accent={accent}
                  subtle
                  className="py-4 pr-6 pl-3 sm:pr-7.5"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit]"
        style={{ boxShadow: `inset 0 0 0 1px ${mix(v, 40)}` }}
      />
    </Plate>
  );
}
