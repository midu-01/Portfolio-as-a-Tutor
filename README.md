# Midu Mojumder Tutor Portfolio

A premium, responsive tutor portfolio built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, Framer Motion, Prisma, PostgreSQL, and Auth.js.

## Stack

- Next.js 15+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style reusable components
- Framer Motion
- next-themes
- Lucide React
- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth credentials auth
- React Hook Form + Zod
- Sonner toasts
- Vercel Blob for optional profile image upload

## Features

- Premium single-page public portfolio with sticky, collapsible sidebar
- Light and dark mode with persistent theme preference
- Data-driven homepage sections with visibility and order control
- Admin login and protected dashboard
- CMS-like editing for hero, about, subjects, experience, achievements, education, highlights, testimonials, contact info, FAQ, and site settings
- Contact inquiry form stored in PostgreSQL
- SEO metadata, Open Graph, Twitter cards, sitemap, robots, and JSON-LD
- Vercel-friendly structure with Prisma and server actions

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Copy the environment file

```bash
cp .env.example .env
```

3. Update `.env`

- `DATABASE_URL`: PostgreSQL database URL from Neon, Supabase, or another provider
- `AUTH_SECRET`: random secret for Auth.js
- `NEXT_PUBLIC_APP_URL`: your public site URL
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: seed credentials
- `BLOB_READ_WRITE_TOKEN`: optional, needed only if you want dashboard image uploads

4. Generate the Prisma client and push the schema

```bash
npm run db:generate
npm run db:push
```

5. Seed the database

```bash
npm run db:seed
```

6. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin/login` for the dashboard.

## Default Seed Login

The seed script uses:

- email: value from `ADMIN_EMAIL`
- password: value from `ADMIN_PASSWORD`

If you keep the example values, the default login is:

- `admin@example.com`
- `ChangeMe123!`

Change these before production use.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:seed
```

## Deployment Notes

### Vercel

- Add all environment variables from `.env.example` to your Vercel project.
- Set `NEXT_PUBLIC_APP_URL` to your production domain.
- If you want profile image uploads, also add `BLOB_READ_WRITE_TOKEN`.
- Use a hosted PostgreSQL database such as Neon or Supabase.

### Prisma

For production, prefer running migrations rather than relying only on `db push`.

```bash
npm run db:migrate
```

## Project Structure

```text
src/
  app/
    (auth)/admin/login
    (dashboard)/admin
    api/auth/[...nextauth]
  actions/
  components/
    admin/
    forms/
    layout/
    portfolio/
    providers/
    ui/
  hooks/
  lib/
  types/
prisma/
  schema.prisma
  seed.ts
```

## Notes

- The dashboard is protected with middleware and server-side route guards.
- Public content is database-driven, so content updates do not require code changes.
- The homepage sidebar navigation is driven by the `SiteSection` records in the database.
- Profile image upload is implemented with Vercel Blob because writing local uploads is not durable on Vercel.
