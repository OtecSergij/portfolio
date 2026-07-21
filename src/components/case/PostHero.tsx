import Link from "next/link";
import { Fragment } from "react";

import { Pill } from "@/components/ui/Pill";
import type { CaseStudy } from "@/content/cases/types";

export function PostHero({
  study,
}: {
  study: Pick<CaseStudy, "title" | "titleLines" | "pills" | "tagline" | "meta">;
}) {
  return (
    <header className="pt-10 pb-12 md:pt-12 md:pb-14">
      <p className="mb-7 font-mono text-[11px] tracking-[0.18em] text-fg-dim uppercase">
        <Link
          href="/#projects"
          className="text-fg-mute underline decoration-rule-3 underline-offset-4 transition-colors duration-150 hover:text-gold hover:decoration-gold"
        >
          Projects
        </Link>
        <span aria-hidden className="mx-2 text-fg-faint">
          /
        </span>
        {study.title}
      </p>

      <div className="mb-7 flex flex-wrap gap-2">
        {study.pills.map((pill) => (
          <Pill key={pill.label} led={pill.led}>
            {pill.label}
          </Pill>
        ))}
      </div>

      <h1 className="max-w-[900px] disp text-[clamp(48px,9vw,96px)] leading-[0.92] text-fg">
        {study.titleLines.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </h1>

      <p className="mt-6 max-w-[720px] text-[19px] leading-[1.5] text-pretty text-fg-mute md:mt-8 md:text-[22px]">
        {study.tagline.map((segment, index) =>
          typeof segment === "string" ? (
            <Fragment key={index}>{segment}</Fragment>
          ) : (
            <span key={index} className="text-gold">
              {segment.highlight}
            </span>
          ),
        )}
      </p>

      <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 sm:gap-x-12 md:flex md:flex-wrap md:gap-x-16 md:gap-y-9">
        {study.meta.map((item) => (
          <div key={item.k} className="flex flex-col gap-1.5 font-mono">
            <dt className="text-[10.5px] tracking-[0.18em] text-fg-dim uppercase">
              {item.k}
            </dt>
            <dd className="text-[13px] tracking-[0.04em] text-fg">{item.v}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
