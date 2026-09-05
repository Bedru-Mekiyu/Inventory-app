<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.0.3-000000?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7.0-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Stack_Auth-6366F1" alt="Stack Auth" />
  <br />
  <img src="https://img.shields.io/badge/status-active-22c55e" alt="Status: Active" />
  <img src="https://img.shields.io/badge/license-MIT-22c55e" alt="License: MIT" />
</p>

<div align="center">
  <h1>📦 Inventory App</h1>
  <p><strong>A modern, full-stack inventory management application built with Next.js 16, React 19, and Prisma.</strong></p>
  <p>Track products, monitor stock levels, and visualize inventory trends — all in one place.</p>
</div>

<br />

---

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Database Design](#database-design)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Development Workflow](#development-workflow)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

---

## Overview

**Inventory App** is a multi-tenant inventory management system that allows authenticated users to track their products, monitor stock levels, and gain insights through an interactive dashboard. Built on the Next.js 16 App Router with React Server Components, it delivers fast page loads and a seamless user experience.

Each user gets their own isolated inventory space — products created by one user are never visible to another.

> Built with ❤️ using [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [Stack Auth](https://stack-auth.com/), and [Tailwind CSS](https://tailwindcss.com/).

---

## Problem Statement

Small businesses and individual operators often struggle with inventory tracking. Spreadsheets are error-prone, and existing solutions are either too expensive or over-engineered.

**Inventory App** solves this by providing:

- **A simple, focused tool** — just products, quantities, and prices
- **Per-user isolation** — every user manages their own inventory securely
- **Instant insights** — dashboard with key metrics and visual trends
- **Zero configuration** — deploy and start tracking in minutes

---

## Key Features

| Feature | Description | Status |
|---------|-------------|--------|
| **🔐 Authentication** | Secure sign-in via Stack Auth (cookie-based sessions) | ✅ |
| **📊 Dashboard** | Key metrics, weekly product trends chart, stack level breakdown, efficiency gauge | ✅ |
| **📦 Product Inventory** | Table view with search, pagination, delete | ✅ |
| **➕ Add Product** | Form with validation (name, SKU, price, quantity, low-stock threshold) | ✅ |
| **⚙️ User Settings** | Account management via Stack Auth | ✅ |
| **🔍 Search** | Case-insensitive product name search across inventory | ✅ |
| **📄 Pagination** | Server-side paginated inventory list (6 per page) | ✅ |
| **📉 Low Stock Alerts** | Visual indicators for products below threshold | ✅ |
| **📈 Trends Chart** | 12-week product addition history via Recharts area chart | ✅ |
| **🎨 Modern UI** | Tailwind CSS v4 with clean, responsive layout | ✅ |

---

## User Roles

| Role | Capabilities |
|------|-------------|
| **Guest** | View landing page, sign in |
| **Authenticated User** | Full access: dashboard, inventory CRUD, settings, search, pagination |

Authentication is handled by **Stack Auth** with cookie-based session management. Unauthenticated users are redirected to `/sign-in`.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                 │
│                                                         │
│  ┌───────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Landing  │  │Dashboard │  │Inventory │  │Settings│ │
│  │  /        │  │/dashboard│  │/inventory│  │/settings │
│  └───────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                         │
│  ┌───────────┐  ┌──────────────────────────────┐       │
│  │ Add       │  │  Handler (Stack Auth)         │       │
│  │ /add-product│  │  /handler/[...stack]         │       │
│  └───────────┘  └──────────────────────────────┘       │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Server Actions                       │   │
│  │  createProduct()  │  deleteProduct()              │   │
│  └──────────────────────────────────────────────────┘   │
│                         │                                │
└─────────────────────────┼────────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              │       Prisma ORM       │
              │   @prisma/adapter-pg   │
              └───────────┬───────────┘
                          │
              ┌───────────┴───────────┐
              │      PostgreSQL        │
              │      (via pg pool)     │
              └───────────────────────┘
```

### Key Design Decisions

- **React Server Components by default** — only interactive components (chart, hover states) use `'use client'`
- **Server Actions** for mutations — no REST API overhead, built-in CSRF protection
- **Prisma + pg adapter** — connection pooling via `pg.Pool`
- **Stack Auth** — outsourced authentication with pre-built UI components
- **Tailwind CSS v4** — utility-first CSS with the new `@import "tailwindcss"` syntax

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [Next.js 16.0.3](https://nextjs.org/) (App Router) | React framework with SSR, RSC, and Server Actions |
| [React 19.2.0](https://react.dev/) | UI library |
| [TypeScript 5.9](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Recharts](https://recharts.org/) | Charting library (area chart) |

### Backend
| Technology | Purpose |
|------------|---------|
| [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) | Form handling & data mutations |
| [Prisma 7](https://www.prisma.io/) | ORM with PostgreSQL adapter |
| [Zod 4](https://zod.dev/) | Schema validation |

### Database
| Technology | Purpose |
|------------|---------|
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [pg](https://node-postgres.com/) / [postgres](https://github.com/porsager/postgres) | PostgreSQL drivers |
| [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) | Schema migrations |

### Authentication
| Technology | Purpose |
|------------|---------|
| [Stack Auth](https://stack-auth.com/) | Authentication & user management |
| Cookie-based sessions | Session storage |

### Developer Tooling
| Tool | Purpose |
|------|---------|
| [ESLint 9](https://eslint.org/) (flat config) | Code linting |
| [PostCSS](https://postcss.org/) | CSS processing |
| [tsx](https://tsx.is/) | TypeScript execution (seeds) |

---

## Database Design

### Entity: `Product`

```prisma
model Product {
  id         String   @id @default(cuid())
  userId     String
  name       String
  sku        String?  @unique
  price      Decimal  @db.Decimal(12, 2)
  quantity   Int      @default(0)
  lowStackAt Int?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([userId, name])
  @@index([createdAt])
}
```

### Design Notes

- **`userId`** enables per-user data isolation — every query filters by `userId`
- **`sku`** is optional but unique when provided (partial unique constraint via nullable unique in PostgreSQL)
- **`price`** uses `Decimal(12, 2)` for precise monetary values
- **`lowStackAt`** is an optional integer threshold — when `quantity <= lowStackAt`, the product is flagged as low stock (defaults to 5 if not set)
- **`@@index([userId, name])`** optimizes per-user search/listing queries
- **`@@index([createdAt])`** optimizes chronological sorting

### Migrations

| Migration | Date | Change |
|-----------|------|--------|
| `20251122162332` | Initial | Create `Product` table with indexes |
| `20251202213517` | Add | Add unique constraint on `sku` column |

---

## Project Structure

```
inventory/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (StackProvider + Geist fonts)
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Tailwind v4 entry point
│   ├── loading.tsx               # Suspense fallback
│   ├── dashboard/
│   │   └── page.tsx              # Dashboard (metrics, chart, stack levels)
│   ├── inventory/
│   │   └── page.tsx              # Product table with search & pagination
│   ├── add-product/
│   │   └── page.tsx              # Add product form
│   ├── settings/
│   │   └── page.tsx              # Account settings (Stack Auth)
│   ├── sign-in/
│   │   └── page.tsx              # Sign-in page
│   └── handler/
│       └── [...stack]/
│           └── page.tsx          # Stack Auth handler route
├── components/                   # Shared React components
│   ├── sidebar.tsx               # Navigation sidebar
│   ├── products-chart.tsx        # Area chart (client component)
│   └── pagination.tsx            # Pagination controls
├── lib/                          # Server-side modules
│   ├── auth.ts                   # getCurrentUser helper
│   ├── products.ts               # Server actions (create, delete)
│   └── prisma.ts                 # Prisma client singleton
├── stack/                        # Stack Auth configuration
│   ├── client.tsx                # StackClientApp
│   └── server.tsx                # StackServerApp
├── prisma/                       # Database layer
│   ├── schema.prisma             # Prisma schema
│   ├── seed.ts                   # Demo data seeder
│   └── migrations/               # Migration history
├── public/                       # Static assets
├── .github/workflows/ci.yml      # GitHub Actions CI workflow
├── next.config.ts                # Next.js configuration
├── prisma.config.ts              # Prisma v7 configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.mjs             # ESLint flat config
├── postcss.config.mjs            # PostCSS configuration
└── package.json                  # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18 (LTS recommended)
- [PostgreSQL](https://www.postgresql.org/) >= 14 (local or remote)
- A [Stack Auth](https://stack-auth.com/) account (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/inventory-app.git
cd inventory-app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/inventory?schema=public"

# Stack Auth - get these from https://app.stack-auth.com
NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-publishable-client-key"
STACK_SECRET_SERVER_KEY="your-stack-secret-server-key"
```

> **⚠️ Never commit `.env` to version control.** The `.gitignore` already excludes `.env*` files.

### Running Locally

```bash
# 1. Set up the database
npx prisma migrate dev

# 2. (Optional) Seed with 25 demo products
npm run db:seed

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** This project uses `next dev --webpack` (explicit webpack bundler). Development is on Next.js 16 which defaults to Turbopack; the `--webpack` flag ensures compatibility with the Prisma pg adapter.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (webpack) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed database with demo data |

---

## Development Workflow

1. **Database changes** — Edit `prisma/schema.prisma`, then run `npx prisma migrate dev --name <migration-name>`
2. **Add a page** — Create a new folder under `app/` with a `page.tsx` file
3. **Add a server action** — Export an `"use server"` function in `lib/*.ts`
4. **Add a component** — Create a file under `components/` (client components need `'use client'` directive)
5. **Lint** — Run `npm run lint` before committing

---

## API Reference

This application uses **Next.js Server Actions** instead of a traditional REST API. All mutations are server-side functions called directly from forms.

| Action | Function | Input | Returns |
|--------|----------|-------|---------|
| Create Product | `createProduct(formData)` | name, sku (opt), price, quantity, lowStackAt (opt) | Redirects to `/inventory` |
| Delete Product | `deleteProduct(formData)` | id (hidden input) | Redirects to `/inventory` |

### Internal helpers

| Helper | Location | Description |
|--------|----------|-------------|
| `getCurrentUser()` | `lib/auth.ts` | Gets authenticated user or redirects to `/sign-in` |

---

## Testing

> ⚠️ **Tests are not yet implemented.** This is a planned improvement.

The following testing infrastructure would integrate well with the current stack:

- **Vitest** or **Jest** for unit/integration tests
- **Playwright** for end-to-end testing
- **Testing Library** for React component tests

---

## Deployment

### Deploying to Production

This project is designed to deploy to any Node.js hosting platform that supports Next.js.

**Recommended platforms:**

- [Vercel](https://vercel.com/) — native Next.js support (zero-config)
- [Railway](https://railway.app/) — managed PostgreSQL + hosting
- [Render](https://render.com/) — web services + managed PostgreSQL

### Build

```bash
npm run build
```

The build output goes to `.next/`.

### Production Considerations

| Requirement | Details |
|-------------|---------|
| Database | PostgreSQL instance with `DATABASE_URL` environment variable |
| Node.js | Runtime >= 18 (the build artifact is a Node.js server) |
| Environment Variables | All `.env` vars must be set in the hosting platform |
| Prisma | Run `npx prisma migrate deploy` during deployment to apply migrations |
| Prisma Client | `@prisma/client` is listed in `serverExternalPackages` in `next.config.ts` |

> **Note:** The Prisma schema does not specify a datasource URL directly (`datasource db { provider = "postgresql" }`), relying on the `DATABASE_URL` env var. The `prisma.config.ts` file also reads `process.env.DATABASE_URL`. Ensure this is set in your deployment environment.

---

## Security

### Authentication

- **Stack Auth** manages user registration, sign-in, and sessions
- Sessions are stored in **HTTP cookies** via the `nextjs-cookie` token store
- The `StackHandler` route (`/handler/[...stack]`) handles all auth callbacks

### Authorization

- Every database query filters by `userId` — users can only access their own data
- Server actions verify the user's identity before performing mutations
- Unauthenticated access redirects to `/sign-in`

### Data Validation

- **Zod schemas** validate all input on the server before database writes
- `name` is required (min 1 character)
- `price` must be non-negative
- `quantity` must be a non-negative integer

### CSRF Protection

- **Inherently protected** — Next.js Server Actions include CSRF tokens automatically

### Best Practices

| Concern | Implementation |
|---------|---------------|
| Secrets | All secrets in environment variables; `.env*` gitignored |
| SQL Injection | Prevented by Prisma's parameterized queries |
| XSS | Prevented by React's default escaping |
| Input Validation | Zod schema validation on every server action |

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create a branch** — `git checkout -b feature/my-feature`
3. **Make your changes**
4. **Run the linter** — `npm run lint`
5. **Commit** with a clear message
6. **Push** to your fork
7. **Open a Pull Request**

### Code Style

- TypeScript strict mode is enabled
- ESLint flat config with Next.js core-web-vitals and TypeScript rules
- Tailwind CSS utility classes for styling (no CSS modules)
- Server Components by default; use `'use client'` only for interactivity

---

## Roadmap

- [ ] **Unit & integration tests** (Vitest + Testing Library)
- [ ] **E2E tests** (Playwright)
- [ ] **Product editing** (update existing products)
- [ ] **Import/Export** (CSV import/export for inventory)
- [ ] **Categories/Tags** for product grouping
- [ ] **Barcode scanning** (mobile camera input)
- [ ] **Stock history** (track quantity changes over time)
- [ ] **Email notifications** for low stock alerts
- [ ] **Multi-user teams** (shared inventory with role-based access)
- [ ] **Dark mode**
- [ ] **Docker deployment** with Dockerfile + docker-compose

> This roadmap is based on common inventory management needs. Have a suggestion? Open an issue!

---

## FAQ

### Why does the dev server use `--webpack`?
Next.js 16 defaults to Turbopack, but the Prisma PostgreSQL adapter has better compatibility with webpack. The `--webpack` flag ensures stability during development.

### Can I use a different database?
The schema uses PostgreSQL-specific features (`Decimal` type, `cuid`). Switching to another database would require schema adjustments.

### How do I reset the database?
Run `npx prisma migrate reset` to drop and recreate the database, then `npm run db:seed` to repopulate with demo data.

### How do I create a new user?
Users sign up through the Stack Auth sign-in page. There is no admin user creation flow.

### Is SKU uniqueness enforced?
Yes, when a SKU is provided, it must be unique across all products (defined as a unique constraint in the schema).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- [Next.js](https://nextjs.org/) — The React framework for production
- [Prisma](https://www.prisma.io/) — Next-generation ORM
- [Stack Auth](https://stack-auth.com/) — Authentication made simple
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Recharts](https://recharts.org/) — Composable charting library
- [Lucide](https://lucide.dev/) — Beautiful open-source icons
- [Vercel](https://vercel.com/) — Deployment platform

---

<p align="center">
  <sub>Built with TypeScript, React, and ❤️</sub>
</p>
