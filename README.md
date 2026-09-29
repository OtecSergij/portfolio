# zablotsky.dev

Personal site of [Dmitry Zablotsky](https://zablotsky.dev) — senior full-stack
engineer.

Three static routes — the one-pager home plus two case studies
(`/ai-pr-reviewer`, `/tame-the-elephant`) — with generated Open Graph images
(`next/og`), sitemap/robots metadata routes, and JSON-LD.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, standalone output, all routes
  statically prerendered)
- TypeScript (strict)
- Tailwind CSS 4 — design tokens live in `src/app/globals.css` and are exposed
  to utilities through `@theme`
- Docker (multi-stage, non-root) · GitHub Actions → GHCR → Coolify

## Development

```bash
npm install
npm run dev
```

Checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run format
```

Node 24 (see `.nvmrc`).

`package.json` overrides Next's exact `postcss@8.4.31` pin to `^8.5.10`: this
clears two moderate `npm audit` advisories (GHSA-qx2v-qp2m-jg93) and dedupes
with Tailwind 4's `postcss@^8.5.15`. Drop the override once Next depends on
`postcss >= 8.5.10`.

### CV

The `prebuild` hook renders the public resume PDF (no phone) from
`src/content/resume.ts` into `public/cv/`, so `npm run build` always ships a
PDF that matches the data. The folder is generated and gitignored.

The application variant adds a phone number and refuses any output path
inside the repository; by default it goes to `~/Downloads/`:

```bash
CV_PHONE='+381 …' npm run build:cv -- --variant application [--out <file>]
```

Prefix `NEXT_PUBLIC_LINKEDIN_URL=…` to add the LinkedIn line. The script runs
under `tsx`, which does not read `.env` files, so both variables have to come
from the shell.

## Environment

The site runs with no environment set — every variable is optional.

| Variable                       | Purpose                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_UMAMI_SRC`        | URL of the self-hosted [Umami](https://umami.is) tracking script (`.../script.js`). |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Umami website ID for this site.                                                     |

Both must be set for the tracking script to render; with either one missing
the site ships zero analytics. Umami is cookieless, so no consent banner is
needed either way. The values are inlined at build time (`NEXT_PUBLIC_`):
put them in `.env.local` for local builds or pass them as Docker build args —
CI forwards repository variables of the same names. See `.env.example`.

## Docker

```bash
docker build -t portfolio .
docker run --rm -p 3000:3000 portfolio
```

The image builds the app and runs the standalone Node server as a non-root
user with a container healthcheck. To bake analytics in, pass
`--build-arg NEXT_PUBLIC_UMAMI_SRC=... --build-arg NEXT_PUBLIC_UMAMI_WEBSITE_ID=...`.

## Deployment

Every push and PR runs lint, format check, typecheck and build, then builds
the Docker image and smoke-tests the container. On `main`, CI additionally
pushes the image to GHCR and triggers a Coolify deploy via the
`COOLIFY_DEPLOY_URL` / `COOLIFY_TOKEN` repository secrets.
