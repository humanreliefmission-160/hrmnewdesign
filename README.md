# Human Relief Mission Website

The official website and internal operations platform for **Human Relief Mission (HRM)**, a humanitarian non-profit organisation. The system is designed as a single, unified Next.js application that serves three distinct audiences: the public facing charity website, an internal operations dashboard and an embedded Sanity CMS studio - all under one codebase and one deployment.

---

## Purpose & Design Philosophy

HRM needed more than a marketing site. The platform handles:

- **Public engagement** — presenting projects, impact reports, and donation capabilities to the world
- **Donation processing** — collecting one-time and recurring donations via Stripe with automated email receipts
- **Newsletter subscriptions** — integrated Mailchimp sign-up and management
- **Internal operations** — a protected dashboard for staff to view donation records and operational data backed by Supabase
- **Content management** — a fully embedded Sanity Studio so editors can update all site content without touching code

Everything is co located in one repo to avoid the operational overhead of managing separate frontend, CMS, and admin projects. Route groups and middleware handle access control between the public, admin, and operations surfaces.

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 16 (App Router)** | Core framework — routing, SSR, API routes, middleware |
| **React 19** | UI rendering |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations and page transitions |
| **Sanity v5** | Headless CMS — content authoring, image hosting via CDN, GROQ querying |
| **Supabase** | Postgres database for donation records and operational data; used with SSR auth helpers |
| **Stripe** | Donation payment processing (one-time & recurring); webhook handling |
| **Resend + React Email** | Transactional emails — donation receipts, contact form replies |
| **Mailchimp** | Newsletter subscription management |
| **next-intl** | Internationalisation (i18n) — locale-aware routing and translations |
| **Lucide React / React Icons** | Icon libraries |
| **Google Analytics** | Analytics via `@next/third-parties` |

---

## Project Structure

```
hrmnewdesign/
├── app/
│   ├── [locale]/                   # All locale-scoped routes
│   │   ├── (website)/              # Public-facing website
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── donate/
│   │   │   ├── contact/
│   │   │   ├── annual-reports/
│   │   │   ├── ecosystem/
│   │   │   ├── policies/
│   │   │   └── components/         # Shared website UI components
│   │   ├── (admin)/                # Password-protected admin area
│   │   │   └── [random-string]/    # Obfuscated admin route
│   │   └── (operations)/           # Internal operations dashboard
│   │       ├── dashboard/
│   │       └── database/
│   ├── api/                        # Next.js API routes (server-side)
│   │   ├── donations/              # Donation record endpoints
│   │   ├── stripe/                 # Stripe webhook & payment intents
│   │   ├── emails/                 # Transactional email sending
│   │   ├── newsletter/             # Mailchimp subscription
│   │   ├── contact/                # Contact form handler
│   │   ├── geo/                    # Geolocation helpers
│   │   └── sanity/                 # Sanity webhook / on-demand revalidation
│   ├── studio/                     # Embedded Sanity Studio (at /studio)
│   ├── sitemap.ts                  # Dynamic XML sitemap
│   └── robots.ts                   # robots.txt
├── sanity/
│   ├── schemaTypes/                # Sanity content schemas
│   ├── lib/                        # Sanity client, image builder
│   └── components/                 # Custom Sanity Studio UI components
├── lib/
│   └── antiSpam.ts                 # Server-side anti-spam utilities
├── src/
│   └── i18n/                       # next-intl configuration & request handler
├── messages/
│   └── en.json                     # English translation strings
├── scripts/
│   └── seed-supabase.js            # DB seeding script
├── types/                          # Shared TypeScript type definitions
├── public/                         # Static assets
├── next.config.ts                  # Next.js config (CSP headers, image domains, intl)
├── sanity.config.ts                # Sanity Studio config
├── tailwind.config.js              # Tailwind theme config
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Sanity project ([sanity.io](https://sanity.io))
- A Supabase project
- A Stripe account
- A Resend account
- A Mailchimp account

### Environment Variables

Copy `.env` and fill in your keys:

```bash
cp .env .env.local
```

Key variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `MAILCHIMP_API_KEY`.

### Development

```bash
npm install
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run dev:studio   # Start Sanity Studio standalone (optional)
```

### Database Seeding

```bash
npm run seed:supabase
```

### Production Build

```bash
npm run build
npm run start
```

---

## Client-Side Session Storage

The donation flow uses two `sessionStorage` keys to carry state across page navigations. Both keys are exported from `app/[locale]/(website)/donate/DonateClient.tsx` so they can be imported by any page that needs to read them.

| Key | Constant | Purpose |
|---|---|---|
| `hrm_donation_result` | `DONATION_SESSION_KEY` | Full donation receipt payload written after every payment attempt (success **or** failure). Read by `/donate/donate-success` and `/donate/donate-fail` to render the summary card. |
| `hrm_donation_form` | `DONATION_FORM_KEY` | Snapshot of the donor's form inputs (personal details + Gift Aid choice). Written on every field change during the checkout flow. Read on mount so that clicking **"Try Again"** after a declined payment restores all fields automatically. Removed when a payment succeeds. |

### Lifecycle

```
User fills Step 3 (Gift Aid) + Step 4 (Details)
  → hrm_donation_form written & kept in sync

User clicks "Donate Now"
  → completeDonation() runs
  → hrm_donation_result written (always)

  ┌─ Payment succeeds ─────────────────────────────────────────┐
  │  hrm_donation_form removed                                 │
  │  User redirected → /donate/donate-success                  │
  └────────────────────────────────────────────────────────────┘

  ┌─ Payment declined ─────────────────────────────────────────┐
  │  hrm_donation_form kept in sessionStorage                  │
  │  User redirected → /donate/donate-fail                     │
  │  User clicks "Try Again" → /donate?step=5                  │
  │  DonateClient mounts, reads hrm_donation_form              │
  │  All fields pre-filled; user only needs to re-enter card   │
  └────────────────────────────────────────────────────────────┘
```

> **Note:** `sessionStorage` is scoped to the browser tab and is cleared automatically when the tab is closed. A page *refresh* on `/donate` will still restore the saved form (sessionStorage survives refreshes). If a user wants a truly fresh start they should close and reopen the tab, or clear their browser storage.

---

## Key Architectural Decisions

- **Route groups** (`(website)`, `(admin)`, `(operations)`) provide separate layouts and middleware behaviour without polluting the URL structure.
- **Locale-based routing** via `next-intl` wraps all routes under `[locale]`, enabling future multi-language support with minimal refactoring.
- **Sanity Studio is embedded** at `/studio` within the same Next.js app, eliminating a separate CMS deployment.
- **Supabase SSR helpers** are used rather than the client-only SDK to keep auth tokens server-side and avoid token leakage.
- **Strict CSP headers** are enforced at the `next.config.ts` level across all routes, covering Stripe, Google Analytics, Supabase, and Sanity CDN origins.
- **Anti-spam middleware** (`lib/antiSpam.ts`) protects the contact and donation API routes from automated abuse.
