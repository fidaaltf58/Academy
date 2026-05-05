# Ghazeli Academy - Project Information

## Project Overview

`ghazeli-academy` is a full-stack web application built with Next.js App Router for a coaching academy website.  
It includes:

- Public marketing pages (home, about, blog, booking, contact)
- Bilingual content (Arabic and English)
- Admin dashboard for content and request management
- Prisma + SQLite database for persistence
- JWT-based authentication for admin APIs

## Tech Stack

- Framework: `next@16.2.3` (App Router, Turbopack in dev)
- UI: `react@19.2.4`, `react-dom@19.2.4`
- Language: TypeScript
- Database ORM: `prisma@5.22.0`, `@prisma/client@5.22.0`
- Database: SQLite (`prisma/dev.db`)
- Auth: `jsonwebtoken`, `bcryptjs`
- Tooling: ESLint, Tailwind CSS v4 packages, TSX for seeding

## Scripts

From `package.json`:

- `npm run dev` -> Start local development server
- `npm run build` -> Build for production
- `npm run start` -> Run production build
- `npm run lint` -> Run ESLint
- `npm run seed` -> Seed database (`prisma/seed.ts`)

## Runtime / Environment

Environment variables currently used:

- `DATABASE_URL` (in `.env`, currently points to SQLite file database)
- `JWT_SECRET` (optional, code has fallback default in `src/lib/auth.ts`)

Current `.env` value:

```env
DATABASE_URL="file:./dev.db"
```

## Project Structure

Main directories and purpose:

- `src/app/(public)` -> Public pages and public layout
- `src/app/admin` -> Admin UI pages and admin layout
- `src/app/api` -> Server API routes (auth, blog, categories, dashboard, messages, reservations, upload)
- `src/components` -> Shared UI and provider components
- `src/lib` -> Core utilities (auth, prisma client, dictionaries, email placeholder)
- `prisma` -> Database schema, seed script, local SQLite db
- `public` -> Static assets (logos, uploads, favicon)

## Public Routes

- `/` -> Home
- `/about` -> About page
- `/blog` -> Blog listing
- `/blog/[slug]` -> Blog details
- `/booking` -> Booking page
- `/contact` -> Contact page

Public layout uses a language cookie (`lang`) and serves Arabic by default, with dictionary data from `src/lib/dictionaries.ts`.

## Admin Routes

- `/admin` -> Dashboard
- `/admin/login` -> Admin login
- `/admin/blog` -> Blog management
- `/admin/blog/new` -> Create blog post
- `/admin/blog/[id]/edit` -> Edit blog post
- `/admin/reservations` -> Reservations management
- `/admin/messages` -> Messages management

## API Endpoints

Auth:

- `POST /api/auth/login`
- `POST /api/auth/logout`

Blog:

- `GET/POST /api/blog`
- `GET/PUT/DELETE /api/blog/[id]`

Categories:

- `GET /api/categories`

Dashboard:

- `GET /api/dashboard`

Reservations:

- `GET/POST /api/reservations`
- `GET/PUT/DELETE /api/reservations/[id]`

Messages:

- `GET/POST /api/messages`
- `GET/PUT/DELETE /api/messages/[id]`

Uploads:

- `POST /api/upload`

## Authentication

- JWT tokens are signed in `src/lib/auth.ts`
- Token can be passed in:
  - `Authorization: Bearer <token>`
  - `token` cookie
- Passwords are hashed with bcrypt (`hashPassword`)
- Admin endpoints verify token via `authenticateRequest`

## Database Schema

Prisma models (`prisma/schema.prisma`):

- `User` (admin user accounts)
- `Category` (blog categories)
- `BlogPost` (posts with publish flag and optional category)
- `Reservation` (booking requests)
- `Message` (contact form submissions)

## Seed Data

`prisma/seed.ts` creates:

- Default admin user:
  - Email: `admin@ghazeli.com`
  - Password: `admin123`
- 3 categories
- 6 sample blog posts
- Sample reservations
- Sample contact messages

## Email Handling

`src/lib/email.ts` currently logs placeholder messages to console.  
A real provider (e.g., SMTP/Nodemailer, SendGrid) is not yet integrated.

## Running the Project Locally

1. Install dependencies:

```bash
npm install
```

2. Ensure Prisma DB is ready:

```bash
npx prisma generate
npx prisma db push
npm run seed
```

3. Start app:

```bash
npm run dev
```

4. Open:

- `http://localhost:3000` (public site)
- `http://localhost:3000/admin` (admin panel)

## Current Run Status (this session)

Development server was started successfully and is running with:

- Next.js `16.2.3 (Turbopack)`
- Local URL: `http://localhost:3000`

