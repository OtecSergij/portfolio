import { site } from "@/config/site";
import { aiPrReviewerFacts, tameTheElephantFacts } from "@/content/projects";

export type ResumeLink = { text: string; href: string };

export type ResumeInline = string | ResumeLink;

export type ResumeContacts = {
  location: string;
  phone: string | null;
  email: ResumeLink;
  telegram: ResumeLink;
  web: readonly ResumeLink[];
};

export type ResumeSkillGroup = { label: string; items: readonly string[] };

export type ResumePeriod = { start: string; end: string };

export type ResumeRole = {
  title: string;
  company: string;
  period: ResumePeriod;
  descriptor: readonly string[];
  bullets: readonly string[];
};

export type ResumeProjectLink = ResumeLink & { note?: string };

export type ResumeProject = {
  name: string;
  labels: readonly string[];
  links: readonly ResumeProjectLink[];
  bullets: readonly string[];
  stack: readonly string[];
};

export type ResumeLanguage = { name: string; level: string };

export type Resume = {
  name: string;
  headline: readonly string[];
  contacts: ResumeContacts;
  availability: string;
  summary: readonly ResumeInline[];
  skills: readonly ResumeSkillGroup[];
  experience: readonly ResumeRole[];
  projects: readonly ResumeProject[];
  languages: readonly ResumeLanguage[];
};

function webLink(href: string): ResumeLink {
  const url = new URL(href);
  const host = url.host.replace(/^www\./, "");
  const path = url.pathname.replace(/\/$/, "");
  return { text: `${host}${path}`, href };
}

export const resumeFileName = `${site.name} ${site.role} CV.pdf`.replaceAll(
  " ",
  "_",
);

export const resumePublicPath = `/cv/${resumeFileName}`;

const { email, telegram, github, linkedin } = site.contacts;
const emailAddress = `${email.user}@${email.domain}`;
const reviewerLink = webLink(aiPrReviewerFacts.productUrl);
const tameDemoLink = webLink(tameTheElephantFacts.demoUrl);

export const resume: Resume = {
  name: site.name,
  headline: [site.role, "TypeScript", "React", "Node.js", "PostgreSQL"],
  contacts: {
    location: `${site.location} (CET)`,
    phone: null,
    email: { text: emailAddress, href: `mailto:${emailAddress}` },
    telegram: {
      text: `Telegram: @${telegram}`,
      href: `https://t.me/${telegram}`,
    },
    web: [
      webLink(site.siteUrl),
      webLink(github),
      ...(linkedin === null ? [] : [webLink(linkedin)]),
    ],
  },
  availability:
    "Open to remote work or relocation to Cyprus or elsewhere in the EU",
  summary: [
    "Senior Full-stack Engineer with 6+ years of production TypeScript: React since 2020, full-stack with Node.js and PostgreSQL since 2024. At Yandex: Node.js services, batch pipelines, React SSR, on-call; took an LLM news-monitoring service and a publication-planning calendar from requirements to production. Two live products built solo (",
    reviewerLink,
    ", ",
    tameDemoLink,
    ").",
  ],
  skills: [
    { label: "Programming languages", items: ["TypeScript", "JavaScript"] },
    {
      label: "Frontend",
      items: [
        "React",
        "Next.js",
        "server-side rendering (SSR)",
        "PWA",
        "Vite",
        "React Query",
        "Zod",
        "CSS Modules",
      ],
    },
    {
      label: "Backend and data",
      items: [
        "Node.js",
        "Express",
        "REST APIs",
        "PostgreSQL",
        "Prisma",
        "Drizzle ORM",
        "Redis",
        "S3-compatible object storage",
        "Server-Sent Events (SSE)",
      ],
    },
    {
      label: "Tooling and AI",
      items: [
        "Docker",
        "GitHub Actions (CI/CD)",
        "Testcontainers",
        "Prometheus",
        "Vercel AI SDK",
        "LLM integration",
      ],
    },
  ],
  experience: [
    {
      title: "Senior Full-stack Engineer",
      company: "Yandex",
      period: { start: "Aug 2024", end: "Present" },
      descriptor: [
        "Marketing and SEO infrastructure for Yandex Verticals (Auto.ru, Realty, Travel, Arenda); since April 2026, on the marketing team of Auto.ru, one of Russia's largest car classifieds sites.",
        "Full-stack: React UIs, Node.js services and batch pipelines in TypeScript, PostgreSQL, monitoring and on-call.",
      ],
      bullets: [
        "Built an LLM news-monitoring service for the Auto.ru newsroom and other teams as tech lead and sole engineer: it triages up to 1,000 articles a day from 22 sources and saves dozens of hours of manual monitoring and ~$2,000 in agency fees a month",
        "Built a publication-planning calendar for 4 editorial teams solo, from scratch to production; it replaced Asana for the core editorial teams",
        "Designed and built an idempotent Node.js batch pipeline that turns listing photos into slideshow videos for Yandex Direct ads, now in production",
        "Took on-call shifts for 10 production services, traced 5xx errors and out-of-memory crashes to root causes, and added PostgreSQL query timeouts to keep hung queries from piling up",
        "Built features for the team's ad-feed platform (~250k live offers), SEO tooling and the editorial backend for 10 Yandex media products",
        "Reworked SEO markup on 11 page types and made listing details, seller profiles and dealer contacts crawlable by rendering them server-side in React",
        "Mentored an intern through to a full-time offer",
      ],
    },
    {
      title: "Senior Frontend Engineer",
      company: "Innotech",
      period: { start: "May 2023", end: "Jul 2024" },
      descriptor: [
        "Fintech software vendor. Product: Sfera.Releases, the release-management module of an enterprise DevOps platform that scaled to ~20k daily users at a large bank.",
      ],
      bullets: [
        "Joined the team at the 2023 launch and built the release-lifecycle UI in React and TypeScript",
        "Built the frontend for workflow orchestration on Netflix Conductor from scratch; dozens of workflows went into production",
        "Contributed reusable components to the platform's shared UI library",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Joom",
      period: { start: "Sep 2021", end: "Mar 2023" },
      descriptor: ["Riga-based cross-border e-commerce marketplace, 25M MAU."],
      bullets: [
        "Built the React and TypeScript frontend of the in-house ticketing system that handled 1,000+ tickets a day for a 300-person support team",
        "Built the frontend of the internal admin platform used by 20+ product teams",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "BI.ZONE",
      period: { start: "Jun 2020", end: "Sep 2021" },
      descriptor: ["Cybersecurity vendor."],
      bullets: [
        "Shipped React and TypeScript UIs for the company's security products, including an incident-monitoring system",
        "Owned the frontend of an incident-response documentation portal end to end; security analysts wrote the content",
      ],
    },
  ],
  projects: [
    {
      name: aiPrReviewerFacts.name,
      labels: ["Live", "Solo", "Open source"],
      links: [
        { ...reviewerLink, note: "no signup" },
        webLink(aiPrReviewerFacts.sourceUrl),
      ],
      bullets: [
        "Reviews public GitHub pull requests: a multi-step tool-calling agent reads the repository and streams findings linked to exact lines on GitHub",
        "Findings carry file and line ranges, not quoted code: the server slices the real lines from the diff, so a hallucinated quote cannot reach the page",
        "Provider failover across three models hands the transcript to the next one, so a review resumes instead of restarting",
        "Per-IP sliding-window rate limiting in one Redis Lua script that fails open, so a Redis outage never takes the site down",
      ],
      stack: [
        "Next.js",
        "Vercel AI SDK",
        "PostgreSQL",
        "Redis",
        "Drizzle ORM",
        "Testcontainers",
      ],
    },
    {
      name: tameTheElephantFacts.name,
      labels: [
        "Live",
        "Solo",
        "Installable PWA",
        "Works offline",
        "English and Russian",
      ],
      links: [{ ...tameDemoLink, note: "one-click demo, no signup" }],
      bullets: [
        "Self-discipline PWA built on Jonathan Haidt's elephant-and-rider metaphor: habits earn points and temptations cost them, so points work as a currency, not a score",
        "Points ledger in PostgreSQL with a balance invariant and per-user advisory locks, so the same points cannot be spent twice",
        "400+ integration tests run in CI against a real PostgreSQL, including race tests that fire parallel requests at the ledger",
        "Design system built from scratch on CSS Modules and design tokens, with hand-built React charts and no component or chart library",
      ],
      stack: ["React", "Express", "Prisma", "PostgreSQL"],
    },
  ],
  languages: [
    { name: "Russian", level: "Native" },
    { name: "English", level: "B1 (intermediate)" },
  ],
};
