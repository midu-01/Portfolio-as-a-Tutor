# Midu's Coaching

A premium, database-driven tutor portfolio and admin dashboard built for **Midu Mojumder**.  
This project combines a polished public-facing website with a secure admin panel so content can be updated without editing code.

It is designed for:

- private tutors
- academic mentors
- education-focused personal brands
- Vercel deployment with PostgreSQL and Prisma

## Overview

This project includes two major parts:

1. A modern public portfolio website with:
- responsive layout
- sticky left sidebar navigation
- fixed right profile sidebar on desktop
- light and dark theme support
- smooth section-based single-page experience

2. A secure admin dashboard with:
- credentials-based login
- content editing for all major homepage sections
- section visibility and ordering controls
- testimonial management
- SEO and site settings management

## Core Features

### Public Website

- Single-page portfolio homepage
- Responsive design for mobile, tablet, laptop, and desktop
- Left sidebar with smooth-scroll navigation
- Right profile sidebar for key tutor highlights
- Hero section with profile, CTA, and trust-building content
- Sections for:
  - About
  - Subjects
  - Experience
  - Achievements
  - Why Choose Me
  - Education
  - Highlights
  - Testimonials
  - FAQ
  - Contact
- Dark mode and light mode with persisted preference
- JSON-LD, Open Graph, Twitter metadata, sitemap, and robots.txt

### Admin Dashboard

- Admin authentication with Auth.js / NextAuth
- Protected admin routes
- CRUD-style editing flows for portfolio content
- Database-backed content updates
- Reorder and visibility controls for homepage sections
- Contact information management
- FAQ and testimonial management
- Profile image URL support
- Optional Vercel Blob upload support

## Tech Stack

- `Next.js 15` with App Router
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `next-themes`
- `Lucide React`
- `Prisma ORM`
- `PostgreSQL`
- `Auth.js / NextAuth`
- `React Hook Form`
- `Zod`
- `Sonner`
- `Vercel Blob` for optional image upload

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

public/
  profile/
```

## Environment Variables

Create a local `.env` file from `.env.example`.

### Required

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### Optional

- `BLOB_READ_WRITE_TOKEN`

If `BLOB_READ_WRITE_TOKEN` is not provided:

- dashboard image upload is disabled
- you can still use a direct image URL in the admin settings
- the homepage can also fall back to a local image inside `public/profile`

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

```bash
cp .env.example .env
```

Update the values as needed.

### 3. Push the database schema

```bash
npm run db:push
```

### 4. Seed the database

```bash
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

## Default Admin Login

The default admin login is taken from your `.env` values:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

If you use the example values, the login is:

- Email: `admin@example.com`
- Password: `ChangeMe123!`

Change these before production use.

## Database Workflow

### Generate Prisma client

```bash
npm run db:generate
```

### Push schema changes

```bash
npm run db:push
```

### Run seed file

```bash
npm run db:seed
```

### Create development migrations

```bash
npm run db:migrate
```

## Local Profile Photo

If no remote/admin profile image is set, the site can use a local default image from:

```text
public/profile/
```

Supported filenames:

- `tutor-photo.jpg`
- `tutor-photo.jpeg`
- `tutor-photo.png`
- `tutor-photo.webp`

There is also a helper note in:

- [public/profile/PUT-YOUR-PHOTO-HERE.txt](/Users/midu/Downloads/Portfolio%20as%20a%20Tutor/public/profile/PUT-YOUR-PHOTO-HERE.txt)

## Useful Scripts

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

## Deployment

### Recommended Platform

- `Vercel`

### Recommended Database

- `Neon`
- `Supabase`

### Deployment Notes

- Set all production environment variables in Vercel
- Use a production PostgreSQL database
- Prefer Prisma migrations in production
- Set `NEXT_PUBLIC_APP_URL` to your production domain
- Add `BLOB_READ_WRITE_TOKEN` only if you want dashboard uploads through Vercel Blob

## Content Management Notes

- Public content is database-driven
- Updating dashboard content does not require code edits
- The homepage sidebar order is controlled from the database
- The admin dashboard is protected by middleware and server-side auth checks

## Troubleshooting

### Server Action not found

If you change code while the admin dashboard is open, you may see stale Server Action errors.

Fix:

```bash
rm -rf .next
npm run dev
```

Then hard refresh the admin page.

### Missing local runtime chunk in development

If you see an error like `Cannot find module './331.js'`, clear `.next` and restart:

```bash
rm -rf .next
npm run dev
```

### Profile image upload not working

If image upload fails with a Blob token error:

- set `BLOB_READ_WRITE_TOKEN`
- or use a direct image URL in the admin dashboard
- or place a local image in `public/profile`

## Current Status

This project is production-structured and already includes:

- public portfolio frontend
- admin dashboard
- Prisma schema
- seed data
- local PostgreSQL support
- SEO setup
- responsive sidebars
- local image fallback

## License

Private project for portfolio and client-style use unless you choose to publish it differently.
