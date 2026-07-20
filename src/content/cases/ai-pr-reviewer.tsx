import type { CaseStudy } from "@/content/cases/types";
import { aiPrReviewerFacts } from "@/content/projects";

const sanitizeForHandoffSnippet = `// Failover hands the accumulated transcript to the next provider —
// minus reasoning blocks and orphaned tool results.
function sanitizeForHandoff(messages: ModelMessage[]): ModelMessage[] {
  const keptToolCallIds = new Set<string>();
  const out: ModelMessage[] = [];
  for (const message of messages) {
    if (message.role === "assistant" && typeof message.content !== "string") {
      const content = message.content
        .filter((p) => p.type !== "reasoning")
        .filter((p) => !(p.type === "text" && p.text === ""));
      if (content.length === 0) continue;
      for (const p of content) {
        if (p.type === "tool-call") keptToolCallIds.add(p.toolCallId);
      }
      out.push({ ...message, content });
      continue;
    }
    if (message.role === "tool") {
      const content = message.content.filter(
        (p) => p.type === "tool-result" && keptToolCallIds.has(p.toolCallId)
      );
      if (content.length === 0) continue;
      out.push({ ...message, content });
      continue;
    }
    out.push(message);
  }
  return out;
}`;

const rateLimitSnippet = `-- One atomic pass: check every sliding window, consume only if all allow.
for i = 1, #KEYS do
  local window = tonumber(ARGV[2 * i + 1])
  local limit = tonumber(ARGV[2 * i + 2])
  redis.call('ZREMRANGEBYSCORE', KEYS[i], '-inf', now - window)
  local count = redis.call('ZCARD', KEYS[i])
  if count >= limit then
    local idx = count - limit
    local entry = redis.call('ZRANGE', KEYS[i], idx, idx, 'WITHSCORES')
    local wait = tonumber(entry[2]) + window - now
    if wait > retryAfter then
      retryAfter = wait
      blocked = i
    end
  end
end
if blocked > 0 then
  return {0, blocked, retryAfter}
end
for i = 1, #KEYS do
  redis.call('ZADD', KEYS[i], now, ARGV[2])
  redis.call('PEXPIRE', KEYS[i], ARGV[2 * i + 1])
end`;

export const aiPrReviewer: CaseStudy = {
  title: aiPrReviewerFacts.name,
  titleLines: ["AI PR", "Reviewer"],
  pills: aiPrReviewerFacts.badges,
  tagline: [
    "Paste a public GitHub PR link — a ",
    { highlight: "multi-step tool-calling agent" },
    " walks the repository and streams a line-by-line review, every issue pinned to the exact lines on GitHub.",
  ],
  meta: [
    { k: "Role", v: "Solo · Design + Build + Ops" },
    { k: "Timeline", v: "May — Jul 2026" },
    { k: "Status", v: aiPrReviewerFacts.status.label },
    { k: "Stack", v: "TS · Next.js · AI SDK · Postgres · Redis" },
  ],
  heroFigureCaption:
    "Fig 01 · The review workspace mid-run — PR header, streaming issue cards, agent console",
  heroImage: {
    src: "/screenshots/reviewer-run.png",
    alt: "The review workspace mid-run: the agent console narrating tool calls while an issue card streams in.",
    position: "left top",
  },
  sections: [
    {
      id: "problem",
      title: "The Problem",
      blocks: [
        {
          type: "paragraph",
          lead: true,
          body: "AI code review has an obvious pitch and an obvious failure mode: a wall of confident prose about your diff, with no locations, no evidence, and no way to check any of it short of re-reviewing the PR yourself.",
        },
        {
          type: "paragraph",
          body: "I built this project to attack that from both ends. On the product end, a review is only worth reading if every finding carries an exact file and line range plus the code it's talking about — so verifying a claim costs one click, not a re-read. On the engineering end, I wanted a public, inspectable answer to what shipping an LLM feature actually involves once you leave the happy path. The model call is the easy part; everything around it is where this project lives:",
        },
        {
          type: "list",
          items: [
            "A provider dies at step 40 of a 60-step review — do you restart, or resume on the next one?",
            "Free-tier rate limits arrive mid-stream, shaped differently by every provider's API.",
            "The model reports an issue on a line that isn't in the diff, or “quotes” code it never read.",
            "A public endpoint with no signup spends real API quota, so it needs abuse control that won't take the site down with it.",
          ],
        },
        {
          type: "paragraph",
          body: "Working demos that stop before these problems are everywhere. This project is about the rest — with the source public, so none of it has to be taken on faith.",
        },
      ],
    },
    {
      id: "approach",
      title: "The Approach",
      blocks: [
        {
          type: "paragraph",
          body: "The naive build is a pipeline: fetch the diff, stuff it into one prompt, parse whatever comes back. It breaks on the first real PR — diffs overflow free-tier context windows, and a diff alone often can't tell you whether a change is wrong. The answer usually lives in the surrounding file.",
        },
        {
          type: "paragraph",
          body: (
            <>
              {
                "So the reviewer is an agent, not a pipeline. The model gets six tools over an Octokit adapter — "
              }
              <code>get_pr_metadata</code>
              {", "}
              <code>get_pr_files_summary</code>
              {", "}
              <code>get_diff</code>
              {", "}
              <code>get_file_contents</code>
              {", "}
              <code>list_directory</code>
              {", "}
              <code>emit_issue</code>
              {
                " — and decides what to read within a 60-step budget. The tool descriptions push back against over-fetching: full file contents are documented as a last resort for when the diff alone is insufficient, and PRs are capped at 15 changed files instead of pretending unlimited scope works on free-tier context."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: (
            <>
              {
                "The decision that shapes everything else: findings are tool calls, not prose. When the model confirms a problem, it calls "
              }
              <code>emit_issue</code>
              {
                " with a Zod-validated payload — file, 1-based line range, a severity from a fixed four-level rubric, title, explanation, optional fix. Malformed output is rejected at the boundary instead of leaking into the UI. Repeats are deduplicated by a content hash and answered with "
              }
              <code>duplicate: true</code>
              {", so the model learns not to resend."}
            </>
          ),
        },
        {
          type: "paragraph",
          body: "And the model never sends code. It sends locations; the backend slices the actual snippet out of the PR's unified diff, three context lines around the target range, and pins the GitHub link to the reviewed commit. A hallucinated quote has no path to the screen.",
        },
        {
          type: "pullquote",
          quote:
            "Every issue links to the exact lines on GitHub. The point isn't that the reviewer is always right — it's that checking it costs one click.",
        },
        {
          type: "paragraph",
          body: "The system prompt is deliberately conservative: report only what this PR introduces, skip anything uncertain, and when there's nothing to say, say exactly “No issues found.” An AI reviewer that pads its output to look thorough is worse than none.",
        },
      ],
    },
    {
      id: "solution",
      title: "The Solution",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              {
                "What you see: paste a PR URL and the review streams in over SSE. An agent console narrates the run — each tool call as a row with a live outcome (running, ok, skipped, failed), interleaved with the model's commentary — while a step counter and a token counter tick as it works. Issue cards appear the moment "
              }
              <code>emit_issue</code>
              {
                " fires, not when the review ends: severity, title, markdown explanation, optional suggested fix, and the real diff slice with the target lines highlighted."
              }
            </>
          ),
        },
        {
          type: "figure",
          caption:
            "Fig 02 · Issue cards streaming in while the agent console reports each tool call",
          image: {
            src: "/screenshots/reviewer-complete.png",
            alt: "A completed review: severity summary, share link, and an issue card pinned to a diff slice.",
            position: "left top",
          },
        },
        {
          type: "paragraph",
          body: (
            <>
              {"Every completed public review persists to a shareable page at "}
              <code>/r/&lt;slug&gt;</code>
              {". The slug is derived, not random: a hash of "}
              <code>owner/repo#pr@headSha</code>
              {
                " encoded to 11 base62 characters, upserted on conflict — reviewing the same head twice updates the same URL instead of minting a new one. The share page re-renders the cards server-side with severity counts, the provider that produced the review, and the reviewed commit SHA."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: "Two opt-in paths extend the free flow. Premium mode: bring your own Anthropic key and the review runs on Claude Sonnet instead of the free chain — the key travels inside that one request and is never stored. Private PRs: bring a GitHub PAT with read access; the agent reviews as usual, but the result is never persisted — no share page, nothing written.",
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      blocks: [
        {
          type: "paragraph",
          body: (
            <>
              {"The codebase enforces a one-way graph — "}
              <code>app/</code>
              {" is routing and UI, "}
              <code>lib/</code>
              {" is the domain, and "}
              <code>lib/</code>
              {" never imports from "}
              <code>app/</code>
              {
                ". External boundaries speak their own language: GitHub responses and LLM tool schemas stay "
              }
              <code>snake_case</code>
              {" and are translated to "}
              <code>camelCase</code>
              {
                " domain types at the adapter, so the domain never learns the shape of an external payload. These aren't habits — the module boundaries and the naming contract are written down as rules the codebase is held to."
              }
            </>
          ),
        },
        {
          type: "paragraph",
          body: "The centerpiece is the provider failover chain. The free path runs Cerebras (zai-glm-4.7), then Groq (gpt-oss-120b), then Gemini 2.5 Flash. Every failure passes through a taxonomy — eight classes, each with a verdict on whether to hop: rate limits, overloads, retryable 5xx and context overflow move to the next provider; invalid keys and user aborts stop the run. The part that took real iteration: a hop must resume, not restart. The transcript accumulated so far — tool calls and their results — is sanitized and handed to the next model: reasoning blocks stripped (they're provider-specific), empty text parts dropped, orphaned tool results removed, because no provider accepts a tool result whose call it can't see.",
        },
        {
          type: "code",
          lang: "typescript",
          langLabel: "TypeScript",
          file: "lib/review/run-review.ts",
          code: sanitizeForHandoffSnippet,
        },
        {
          type: "figure",
          caption:
            "Fig 03 · A failover event surfacing in the agent console mid-review",
          image: {
            src: "/screenshots/reviewer-failover.png",
            alt: "The agent console reporting a provider failover — Cerebras rate-limited, switching to Groq — mid-review.",
            position: "left top",
          },
        },
        {
          type: "paragraph",
          body: (
            <>
              {
                "Abuse control is a handwritten sliding-window log in Redis Lua. One script walks every window atomically — the review gate holds two (3 per hour and 10 per day, per IP), with a broader 25-per-hour request gate in front — and consumes only if all of them allow, returning the retry-after of the tightest violator. It fails open by design: the eval races a 500 ms timeout, and any Redis failure admits the request. Losing rate limiting for a few minutes is cheaper than turning a Redis hiccup into an outage. Client IPs come from the rightmost "
              }
              <code>X-Forwarded-For</code>
              {" entry, and only when "}
              <code>TRUST_PROXY</code>
              {" is explicitly enabled."}
            </>
          ),
        },
        {
          type: "code",
          lang: "lua",
          langLabel: "Lua",
          file: "embedded in lib/rate-limit.ts",
          code: rateLimitSnippet,
        },
        {
          type: "paragraph",
          body: (
            <>
              {
                "The ops story is small and strict. The environment is a Zod schema; the container entrypoint runs migrations, then a startup probe that asserts the env and pings Postgres and Redis with 5-second timeouts before the server boots — a misconfigured container exits instead of limping. CI enforces exactly that behavior: the pipeline docker-runs the freshly built image with no environment and fails the build if the container doesn't. Green builds push to GHCR, and Coolify auto-deploys behind Traefik on a VPS I run myself; a Docker "
              }
              <code>HEALTHCHECK</code>
              {
                " polls the liveness endpoint every 10 seconds, and the SSE stream passes through the proxy incrementally rather than buffering."
              }
            </>
          ),
        },
        { type: "subheading", title: "Key technical decisions" },
        {
          type: "list",
          items: [
            "Findings as tool calls, not prose — Zod at the boundary, content-hash dedup, and a UI that never parses free text.",
            "Server-side enrichment — the model sends locations; the backend slices real diff lines, so hallucinated code can't render.",
            "Failover carries the transcript — a sanitized tool-call history hands off mid-review instead of restarting from zero.",
            "Fail-open rate limiter — Redis being down costs limits, not availability; 500 ms budget on the Lua eval.",
            "Derived share slugs — hashed from the PR identity, so the same review maps to the same URL forever.",
            <>
              {"Fixture mode for UI work — "}
              <code>MOCK_REVIEW</code>
              {
                " streams the same chunk types as production, with six injectable failure scenarios; front-end iteration burns no tokens."
              }
            </>,
          ],
        },
      ],
    },
    {
      id: "tradeoffs",
      title: "Trade-offs",
      blocks: [
        {
          type: "paragraph",
          body: "The project keeps an explicit list of what it deliberately does not do. The ones that matter:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            <>
              <strong>{"No hexagonal/DDD layering."}</strong>
              {
                " The domain is data-in/data-out with no invariants to defend; use-case classes would be ceremony. Ports exist only where a real external service does — GitHub sits behind one, nothing else earns one."
              }
            </>,
            <>
              <strong>{"No libraries where a page of code suffices."}</strong>
              {
                " The rate limiter is a Lua script and a factory function; “config management” is one Zod schema. The written rule: a dependency arrives when the simple version stops coping, not before."
              }
            </>,
            <>
              <strong>
                {"A hard 15-file cap instead of chunking huge PRs."}
              </strong>
              {
                " Free-tier context windows are the real constraint. An honest 400 up front beats a review that silently skipped half the diff — the failure is visible instead of buried in the output."
              }
            </>,
            <>
              <strong>{"No accounts and no stored secrets."}</strong>
              {
                " Anthropic keys and GitHub PATs live only in the request that carries them; private-PR reviews are never persisted. Less product surface, far less liability for an app strangers are invited to poke at."
              }
            </>,
            <>
              <strong>
                {"No "}
                <code>src/</code>
                {", no "}
                <code>features/</code>
                {", no barrel files, no central "}
                <code>types/</code>
                {" folder."}
              </strong>
              {" One dominant feature lives in one home ("}
              <code>lib/review/</code>
              {
                "); structure follows the domain, not a template. For a single-feature app, scaffolding layers are cost without payoff."
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
          body: "Engineering facts, each checkable in the source:",
        },
        {
          type: "stats",
          items: [
            {
              k: "Output you can trust",
              v: "no invented code",
              note: "every snippet is pulled straight from your PR and linked to the exact lines on GitHub — the reviewer can't make code up",
            },
            {
              k: "Resilience",
              v: "3-model auto-failover",
              note: "if one AI provider fails or rate-limits mid-review, it resumes on the next instead of restarting from zero",
            },
            {
              k: "Runs in public",
              v: "no signup, abuse-proofed",
              note: "a free endpoint spends real API budget, so it caps usage per person — and a glitch in that cap can't take the site down",
            },
            {
              k: "Reviews in context",
              v: "reads beyond the diff",
              note: "a multi-step agent opens the surrounding files to judge a change in context, not just the diff",
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
              name: "TypeScript",
              description:
                "Strict, end to end: agent orchestration, API, and UI in one language.",
            },
            {
              name: "Next.js 16",
              description:
                "App Router; a thin route handler streams the review over SSE.",
            },
            {
              name: "Vercel AI SDK v6",
              description: (
                <>
                  {"Multi-step "}
                  <code>streamText</code>
                  {
                    " loop, tool definitions, one typed stream contract shared by server and client."
                  }
                </>
              ),
            },
            {
              name: "Octokit",
              description:
                "GitHub adapter behind a port: metadata, diffs, file contents — with retry and backoff.",
            },
            {
              name: "PostgreSQL + Drizzle",
              description: "Share-page store with idempotent slug upserts.",
            },
            {
              name: "Redis",
              description:
                "Per-IP sliding-window rate limiting in a single Lua round trip.",
            },
            {
              name: "Zod",
              description:
                "Every untrusted boundary: request bodies, model output, environment.",
            },
            {
              name: "Docker + Coolify + Traefik",
              description:
                "CI-built image on GHCR, self-hosted on a VPS, healthchecked, SSE-friendly proxying.",
            },
          ],
        },
      ],
    },
  ],
  cta: {
    heading: "Run it on a real PR",
    body: "The demo is live and needs no signup — paste any public GitHub PR and watch the agent work, failovers included. The source is public too: the key claims name specific files, and all of them are checkable.",
    actions: [
      {
        label: "Try it live",
        href: aiPrReviewerFacts.demoUrl,
        external: true,
        arrow: "→",
        variant: "solid",
      },
      {
        label: "Source on GitHub",
        href: aiPrReviewerFacts.sourceUrl,
        external: true,
        arrow: "↗",
      },
      { label: "Back to home", href: "/", arrow: "←" },
    ],
  },
};
