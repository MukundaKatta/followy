# Followy

> Meetings that actually ship.

An AI teammate that joins every call, files Jira tickets, Slacks the follow-ups, and books the next meeting.

## Stack

- **Next.js 15** (App Router) · TypeScript strict
- **Tailwind v4** (`@tailwindcss/postcss`, CSS-first, no config file)
- `next/font/google` for Inter
- `pnpm` lockfile committed

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Zero config on Vercel — Next.js is auto-detected. No environment variables required. Push to `main` and Vercel builds automatically.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo widget, features, CTA |
| `/try` | Paste a meeting transcript → 3 mocked action items with owner + due date |
| `/api/waitlist` | POST `{ email }` → forwards to waitlist-api-sigma with `product: "followy"` |

## Status

**v0 skeleton** — landing preserved + `/try` demo wired. Product in planning.

- Live: https://followy.vercel.app
