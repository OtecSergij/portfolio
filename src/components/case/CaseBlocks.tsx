import type { ReactElement } from "react";

import { cn } from "@/lib/cn";
import { CodeBlock } from "@/components/case/CodeBlock";
import { Figure } from "@/components/case/Figure";
import {
  caseFullBleedCaptionClass,
  caseFullBleedClass,
} from "@/components/case/grid";
import { PullQuote } from "@/components/case/PullQuote";
import { StackRows } from "@/components/case/StackRows";
import { StatsGrid } from "@/components/case/StatsGrid";
import type { CaseBlock } from "@/content/cases/types";

const proseWidth = "max-w-[720px]";
const bodyWidth = "max-w-[620px]";
const bodyTone = "text-[#c6ccd6]";

function Paragraph({
  block,
}: {
  block: Extract<CaseBlock, { type: "paragraph" }>;
}) {
  return (
    <p
      className={cn(
        block.lead ? proseWidth : bodyWidth,
        "mb-[22px] text-[17px] leading-[1.7] text-pretty md:text-[19px]",
        block.lead && "mb-7 text-[20px] leading-[1.55] md:mb-8 md:text-[22px]",
        block.mute ? "text-fg-mute" : bodyTone,
      )}
    >
      {block.body}
    </p>
  );
}

function List({ block }: { block: Extract<CaseBlock, { type: "list" }> }) {
  const Tag = block.ordered ? "ol" : "ul";
  return (
    <Tag role="list" className={cn(bodyWidth, "mb-[26px]")}>
      {block.items.map((item, index) => (
        <li
          key={index}
          className={cn(
            bodyTone,
            "relative mb-3 pl-[22px] text-[17px] leading-[1.65] last:mb-0 md:text-[19px]",
          )}
        >
          {block.ordered ? (
            <span
              aria-hidden
              className="absolute top-[3px] left-0 font-mono text-[11px] tracking-[0.1em] text-gold"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : (
            <span
              aria-hidden
              className="absolute top-[13px] left-0 h-px w-2 bg-gold"
            />
          )}
          {item}
        </li>
      ))}
    </Tag>
  );
}

function Block({ block }: { block: CaseBlock }): ReactElement {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "list":
      return <List block={block} />;
    case "subheading":
      return (
        <h3
          className={cn(
            proseWidth,
            "disp mt-12 mb-4 text-[20px] leading-[1.15] text-fg md:text-[22px]",
          )}
        >
          {block.title}
        </h3>
      );
    case "pullquote":
      return <PullQuote quote={block.quote} attribution={block.attribution} />;
    case "figure":
      return (
        <Figure
          caption={block.caption}
          image={block.image}
          className={cn("mt-2 mb-8 lg:relative lg:z-10", caseFullBleedClass)}
          captionClassName={caseFullBleedCaptionClass}
        />
      );
    case "code":
      return (
        <CodeBlock
          lang={block.lang}
          langLabel={block.langLabel}
          file={block.file}
          code={block.code}
        />
      );
    case "stats":
      return <StatsGrid items={block.items} className={proseWidth} />;
    case "stack":
      return <StackRows rows={block.rows} className={proseWidth} />;
  }
}

export function CaseBlocks({ blocks }: { blocks: readonly CaseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </>
  );
}
