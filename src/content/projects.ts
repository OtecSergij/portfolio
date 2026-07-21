import type { StatusChip } from "@/lib/tones";

export type ProjectFacts = {
  name: string;
  status: Required<StatusChip>;
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
  label: "Closed beta",
} as const satisfies Required<StatusChip>;

export const aiPrReviewerFacts = {
  name: "AI PR Reviewer",
  status: aiPrReviewerStatus,
  badges: [
    aiPrReviewerStatus,
    { label: "Solo built" },
    { label: "Open source" },
  ],
  stackChips: ["Next.js 16", "Vercel AI SDK v6", "PostgreSQL", "Redis"],
  demoUrl: "https://reviewer.zablotsky.dev",
  sourceUrl: "https://github.com/OtecSergij/ai-pr-reviewer",
  caseRoute: "/ai-pr-reviewer",
  updatedAt: "2026-07-21",
} as const satisfies ProjectFacts;

export const tameTheElephantFacts = {
  name: "Tame the Elephant",
  status: tameTheElephantStatus,
  badges: [
    tameTheElephantStatus,
    { label: "Solo built" },
    { label: "Installable PWA" },
  ],
  stackChips: ["React 18", "Express", "Prisma", "PostgreSQL"],
  demoUrl: "https://tame.day",
  sourceUrl: null,
  caseRoute: "/tame-the-elephant",
  updatedAt: "2026-07-21",
} as const satisfies ProjectFacts;
