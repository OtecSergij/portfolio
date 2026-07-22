import type { CaseStudy } from "@/content/cases/types";
import { tameTheElephantFacts } from "@/content/projects";

const userLockSnippet = `export async function acquireUserLock(tx: Prisma.TransactionClient, userId: string): Promise<void> {
  await tx.$executeRaw\`SELECT pg_advisory_xact_lock(hashtext(\${userId}))\`;
}

export function withUserLock<T>(
  userId: string,
  fn: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async tx => {
    await acquireUserLock(tx, userId);
    return fn(tx);
  });
}`;

const errorCatalogSnippet = `type MissingCatalogEntry = Exclude<UserFacingCode, keyof Resources['errors']['codes']>;
type OrphanCatalogEntry = Exclude<keyof Resources['errors']['codes'], UserFacingCode>;
type AssertNone<T extends never> = T;
export type ErrorCatalogIsExhaustive = AssertNone<MissingCatalogEntry>;
export type ErrorCatalogHasNoOrphans = AssertNone<OrphanCatalogEntry>;`;

export const tameTheElephant: CaseStudy = {
  title: tameTheElephantFacts.name,
  titleLines: ["Tame the", "Elephant"],
  pills: tameTheElephantFacts.badges,
  tagline: [
    "A self-discipline PWA where ",
    { highlight: "habits earn points and temptations cost them" },
    " — with the economy underneath engineered like a small bank.",
  ],
  meta: [
    { k: "Role", v: "Solo · Product + Design + Full-stack + Ops" },
    { k: "Timeline", v: "Aug 2025 — present · alongside a full-time job" },
    { k: "Status", v: tameTheElephantFacts.status.label },
    { k: "Stack", v: "React · Express · Prisma · PostgreSQL" },
  ],
  heroFigureCaption:
    "Fig 01 · Home dashboard in the dark instrument-panel design — balance counter, today's habit and challenge cards, points-dynamics chart",
  heroImage: {
    src: "/screenshots/tte-home.png",
    alt: "The home dashboard: balance, today's habit and challenge cards with streaks and warnings, rewards, and the weekly points chart.",
    position: "center top",
  },
  sections: [
    {
      id: "problem",
      title: "The Problem",
      blocks: [
        {
          type: "paragraph",
          lead: true,
          body: "Habit trackers mostly agree on one mechanic: the streak. Which means they also agree on one failure mode: miss a day and the counter — weeks or months of it — goes to zero. The record of your effort is the thing the app threatens you with. I kept watching that pattern produce the same outcome, in myself and in people around me: after the reset, motivation doesn't restart. It quits.",
        },
        {
          type: "paragraph",
          body: "Two more gaps bothered me. Trackers treat temptation as the enemy — there's no legitimate place in them for coffee, a lazy evening, a game session, the things an actual life contains. You either “cheat” or log nothing. And their point systems are decorative: points you can't spend are a score, not an economy, and nothing about a score ever has to be correct.",
        },
        {
          type: "paragraph",
          body: "So the product problem was a discipline system where progress accumulates instead of evaporating and desires are priced instead of forbidden. And the engineering problem followed directly from it: the moment points buy things, you own a small currency — with double-spends, concurrent writes, and consistency obligations a score never has. That second problem is the one I wanted to build properly.",
        },
      ],
    },
    {
      id: "concept",
      title: "The Concept",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              {"The app is built on Jonathan Haidt's metaphor from "}
              <em>{"The Happiness Hypothesis"}</em>
              {
                ". The emotional mind is an elephant: strong, stubborn, drawn to easy pleasure. The rational mind is its rider: smart, tired, and — most evenings — not in charge. You don't argue with an elephant. You train it: reward the behavior you want, put a price on the behavior you don't."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: "The metaphor compiles into four entities:",
        },
        {
          type: "list",
          items: [
            <>
              <strong>{"Habits"}</strong>
              {" earn points when checked off. Morning workout — +10."}
            </>,
            <>
              <strong>{"Challenges"}</strong>
              {
                " earn points for every day you hold the line and charge a break price when you don't. No sugar — +10 a day, −100 on a break. The break price is deliberately a multiple of the daily reward: holding is profitable, breaking is expensive, and both are numbers, not moral judgments."
              }
            </>,
            <>
              <strong>{"Cravings"}</strong>
              {
                " are legalized temptations: specialty coffee −15, an evening of gaming −40. Spending isn't cheating — it's what the points are for. Without cravings the whole economy is theater."
              }
            </>,
            <>
              <strong>{"Rewards"}</strong>
              {
                " are long-horizon goals (new running shoes — 1,000 points), funded by an automatic percentage split from every earn plus manual deposits."
              }
            </>,
          ],
        },
        {
          type: "paragraph",
          body: "Streaks exist — day 3 pays ×2, day 7 ×3, day 14 ×4, day 21 ×5 — but they're a bonus curve, not a hostage. The rule I held throughout the design is accumulation over erasure. A break deducts the break price, clamped at whatever balance you have; it never drives the balance negative, never touches reward savings, and the best-streak record stays on the card. There's even a manual “I broke it” action, available at any hour — the product spec's reasoning: without it you either mark “held” (a lie) or leave the day hanging (anxiety), and honesty with yourself is part of the discipline. Every phrase in the app about a break ends with return, not guilt.",
        },
        {
          type: "paragraph",
          mute: true,
          body: "The visual language follows the same brief: a rider's field journal. Dark surfaces, monospaced type, stencil headings, gold accents on a drafting grid. No confetti, no motivational quotes, and — per the spec — no neuroscience lectures; the metaphor works at the intuitive level or not at all.",
        },
      ],
    },
    {
      id: "solution",
      title: "The Solution",
      blocks: [
        {
          type: "paragraph",
          body: "What's live today: an installable PWA — React + Vite, offline-precached, in English and Russian — against an Express + Prisma + PostgreSQL API. Sign-up is email+password or Google/GitHub. Home is a dashboard: balance, today's habits and challenges, a points-dynamics chart. Every balance-moving action lands in an events feed that doubles as the ledger, aggregated into dense time buckets for the charts.",
        },
        {
          type: "paragraph",
          body: "The charts themselves — a completion heatmap, bipolar earned/spent bars, a milestone track — are hand-built React components on the design-token system. No chart library was going to match the instrument-panel aesthetic, and the data shapes are simple enough that one wasn't needed.",
        },
        {
          type: "figure",
          caption:
            "Fig 02 · Journey view — habit and challenge cards with streak counters, warning states, and the milestone track",
          image: {
            src: "/screenshots/tte-journey.png",
            alt: "The Journey view: habit cards with streak and best counters, a milestone track, and a warning state on a lapsing streak.",
            position: "center top",
          },
        },
        {
          type: "figure",
          caption:
            "Fig 03 · Points dynamics — bipolar earned/spent bars over the events-feed buckets",
          image: {
            src: "/screenshots/tte-summary.png",
            alt: "The weekly summary: bipolar earned and spent bars per day, with the cravings quick-spend panel alongside.",
            position: "center bottom",
          },
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "paragraph",
          body: "A monorepo with npm workspaces: backend, frontend, shared. The shared workspace is load-bearing — Zod schemas and constants (the milestone curve included) are imported by both sides, so the same schema that validates an API payload on the server powers the form on the client. One source of truth for what a valid habit is.",
        },
        {
          type: "paragraph",
          body: (
            <>
              {
                "The part I treat most carefully is the economy. Every feed row is a ledger entry with a hard invariant: Σ(earned) − Σ(spent) = balance. Under Postgres's default READ COMMITTED isolation a plain "
              }
              <code>SELECT</code>
              {
                " locks nothing, so two concurrent requests can both pass a balance check made from the same stale read — and both write. Every read-check-write section (purchases, reward deposits, day-guarded crediting) therefore runs through a per-user, transaction-scoped advisory lock:"
              }
            </>
          ),
        },
        {
          type: "code",
          lang: "typescript",
          langLabel: "TypeScript",
          file: "backend/src/db/userLock.ts",
          code: userLockSnippet,
        },
        {
          type: "paragraph",
          body: "The caller's contract is to re-read all checked state inside the lock, never to reuse values fetched before it. A dedicated race suite fires N identical parallel requests against state that permits exactly one: five simultaneous purchases against a balance that covers one must produce one 201, four 400s, and a balance of exactly zero. And behind the lock sits a last line of defense — a database CHECK constraint that keeps the balance non-negative even if some future code path slips past the serialization.",
        },
        {
          type: "pullquote",
          quote:
            "A points economy is a small bank. Once I treated it like one — a ledger with an invariant, serialized writes, race tests in CI — most design questions answered themselves.",
        },
        { type: "subheading", title: "Key technical decisions" },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"The demo is engineered, not faked."}</strong>
              {
                " The one-click recruiter demo — the first thing anyone clicks — is provisioned as exactly the three rows better-auth's sign-in reads, in a single transaction with no outbound mail. Its multi-week history is backdated with the live scoring math, every timestamp anchored at local noon so the check-ins survive the on-read auto-reset in any timezone. The starting balance is computed from the rows the seed writes and asserted against the ledger invariant — a bad seed fails loud instead of shipping numbers that don't add up. Throwaway users are TTL-reaped, and the demo email namespace is reserved so a real sign-up can never be swept."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"Time is a product problem."}</strong>
              {
                " Every day-boundary — streak windows, warning states, auto-resets — is computed in the user's own timezone with DST-safe wall-clock math, so “today” stays correct from Honolulu to Auckland, including the twice-a-year 23- and 25-hour days."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"Codes-only error contract."}</strong>
              {
                " The backend never sends user-facing text: every error is a stable code plus raw params, and the frontend owns all wording through i18next. The contract is enforced at the type level — a backend code with no catalog entry, or an orphaned catalog key no code emits, fails typecheck:"
              }
            </>
          ),
        },
        {
          type: "code",
          lang: "typescript",
          langLabel: "TypeScript",
          file: "frontend/src/utils/errorCatalog.ts",
          code: errorCatalogSnippet,
        },
        {
          type: "paragraph",
          body: (
            <>
              {"An integration test pins the wire shape itself — required "}
              <code>code</code>
              {", raw "}
              <code>params</code>
              {", and the guarantee that unclassified 500s leak no internals."}
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"Auth built like it matters."}</strong>
              {
                " better-auth with DB-backed sessions in httpOnly cookies and Google/GitHub OAuth. Passwords go through Argon2id at OWASP parameters over an HMAC-SHA256 pepper, so a database dump alone isn't crackable; every new password is screened against Have I Been Pwned via the k-anonymity range API — only five characters of a hash ever leave the server. The login path does constant work whether or not the account exists — confirmed by reading the auth library's own sign-in handler, not bolted on — so timing can't reveal which emails are registered. Destructive operations (change password, unlink a provider, delete the account) require a session younger than two hours. Account linking keeps "
              }
              <code>trustedProviders</code>
              {
                " empty, so the provider's email-verified check can't be bypassed — the nOAuth class of account-takeover bugs."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"i18n as a build artifact."}</strong>
              {
                " i18next with types generated from the catalogs: 10 namespaces, English and Russian, extracted and type-checked in CI. Plurals follow CLDR rather than a naive singular/plural pair — English has two categories (one/other), Russian four (one/few/many/other), so 21 is singular-like in Russian but plural in English. The parity check compares plural categories, not key counts, and adding a UI string without both locales fails the build."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"PWA details nobody notices until they break."}</strong>
              {
                " The Workbox precache is hand-tuned: a navigation-fallback denylist so OAuth callbacks and emailed verify links reach the server instead of the cached SPA shell, and iOS splash assets kept out of precache. The splash set is sha-gated in CI against its source SVG — the generated bytes depend on the host Chrome version, so the check gates on the deterministic input, not the nondeterministic output."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"nginx in front, backend unreachable."}</strong>
              {" nginx serves the static build and proxies "}
              <code>/api/</code>
              {
                " to the backend over a private Docker network; the backend port is never published. CSP with "
              }
              <code>{"script-src 'self'"}</code>
              {" (no unsafe-inline for scripts), HSTS, "}
              <code>{"frame-ancestors 'none'"}</code>
              {
                ", rate limiting in three coordinated layers (an nginx burst zone, better-auth's DB-backed limiter, an Express per-minute budget) each keyed by the real client IP recovered from the proxy chain, and hidden sourcemaps that nginx additionally refuses to serve."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              <strong>{"Delivery."}</strong>
              {
                " GitHub Actions: quality gates (lint, typechecks, i18n check, splash hash) → the full integration suite → Docker images to GHCR → Coolify redeploys via webhook. Pull requests build both images without pushing, so a broken Dockerfile can't reach main."
              }
            </>
          ),
        },
      ],
    },
    {
      id: "tradeoffs",
      title: "Trade-offs",
      blocks: [
        {
          type: "paragraph",
          body: "Things I deliberately didn't build, with the reasoning on record:",
        },
        {
          type: "list",
          items: [
            <>
              <strong>{"No UI framework, no chart library."}</strong>
              {
                " The instrument-panel aesthetic would mean fighting a theme at every step, and the chart data shapes are simple. The design system is CSS Modules over hand-rolled design tokens; the charts are plain React and CSS. Cost: a slower first version. Paid once."
              }
            </>,
            <>
              <strong>
                {"No “motivation” field on habits and challenges."}
              </strong>
              {
                " The product spec documents why: the field goes dead in most trackers, it contradicts the metaphor (you don't negotiate with the elephant in words), and it breaks the 30-second create flow of title plus numbers."
              }
            </>,
            <>
              <strong>{"No toasts for routine actions."}</strong>
              {
                " Check-offs, breaks, and purchases confirm through animation and haptics; toasts are reserved for genuine events. A break intentionally gets no explanatory toast — the red counter animation and the reset series say everything."
              }
            </>,
            <>
              <strong>{"HIBP screening fails open."}</strong>
              {
                " A Have I Been Pwned outage must not block sign-ups, so the check degrades with a logged warning instead of an error. A conscious availability-over-strictness call."
              }
            </>,
            <>
              <strong>{"Soft email verification."}</strong>
              {
                " Login is never blocked on an unverified address; a password reset proves mailbox ownership and doubles as verification. Deletion receipts go only to verified addresses — an unverified one may belong to a stranger."
              }
            </>,
          ],
        },
      ],
    },
    {
      id: "proof",
      title: "Proof",
      blocks: [
        {
          type: "paragraph",
          mute: true,
          body: "Engineering facts instead of adoption numbers:",
        },
        {
          type: "stats",
          items: [
            {
              k: "Cheat-proof points",
              v: "zero double-spends",
              note: "the economy works like a bank ledger — rapid or simultaneous taps can't spend the same points twice or push a balance negative",
            },
            {
              k: "Tested for real",
              v: "400+ database tests",
              note: "every points rule, streak bonus, and race condition runs against a real PostgreSQL on every change — not mocked, with a dedicated parallel-request suite proving the economy can't double-spend",
            },
            {
              k: "A finished product",
              v: "installable & offline",
              note: "an installable app that works without a connection, fully in English and Russian",
            },
            {
              k: "Serious about security",
              v: "hashing + breach checks",
              note: "passwords hashed to current OWASP guidance and screened against known breaches; sensitive actions need a fresh login",
            },
          ],
        },
      ],
    },
    {
      id: "stack",
      title: "Tech Stack",
      blocks: [
        {
          type: "stack",
          rows: [
            {
              name: "React + Vite",
              description: "The PWA frontend, TypeScript throughout.",
            },
            {
              name: "CSS Modules + design tokens",
              description:
                "Hand-rolled dark “field console” system; no UI framework.",
            },
            {
              name: "React Query + React Hook Form",
              description:
                "Server state and forms, resolved against shared schemas.",
            },
            {
              name: "i18next",
              description:
                "Typed keys generated from the catalogs, en/ru, CI-enforced parity.",
            },
            {
              name: "Express + Prisma",
              description:
                "Modular API: habits, challenges, cravings, rewards, events, transactions.",
            },
            {
              name: "PostgreSQL",
              description:
                "Source of truth; advisory locks serialize the per-user economy.",
            },
            {
              name: "better-auth",
              description:
                "Cookie sessions, Google/GitHub OAuth, two-hour freshness gate for destructive ops.",
            },
            {
              name: "Zod (shared workspace)",
              description:
                "One schema validates the API payload and powers the client form.",
            },
            {
              name: "Workbox via vite-plugin-pwa",
              description:
                "Offline precache, install flow, generated iOS splash set.",
            },
            {
              name: "nginx",
              description:
                "Static serving, API proxy, CSP and security headers, request rate limiting.",
            },
            {
              name: "GitHub Actions + GHCR + Coolify",
              description:
                "Tests against Dockerized Postgres, image build, webhook deploy.",
            },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "See it running",
    body: "Tame the Elephant is in open beta at tame.day — sign up with an email or via Google/GitHub. The UI ships in English and Russian, installs to a home screen, and works offline. The source is private, so the demo is the artifact: everything claimed on this page is observable in the product, and I'm happy to walk through the code behind any section in a call.",
    actions: [
      {
        label: "Try it live",
        href: tameTheElephantFacts.demoUrl,
        external: true,
        arrow: "→",
        variant: "solid",
      },
      {
        label: "Try the demo (no signup)",
        href: `${tameTheElephantFacts.demoUrl}/demo`,
        external: true,
        arrow: "→",
      },
      { label: "Back to home", href: "/", arrow: "←" },
    ],
  },
};
