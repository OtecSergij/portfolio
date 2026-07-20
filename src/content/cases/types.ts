import type { ReactNode } from "react";

import type { CodeLang } from "@/lib/highlight";
import type { LinkAction } from "@/lib/links";
import type { StatusChip } from "@/lib/tones";

export type CasePill = StatusChip;

export type CaseMetaItem = { k: string; v: string };

export type CaseStatItem = {
  k: string;
  v: string;
  note?: string;
};

export type CaseStackRow = { name: string; description: ReactNode };

export type CaseFigureImage = { src: string; alt: string; position?: string };

export type CaseBlock =
  | { type: "paragraph"; lead?: true; mute?: true; body: ReactNode }
  | { type: "list"; ordered?: true; items: readonly ReactNode[] }
  | { type: "subheading"; title: string }
  | { type: "pullquote"; quote: string; attribution?: string }
  | { type: "figure"; caption: string; image?: CaseFigureImage }
  | {
      type: "code";
      lang: CodeLang;
      langLabel: string;
      file: string;
      code: string;
    }
  | { type: "stats"; items: readonly CaseStatItem[] }
  | { type: "stack"; rows: readonly CaseStackRow[] };

export type CaseTaglineSegment = string | { highlight: string };

export type CaseSectionContent = {
  id: string;
  title: string;
  blocks: readonly CaseBlock[];
};

export type CaseCtaAction = LinkAction & {
  variant?: "solid" | "ghost";
};

export type CaseCta = {
  heading: string;
  body: ReactNode;
  actions: readonly CaseCtaAction[];
};

export type CaseStudy = {
  title: string;
  titleLines: readonly string[];
  pills: readonly CasePill[];
  tagline: readonly CaseTaglineSegment[];
  meta: readonly CaseMetaItem[];
  heroFigureCaption: string;
  heroImage?: CaseFigureImage;
  sections: readonly CaseSectionContent[];
  cta: CaseCta;
};
