# next-node-postgres

Simple Next.js app with Node API routes and PostgreSQL (pg).

Prerequisites
- Node.js 18+ (or compatible)
- Docker & Docker Compose (or a running Postgres instance)

Quick start (using Docker)

1. Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

2. Start Postgres with Docker Compose:

```bash
docker-compose up -d
```

3. Install dependencies:

```bash
npm install
```

4. Generate Prisma client and run migrations:

```bash
npm run migrate
```

5. Seed sample data (optional):

```bash
npm run seed
```

6. Run Next.js dev server:

```bash
npm run dev
```

Open http://localhost:3000

Notes
- The project uses `DATABASE_URL` from the environment. The `.env.example` points to Postgres on localhost; adjust if using a different host.
- Prisma is now used as the ORM. `prisma/schema.prisma` defines the `Task` model. `npm run migrate` runs `prisma generate` and `prisma migrate dev --name init`.
- To inspect the database, you can run `npx prisma studio` after `npm install` and migrations.
