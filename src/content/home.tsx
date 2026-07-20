import type { ReactNode } from "react";

import { aiPrReviewerFacts, tameTheElephantFacts } from "@/content/projects";
import type { LinkAction } from "@/lib/links";
import type { StatusChip } from "@/lib/tones";

export type HeroPill = Required<StatusChip>;

export const heroPills: readonly HeroPill[] = [
  { led: "ok", label: "Available" },
  { led: "gold", label: "Remote · Contract & full-time" },
];

export const heroRoleLine =
  "Senior Fullstack Engineer · TS · Node · Next.js · LLM";

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
        {
          "I'm a senior fullstack engineer with six years of production work, frontend-first: security tooling at "
        }
        <strong className="font-semibold text-fg">BI.ZONE</strong>
        {", internal platforms for an EU marketplace at "}
        <strong className="font-semibold text-fg">Joom</strong>
        {", an enterprise DevOps product at "}
        <strong className="font-semibold text-fg">Innotech</strong>
        {" — then fullstack at "}
        <strong className="font-semibold text-fg">Yandex</strong>
        {
          ", where I own marketing and SEO infrastructure across Auto.ru, Realty and Travel."
        }
      </>
    ),
  },
  {
    body: (
      <>
        {"That now includes "}
        <span className="text-gold">LLM systems in production</span>
        {
          ": a news-triage pipeline I built for the Auto.ru newsroom, and two live products of my own. The model is rarely the interesting part; the system around it is — the retry-and-fallback chain, the rate limiter, the cost per request, the UI that lets a non-technical user trust the output."
        }
      </>
    ),
  },
  {
    body: "The two projects below are the proof. I own every layer of both — product decisions, code, and the VPS they run on. Try them live.",
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
    role: "Senior Fullstack Engineer",
    description:
      "Own the marketing and SEO infrastructure behind Auto.ru, Realty and Travel — an ad-feed platform serving ~250k live offers, SEO tooling, and the editorial backend behind ten Yandex media products. Shipped two products solo, requirements to production: a publication-planning calendar (Yandex Tracker API) that replaced Asana for the main editorial teams, and an LLM news-triage pipeline now in production for the Auto.ru newsroom. Mentored an intern through to a full-time offer.",
  },
  {
    company: "Innotech",
    dates: "May 2023 — Jul 2024",
    role: "Senior Frontend Engineer",
    description:
      "Frontend, Sfera.Releases — the release-management module of an enterprise DevOps platform that scaled to ~20,000 daily users at a top-2 Russian bank. On the team from the product's 2023 launch: built the release-lifecycle UI and the frontend for Netflix Conductor workflow orchestration — dozens of production workflows. Contributed to the platform's shared UI kit.",
  },
  {
    company: "Joom",
    dates: "Sep 2021 — Mar 2023",
    role: "Frontend Engineer",
    description:
      "Frontend of an in-house ticketing system for the 300-person support org of a cross-border e-commerce marketplace (25M MAU), processing 1,000+ daily tickets, and of the internal admin platform used by 20+ product teams.",
  },
  {
    company: "BI.ZONE",
    dates: "May 2020 — Sep 2021",
    role: "Frontend Engineer",
    description:
      "Frontend of defensive-security products: the UI of an incident-monitoring system, and an incident-remediation documentation portal I built and ran end to end — security analysts authored the content.",
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
      "Primary language across frontend, backend, and infra. Six years of production type-system work.",
  },
  {
    name: "Node.js",
    description:
      "Backend services, API design, integrations with external systems (Yandex Tracker, Webmaster, S3).",
  },
  {
    name: "Next.js",
    accent: "16",
    description:
      "App Router, RSC, streaming UI for AI chat. Production usage on the AI PR Reviewer and this site.",
  },
  {
    name: "React",
    description:
      "Six years of production experience — hooks, suspense, server components, internal design systems.",
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
    name: "Vercel AI SDK",
    description:
      "LLM integration: streaming, multi-step tool calling, structured output, provider fallback. Provider-agnostic abstractions.",
  },
  {
    name: "Redis",
    description:
      "Caching, rate limiting (sliding window / token bucket), session state.",
  },
  {
    name: "Docker, CI/CD",
    description:
      "Self-managed deployment: GitHub Actions, Docker, Coolify on a VPS — SSL, env management, SSE-friendly proxying.",
  },
];

export type CardLinkRow = {
  action: LinkAction;
  note?: string | LinkAction;
};

export type WorkProject = {
  title: string;
  tagline: string;
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
      "Paste a GitHub PR link — get a streaming, line-by-line AI review. Multi-step agent over Octokit, structured output, provider fallback, per-IP rate limiting.",
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
      },
      {
        action: {
          label: "Read the breakdown",
          href: tameTheElephantFacts.caseRoute,
        },
        note: "~8 min",
      },
    ],
  },
];

export const contactBody: ReactNode = (
  <>
    {"Open to "}
    <span className="text-gold">senior remote roles</span>
    {" and "}
    <span className="text-gold">contract work</span>
    {
      " with B2B SaaS teams shipping AI features. Remote-first, async-friendly, EU-aligned hours — and open to EU relocation."
    }
  </>
);
