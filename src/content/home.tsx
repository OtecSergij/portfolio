import type { ReactNode } from "react";

import { aiPrReviewerFacts, tameTheElephantFacts } from "@/content/projects";
import type { LinkAction } from "@/lib/links";
import type { LedTone, StatusChip } from "@/lib/tones";

export type HeroPill = Required<StatusChip>;

export const heroPills: readonly HeroPill[] = [
  { led: "ok", label: "Available" },
];

export const heroRoleLine =
  "Senior Full-stack Engineer · TS · Node · Next.js · LLM";

export const heroLocationNote: ReactNode = (
  <>
    Belgrade · <span className="text-gold">CET</span>
  </>
);

export type AboutParagraph = { lead?: true; body: ReactNode };

export const aboutParagraphs: readonly AboutParagraph[] = [
  {
    lead: true,
    body: (
      <>
        {"Frontend-first, then full-stack: security tooling at "}
        <strong className="font-semibold text-fg">BI.ZONE</strong>
        {", internal platforms at "}
        <strong className="font-semibold text-fg">Joom</strong>
        {", release tooling at "}
        <strong className="font-semibold text-fg">Innotech</strong>
        {" — and "}
        <strong className="font-semibold text-fg">Yandex</strong>
        {
          ", where I own marketing and SEO infrastructure across its Auto.ru, Realty and Travel verticals."
        }
      </>
    ),
  },
  {
    body: (
      <>
        {
          "That work now includes LLM systems in production: a news-triage pipeline I built for the Auto.ru newsroom, and two live products of my own. "
        }
        <span className="text-gold">
          The model is rarely the interesting part; the system around it is
        </span>
        {
          " — the retry-and-fallback chain, the rate limiter, the per-request cost accounting, the UI that lets a non-technical user trust the output."
        }
      </>
    ),
  },
  {
    body: "The two products below are the proof. I own every layer of both — product decisions, code, and the VPS they run on. Try them live.",
  },
];

export type ExperienceRow = {
  company: string;
  dates: string;
  role: string;
  description: string;
};

export const experienceMeta = "Selected roles · 2020 — 2026";

export const experienceRows: readonly ExperienceRow[] = [
  {
    company: "Yandex",
    dates: "Aug 2024 — Present",
    role: "Senior Full-stack Engineer",
    description:
      "Own the marketing and SEO infrastructure across Auto.ru, Realty and Travel — an ad-feed platform serving ~250k live offers, SEO tooling, and the editorial backend for 10 Yandex media products. Shipped two products solo, from requirements to production: a publication-planning calendar (Yandex Tracker API) that replaced Asana for the main editorial teams, and an LLM news-triage pipeline (relevance and urgency classification) now in production for the Auto.ru newsroom. Mentored an intern through to a full-time offer.",
  },
  {
    company: "Innotech",
    dates: "May 2023 — Jul 2024",
    role: "Senior Frontend Engineer",
    description:
      "Sfera.Releases — the release-management module of an enterprise DevOps platform that scaled to ~20k daily users at a top-2 Russian bank. On the team from the 2023 launch: built the release-lifecycle UI and integrated Netflix Conductor workflow orchestration on the frontend from scratch — dozens of production workflows. Contributed to the platform's shared component library.",
  },
  {
    company: "Joom",
    dates: "Sep 2021 — Mar 2023",
    role: "Frontend Engineer",
    description:
      "Built the frontend of an in-house ticketing system handling 1,000+ tickets a day for a 300-person support org, and of the internal admin platform used by 20+ product teams — at an EU cross-border e-commerce marketplace (25M MAU)",
  },
  {
    company: "BI.ZONE",
    dates: "May 2020 — Sep 2021",
    role: "Frontend Engineer",
    description:
      "Shipped the UI for defensive-security products: an incident-monitoring system, and an incident-remediation documentation portal owned end to end — security analysts authored the content.",
  },
];

export type StackRow = {
  name: string;
  accent?: string;
  description: string;
};

export const stackRows: readonly StackRow[] = [
  {
    name: "TypeScript",
    description:
      "Primary language across frontend, backend, and infrastructure. Strict mode, generics, type-level API design.",
  },
  {
    name: "React",
    description:
      "Hooks, suspense, server components. Built and maintained internal design systems.",
  },
  {
    name: "Next.js",
    description:
      "App Router, RSC, streaming UI. Powers the AI PR Reviewer and this site.",
  },
  {
    name: "Node.js",
    description:
      "Backend services, API design, integrations with external systems (Yandex Tracker, Webmaster, S3).",
  },
  {
    name: "PostgreSQL",
    description:
      "Primary store across projects — schema design, migrations, query optimization.",
  },
  {
    name: "Drizzle ORM",
    description:
      "Type-safe SQL with full TS inference. Migration tooling, schema introspection.",
  },
  {
    name: "Redis",
    description:
      "Caching, rate limiting (sliding window / token bucket), session state.",
  },
  {
    name: "Testcontainers",
    description:
      "Integration tests on real containerized infrastructure, not mocks: the app in CI against freshly migrated DB, plus concurrency tests that verify advisory locks hold under parallel load.",
  },
  {
    name: "Vercel AI SDK",
    description:
      "LLM integration: streaming, multi-step tool calling, structured output, provider-agnostic fallback.",
  },
  {
    name: "Docker, CI/CD",
    description:
      "Self-managed deployment: GitHub Actions, Coolify on a VPS — SSL, env management, SSE-friendly proxying.",
  },
];

export type CardLinkRow = {
  action: LinkAction;
  note?: string | LinkAction;
};

export type WorkProject = {
  title: string;
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
    tagline:
      "Paste a GitHub PR link — get a streaming, line-by-line AI review. Multi-step agent built on Octokit, structured output, provider fallback, per-IP rate limiting.",
    accent: aiPrReviewerFacts.accent,
    media: {
      src: "/screenshots/reviewer-complete.png",
      alt: "AI PR Reviewer: a completed review with severity summary and an issue pinned to a diff.",
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
    tagline:
      "A discipline app grounded in the elephant-and-rider metaphor — points, challenges, milestones over months, not days.",
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
          label: "Try it live",
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
    <span className="text-gold">senior roles</span>
    {" and contract work — remote or on-site in the EU, async-friendly."}
  </>
);
