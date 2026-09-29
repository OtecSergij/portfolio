import type { ReactNode } from "react";

import { site } from "@/config/site";
import { aiPrReviewerFacts, tameTheElephantFacts } from "@/content/projects";
import { resume } from "@/content/resume";
import type { LinkAction } from "@/lib/links";
import type { LedTone, StatusChip } from "@/lib/tones";

export type HeroPill = StatusChip;

export const heroPills: readonly HeroPill[] = [
  { led: "ok", label: "Open to senior roles" },
  { label: "Remote · Relocation" },
];

export const heroRoleLine = resume.headline.join("\u00a0· ");

export const heroLocationNote: ReactNode = (
  <>
    {site.location} · <span className="text-gold">CET</span>
  </>
);

export type AboutParagraph = { lead?: true; body: ReactNode };

export const aboutParagraphs: readonly AboutParagraph[] = [
  {
    lead: true,
    body: (
      <>
        {
          "I'm a full-stack TypeScript engineer with six years of production experience. I came up through frontend at a cybersecurity vendor, a 25M-MAU marketplace and an enterprise DevOps platform at a large bank, and since 2024 at "
        }
        <strong className="font-semibold text-fg">Yandex</strong>
        {
          " I've taken projects from requirements to production: React UIs, Node.js services and batch pipelines, PostgreSQL, monitoring and on-call."
        }
      </>
    ),
  },
  {
    body: (
      <>
        {
          "I usually run a project end to end: take the request from the business, estimate it, pin down the requirements with the stakeholder, write the design doc, build it and see it through to sign-off in production. Between projects I work the backlog and take on-call shifts: alerts, incident triage, root-cause fixes. "
        }
        <span className="text-gold">
          Being on call for your own code is the strictest code review there is
        </span>
        {"."}
      </>
    ),
  },
  {
    body: "The two products below are mine end to end: designed, built, deployed and operated solo, and both are live. Try them.",
  },
];

export type ExperienceRow = {
  company: string;
  dates: string;
  role: string;
  descriptor: readonly string[];
  bullets: readonly string[];
};

const roleCount = String(resume.experience.length).padStart(2, "0");

const firstRoleYear = Math.min(
  ...resume.experience.map(({ period }) => Number(period.start.slice(-4))),
);

export const experienceMeta = `${roleCount} roles · ${String(firstRoleYear)} — present`;

export const experienceRows: readonly ExperienceRow[] = resume.experience.map(
  ({ company, period, title, descriptor, bullets }) => ({
    company,
    dates: `${period.start} — ${period.end}`,
    role: title,
    descriptor,
    bullets,
  }),
);

export type StackRow = {
  name: string;
  accent?: string;
  description: string;
};

export const stackRows: readonly StackRow[] = [
  {
    name: "TypeScript · React · Next.js",
    description:
      "Primary language front to back. Strict TypeScript, React with SSR at Auto.ru, Next.js App Router with RSC and streaming in the AI PR Reviewer and this site. A design system built from scratch on CSS Modules and design tokens in Tame the Elephant; reusable components for a shared UI library at Innotech.",
  },
  {
    name: "Node.js · PostgreSQL · Redis",
    description:
      "REST services, batch pipelines and integrations with the Yandex Tracker and Webmaster APIs and S3-compatible storage. PostgreSQL as the system of record: schema design and migrations with Prisma and Drizzle, a retry queue with exponential backoff, advisory-lock serialization and query timeouts under load; response caching for a hot API endpoint. Redis for per-IP sliding-window rate limiting in Lua.",
  },
  {
    name: "LLM integration",
    description:
      "Two LLM pipelines in production at Yandex, news monitoring and ticket automation, and one public product: prompt calibration on a labeled evaluation set, model choice by cost and accuracy, multi-step tool calling, structured output, provider failover with transcript handoff on the Vercel AI SDK.",
  },
  {
    name: "Testing",
    description:
      "Integration tests with Testcontainers in the AI PR Reviewer (against a real PostgreSQL in CI) and in the planning calendar and the news-monitoring service at Yandex; 400+ integration tests with a race suite in Tame the Elephant; a before-and-after load test when adding a cache to a Yandex API endpoint.",
  },
  {
    name: "Delivery and operations",
    description:
      "Docker, GitHub Actions, GHCR, Coolify and Traefik on a self-managed VPS; Prometheus metrics and alerting; on-call and incident triage across 10 production services.",
  },
];

export type CardLinkRow = {
  action: LinkAction;
  note?: string | LinkAction;
};

export type WorkProject = {
  title: string;
  caseHref: string;
  tagline: string;
  accent: LedTone;
  media?: { src: string; alt: string; position?: string };
  statusChips: readonly StatusChip[];
  stackChips: readonly string[];
  linkRows: readonly CardLinkRow[];
};

export const workMeta = "Featured · 02 active projects";

export const workProjects: readonly WorkProject[] = [
  {
    title: aiPrReviewerFacts.name,
    caseHref: aiPrReviewerFacts.caseRoute,
    tagline:
      "Paste a GitHub PR link and get a streaming, line-by-line AI review. A multi-step agent on the Vercel AI SDK, with an Octokit adapter, structured output, provider failover and per-IP rate limiting.",
    accent: aiPrReviewerFacts.accent,
    media: {
      src: "/screenshots/reviewer-complete.png",
      alt: "AI PR Reviewer: a completed review with a severity summary and an issue pinned to a diff.",
      position: "left top",
    },
    statusChips: aiPrReviewerFacts.badges,
    stackChips: aiPrReviewerFacts.stackChips,
    linkRows: [
      {
        action: {
          label: "Try it live",
          href: aiPrReviewerFacts.demoUrl,
          external: true,
        },
        note: "no signup",
      },
      {
        action: {
          label: "Read the breakdown",
          href: aiPrReviewerFacts.caseRoute,
        },
        note: {
          label: "Source",
          href: aiPrReviewerFacts.sourceUrl,
          external: true,
          arrow: "↗",
        },
      },
    ],
  },
  {
    title: tameTheElephantFacts.name,
    caseHref: tameTheElephantFacts.caseRoute,
    tagline:
      "Habits earn points, temptations cost them — a self-discipline PWA. Once points can buy real rewards, they're a currency, not a score, so I built the economy underneath like a bank.",
    accent: tameTheElephantFacts.accent,
    media: {
      src: "/screenshots/tte-home.png",
      alt: "Tame the Elephant: the home dashboard with balance, habit and challenge cards, and rewards.",
      position: "center top",
    },
    statusChips: tameTheElephantFacts.badges,
    stackChips: tameTheElephantFacts.stackChips,
    linkRows: [
      {
        action: {
          label: "Try the demo",
          href: tameTheElephantFacts.demoUrl,
          external: true,
        },
        note: "demo account · no signup",
      },
      {
        action: {
          label: "Read the breakdown",
          href: tameTheElephantFacts.caseRoute,
        },
      },
    ],
  },
];

export const contactBody: ReactNode = (
  <>
    {"Open to "}
    <span className="text-gold">senior full-stack roles</span>
    {
      ": remote from Belgrade, or relocating to Cyprus or elsewhere in the EU. Email or Telegram works best."
    }
  </>
);
