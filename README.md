# Ghazeli Academy

A full-stack website for **Ghazeli Academy**, a coaching academy offering personal coaching, parenting support, and growth programs for women and children. It has a trilingual public site (Arabic, English, German) and an admin dashboard for managing blog posts, bookings, contact messages, and landing-page images.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Prisma** and **SQLite**.

---

## Features

**Public site**
- Home, About, Blog (list + article pages), Booking, and Contact pages
- Arabic (default, RTL), English, and German, with the choice stored in a `lang` cookie
- Language-selection landing page at `/sprache`
- Booking form that creates reservation requests
- Contact form that stores messages for the admin

**Admin dashboard** (`/admin`)
- JWT-protected login
- Dashboard with post, reservation, and message counts
- Blog CRUD with categories, publish/draft flag, and image upload
- Reservation management (review requests and update their status)
- Inbox for contact messages (read/unread)
- Landing-page image manager

**Platform**
- REST API under `/api/*` (Next.js route handlers)
- Prisma ORM with a SQLite database
- Passwords hashed with bcrypt
- Security headers set in `next.config.ts`
- `standalone` build output with a multi-stage Dockerfile

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack in dev) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript |
| Database | SQLite via Prisma 5 |
| Auth | `jsonwebtoken` + `bcryptjs` |
| Deployment | Docker / Docker Compose |

## Project structure

```
src/
├── app/
│   ├── (public)/        # Public pages: home, about, blog, booking, contact
│   ├── admin/           # Admin UI: dashboard, blog, reservations, messages, images
│   ├── api/             # Route handlers: auth, blog, categories, dashboard,
│   │                    #   messages, reservations, upload, landing-images
│   └── sprache/         # Language picker page
├── components/          # Header, Footer, LanguageSwitcher, ImageSlider, ...
└── lib/                 # auth, prisma client, dictionaries (ar/en/de), email stub
prisma/
├── schema.prisma        # User, Category, BlogPost, Reservation, Message
└── seed.ts              # Demo admin, categories, posts, reservations, messages
public/                  # Logos, uploads, static images
```

## Getting started

### Prerequisites
- Node.js 20+
- npm

### Local development

```bash
# 1. Install dependencies
npm install

# 2. Configure the database
echo 'DATABASE_URL="file:./dev.db"' > .env
echo 'JWT_SECRET="change-me"' >> .env

# 3. Create the schema and seed demo data
npx prisma generate
npx prisma db push
npm run seed

# 4. Start the dev server
npm run dev
```

- Public site: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin>

**Seeded admin account (local only):** `admin@ghazeli.com` / `admin123`. Change it before you deploy.

### Docker

```bash
JWT_SECRET="a-long-random-secret" docker compose up -d --build
```

The container stores the SQLite database in `./data` and landing images in `./public/main-images`, so both survive rebuilds.

## Environment variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Prisma connection string | `file:./dev.db` |
| `JWT_SECRET` | Secret used to sign admin JWTs. There is a fallback in code; always set your own in production. | `a-long-random-string` |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run seed` | Seed the database (`prisma/seed.ts`) |

## API overview

| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/api/auth/login`, `/api/auth/logout` | – |
| `GET` | `/api/blog` | Public (published posts). Admin token returns drafts too |
| `POST` | `/api/blog` | admin |
| `GET` | `/api/blog/[id]` | – |
| `PUT` / `DELETE` | `/api/blog/[id]` | admin |
| `GET` / `POST` | `/api/categories` | POST: admin |
| `GET` | `/api/dashboard` | admin |
| `POST` | `/api/reservations` | – (public booking form) |
| `GET` | `/api/reservations` | admin |
| `PUT` / `DELETE` | `/api/reservations/[id]` | admin |
| `POST` | `/api/messages` | – (public contact form) |
| `GET` | `/api/messages` | admin |
| `PUT` / `DELETE` | `/api/messages/[id]` | admin |
| `GET` / `POST` / `DELETE` | `/api/landing-images` | POST/DELETE: admin |
| `POST` | `/api/upload` | admin |

Admin endpoints accept the token as `Authorization: Bearer <token>` or as a `token` cookie.

See [`PROJECT_INFO.md`](PROJECT_INFO.md) for more detail on the routes, schema, and auth flow.

## Roadmap
- [ ] Send email notifications through a real provider (`src/lib/email.ts` is currently a console stub)
- [ ] Add Prisma migrations for production deploys

## Author

**Fidaa Letaief** · [@fidaaltf58](https://github.com/fidaaltf58)
