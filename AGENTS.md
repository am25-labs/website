# AGENTS.md

## Project Context

- This repo is `website`, the public AM25 website.
- It owns public marketing pages, cases, notes, legal pages, contact forms, the audit flow, and the public Content Hub landing at `/content`.
- The Content Hub product itself lives in the `dam` repo at `/Users/alejandromartir/DEV/am25-apps/dam`.
- When the user says "Content Hub" while working in this repo, treat it as the public website landing unless they explicitly ask for product/app behavior.
- Website content is primarily fetched from Plank CMS through `src/lib/plank/*`.
- The site uses Umami analytics from the root layout when `DEPLOY_ENV=production`.

## Package Manager

- Prefer pnpm over npm.
- Use `pnpm dlx` for one-off tools; never use `npx`.

## Framework Rules

- This project uses Next.js 16 App Router and React Server Components.
- Always use async `params`, `searchParams`, `cookies()`, and `headers()` patterns required by Next.js 16.
- Cache Components are not enabled in `next.config.ts`; do not assume `connection()` or `"use cache"` patterns are required unless the project enables them later.
- If Cache Components are enabled later, put uncached data access behind `connection()` and a `Suspense` boundary when the route can otherwise prerender or block the whole page.
- Never use `force-dynamic` with Next.js 16.
- Prefer Server Components for page composition and isolate interactive behavior in small Client Components.
- Use Route Handlers for public contact, audit, Plank preview, and webhook-like endpoints.

## Plank CMS

- Keep Plank client setup in `src/lib/plank/client.ts`.
- Keep reusable CMS fetches in `src/lib/plank/fetch.ts`.
- Use the existing cache option patterns: general content uses the long TTL, notes use the shorter TTL, and preview uses `cache: "no-store"`.
- For localized content, follow the existing pattern of fetching English and Spanish in parallel and falling back to the available locale.
- Draft/preview behavior should stay under `src/app/draft/*`, `src/app/api/plank/*`, and `src/lib/plank/draft.tsx`.
- Use `ContentRenderer` for rich Plank content instead of hand-parsing renderer output.

## CSS

- The app-level CSS entry is `src/app/globals.css`, which imports `src/styles/globals.css`.
- Keep Tailwind theme tokens, shadcn variables, and base layer rules in `src/styles/globals.css`.
- Put project-specific custom CSS in `src/styles/custom.css`.
- Prefer shadcn components and Tailwind utilities over custom CSS.

## shadcn

- This project uses the `radix-vega` shadcn style from `components.json`; preserve the existing visual language.
- Do not override `--radius` or shadcn radius tokens unless the user explicitly asks for a system-wide radius change.
- Do not add arbitrary rounded corners to feature code. Let shadcn components use their default radius unless a local pattern intentionally overrides it.
- Accept rounded shapes only when semantically circular or already established, such as avatars, status dots, badges, spinners, and tooltip markers.
- Use lucide-react icons in buttons and controls when an icon exists.
- Prefer existing UI components in `src/components/ui` and existing wrappers under `src/components/ui/custom`.

## Tailwind CSS

- When writing Tailwind CSS classes, responsive variants must be placed immediately after their related base utility.
- Keep Tailwind utility groups together.
- Prefer `p-4 md:p-8 mx-auto` over `p-4 mx-auto md:p-8`.
- Preserve the existing grid helpers under `src/components/grids` for page layouts.

## UI Copy

- Write UI copy in English unless the specific page or flow is localized.
- Do not end UI descriptions with periods.
- Keep public-facing copy concise and consistent with the AM25 tone already in the site.
- For localized notes and legal pages, keep language switching behavior consistent with the existing EN/ES tabs.

## Forms, Mail, and Turnstile

- Use `src/components/contact/turnstile.tsx` for Cloudflare Turnstile widgets.
- Verify Turnstile tokens server-side with `verifyTurnstile` from `src/lib/contact.ts`.
- Send email only through `sendMail` from `src/lib/mailer.ts`.
- Keep contact payload parsing and lightweight validation helpers in `src/lib/contact.ts`.
- Public form endpoints should live under `src/app/api/contact/*`.
- Reuse `src/lib/validation.ts` for shared client-side name and email checks.

## Metadata

- Use `src/lib/metadata.ts` as the base metadata source.
- Add page-level `generateMetadata` when title, description, or canonical URL vary by page.
- Use `export const viewport` or `generateViewport` for viewport-specific settings; do not put viewport or theme-color fields inside `metadata`.

## API Routing

- Keep public contact endpoints under `/api/contact/*`.
- Keep audit endpoints under `/api/audit/*`.
- Keep Plank preview and sync endpoints under `/api/plank/*`.
- Do not introduce versioned internal API routes in this website unless the user asks for a public protocol that requires versioning.

## Dates

- Use `formatDate` from `src/lib/utils.ts` for visible dates.
- Do not format user-facing dates with ad hoc `toLocaleDateString`, `Intl.DateTimeFormat`, or manual string assembly outside the shared helper.
- Keep calendar-only CMS values as strings when possible and pass them through the shared date helper.

## File Naming

- Use `kebab-case` for all source file names.
- React components must be exported in `PascalCase`.
- Hooks must use the `use-*` naming pattern.
- Do not introduce `PascalCase` file names.

## Validation & Verification

- Prefer the fastest verification path available.
- For TypeScript changes, run `pnpm exec tsc --noEmit`.
- The current `pnpm lint` script uses `next lint`, which is not compatible with the current Next.js behavior in this repo; do not treat that failure as a change-specific lint failure.
- Run production builds only when explicitly requested.
- Skip validation for documentation-only changes unless the user explicitly asks for it.
