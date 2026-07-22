import type { LedTone, StatusChip } from "@/lib/tones";

export type ProjectFacts = {
  name: string;
  status: Required<StatusChip>;
  accent: LedTone;
  badges: readonly StatusChip[];
  stackChips: readonly string[];
  demoUrl: string;
  sourceUrl: string | null;
  caseRoute: string;
  updatedAt: string;
};

const aiPrReviewerStatus = {
  led: "ok",
  label: "Live",
} as const satisfies Required<StatusChip>;

const tameTheElephantStatus = {
  led: "gold",
  label: "Open beta",
} as const satisfies Required<StatusChip>;

export const aiPrReviewerFacts = {
  name: "AI PR Reviewer",
  status: aiPrReviewerStatus,
  accent: "ok",
  badges: [
    aiPrReviewerStatus,
    { label: "Solo built" },
    { label: "Open source" },
  ],
  stackChips: ["Next.js", "Vercel AI SDK", "PostgreSQL", "Redis"],
  demoUrl: "https://reviewer.zablotsky.dev",
  sourceUrl: "https://github.com/OtecSergij/ai-pr-reviewer",
  caseRoute: "/ai-pr-reviewer",
  updatedAt: "2026-07-21",
} as const satisfies ProjectFacts;

export const tameTheElephantFacts = {
  name: "Tame the Elephant",
  status: tameTheElephantStatus,
  accent: "gold",
  badges: [
    tameTheElephantStatus,
    { label: "Solo built" },
    { label: "Installable PWA" },
  ],
  stackChips: ["React", "Express", "Prisma", "PostgreSQL"],
  demoUrl: "https://tame.day",
  sourceUrl: null,
  caseRoute: "/tame-the-elephant",
  updatedAt: "2026-07-21",
} as const satisfies ProjectFacts;
