# Nawy Mini — Apartment Listing App

A full-stack apartment listing application: browse apartments, view details, search, and (as an authenticated user) add new listings. Built as a backend API + a responsive Next.js frontend, fully containerized to run with a single command.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js, TypeScript, Express 5, Prisma ORM |
| **Database** | PostgreSQL 16 |
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, lucide-react |
| **Validation** | Zod (backend request validation) |
| **Auth** | JWT (fixed credentials) |
| **API docs** | Swagger UI (OpenAPI 3) |
| **Containerization** | Docker + docker-compose |

---

## Features

- **Apartment listing** — paginated grid of apartments (9 per page).
- **Search** — filter by **unit name**, **unit number**, or **project** (case-insensitive) via a dedicated `/search` endpoint. Search updates live as you type (debounced) and is shareable via the URL.
- **Apartment details** — full details page per apartment, with a graceful "not found" page for invalid/missing ids.
- **Add apartment** — a create form, protected by login (only authenticated users can add).
- **Authentication** — login with fixed credentials issues a JWT; the create endpoint is protected server-side.
- **Responsive UI** — works on mobile and desktop; brand-themed (Nawy navy & orange).
- **Image fallback** — a local placeholder is shown when an apartment image is missing.
- **Resilient frontend** — if the backend is unreachable, pages still render (empty states instead of crashes).
- **Interactive API docs** — Swagger UI served by the backend.

---

## Quick Start (Docker — recommended)

**Prerequisite:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

From the repository root:

```bash
docker compose up --build
```

This builds and starts three containers — **database**, **backend**, and **frontend** — and seeds the database with 21 sample apartments on first run. The first build takes a few minutes.

### Access

| Service | URL |
| --- | --- |
| **Frontend (app)** | <http://localhost:3100> |
| **Backend (API)** | <http://localhost:3101> |
| **API docs (Swagger)** | <http://localhost:3101/api/docs> |

> These host ports (**3100 / 3101**) are intentionally different from the local-dev ports (3000 / 3001), so you can run the containers and a local dev server at the same time.

### Login credentials (mock)

```
Email:    Admin@nawy.com
Password: Admin@123
```

### Stopping

```bash
docker compose down       # stop and remove containers (keeps the database)
docker compose down -v     # also remove the database volume (fresh start + re-seed)
```

> **Seeding is idempotent** — the 21 sample apartments are inserted only when the database is empty, so any apartments you create through the app survive restarts. Use `down -v` to reset to seed data.

---

## API Reference

Base path: `/api`

### Apartments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/apartments` | — | List apartments, paginated. Query: `page` (default 1), `limit` (default 9, max 50). |
| `GET` | `/api/apartments/search` | — | Search apartments. Query: `search`, `page`, `limit`. Matches unit name / unit number / project. |
| `GET` | `/api/apartments/:id` | — | Get a single apartment by UUID. |
| `POST` | `/api/apartments` | **JWT** | Create an apartment. Requires `Authorization: Bearer <token>`. |

**Paginated responses** return an envelope:

```json
{
  "data": [ /* apartments */ ],
  "meta": { "page": 1, "limit": 9, "total": 21, "totalPages": 3 }
}
```

**Apartment shape:**

```jsonc
{
  "id": "uuid",
  "unitName": "Garden Apartment",
  "unitNumber": "MV-iCity-B4-102",   // unique
  "project": "Mountain View iCity",
  "description": "…",
  "price": 9500000,                   // EGP, integer
  "bedrooms": 3,
  "bathrooms": 3,
  "area": 165,                        // m²
  "imageUrl": "https://…",            // optional
  "address": "New Cairo, Cairo"       // optional
}
```

### Auth

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Body `{ email, password }` (password ≥ 6 chars). Returns `{ token }` (JWT, 1-hour expiry) on success, `401` otherwise. |

### Error responses

| Status | Meaning |
|---|---|
| `400` | Validation failed (invalid body/query) or malformed JSON |
| `401` | Missing / invalid / expired token (on protected routes) |
| `404` | Apartment not found |
| `409` | Duplicate `unitNumber` |
| `500` | Unexpected server error |

Full request/response schemas are documented interactively at **`/api/docs`**.

---

## Frontend Routes

| Route | Description | Auth |
|---|---|---|
| `/` | Landing page (hero + calls to action) | — |
| `/apartments` | Listing page — search + pagination | — |
| `/apartments/[id]` | Apartment details | — |
| `/apartments/create` | Add-apartment form | requires login |
| `/login` | Login form | — |

---

## Local Development (without Docker)

Requires **Node.js 22+** and a running **PostgreSQL** instance.

### Backend

```bash
cd NawyApartment.Backend
npm install
# create .env (see Environment Variables below)
npx prisma migrate deploy   # apply migrations
npx prisma db seed          # seed 21 apartments (only if empty)
npm run dev                 # starts on http://localhost:3001
```

### Frontend

```bash
cd NawyApartment.Frontend
npm install
npm run dev                 # starts on http://localhost:3000
```

The frontend defaults to calling the backend at `http://localhost:3001`.

---

## Environment Variables

### Backend

| Variable | Example | Description |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/nawy-db?schema=public` | PostgreSQL connection string |
| `PORT` | `3001` | Backend port |
| `JWT_SECRET` | `your_jwt_secret_key` | Secret for signing JWTs |
| `AUTH_EMAIL` | `Admin@nawy.com` | Fixed login email |
| `AUTH_PASSWORD` | `Admin@123` | Fixed login password |
| `CORS_ORIGIN` | `http://localhost:3000` | Allowed frontend origin |

### Frontend

| Variable | Scope | Description |
|---|---|---|
| `API_URL` | server (runtime) | Backend **root** URL for server-side (RSC) fetches — e.g. `http://backend:3001` in Docker. The app appends `/api/...`. |
| `NEXT_PUBLIC_API_BASE` | browser (build-time) | Backend **root** URL for client-side fetches (login/create) — e.g. `http://localhost:3101` in Docker |

> In Docker these are set for you in `docker-compose.yml`. Note that `NEXT_PUBLIC_*` values are baked into the client bundle **at build time**, so changing them requires a rebuild (`docker compose up --build`).

---

## Project Structure

```
Nawy Assign/
├── docker-compose.yml            # orchestrates db + backend + frontend
├── NawyApartment.Backend/        # Express + Prisma API
│   ├── Dockerfile
│   ├── prisma/                   # schema, migrations, seed
│   └── src/
│       ├── routes/               # route definitions
│       ├── controllers/          # request handlers
│       ├── services/             # business logic (Prisma access)
│       ├── validations/          # Zod schemas
│       ├── middlewares/          # auth, error handling
│       ├── dtos/                 # response shapes
│       └── docs/                 # OpenAPI/Swagger spec
└── NawyApartment.Frontend/       # Next.js app (App Router)
    ├── Dockerfile
    └── src/
        ├── app/                  # routes (pages + layouts) only
        ├── components/           # UI grouped by area (ui, layout, login, apartments)
        ├── api/                  # backend calls (apartments, auth)
        ├── types/                # shared TypeScript types
        └── lib/                  # session, helpers, utils
```

---

## Authentication (notes)

Authentication is intentionally a **mock** for this project:

- A single fixed credential pair (from env) — no user table or registration.
- Login issues a short-lived JWT; the `POST /api/apartments` route is protected by a `requireAuth` middleware that verifies the token.
- The frontend stores the token in a cookie and sends it as a `Bearer` token when creating an apartment.

This demonstrates route protection without the scope of a full auth system.

---

## Future Improvements

> A running list of enhancements to consider (to be prioritized later).

- **Server-side auth** — move login/create to Next.js Server Actions with an **httpOnly** cookie (token never exposed to client JS; removes CORS).
- **Real authentication** — user accounts, registration, password hashing, refresh tokens.
- **Search at scale** — add a PostgreSQL `pg_trgm` GIN index so `ILIKE` searches use an index instead of a sequential scan.
- **Testing** — unit/integration tests for the API and frontend.
- **Image uploads** — allow uploading apartment images (e.g. to object storage) instead of URLs.
- **Edit / delete apartments** — complete the CRUD surface.

---
