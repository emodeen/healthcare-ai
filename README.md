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

2. Start Postgres and Next.js with Docker Compose:

```bash
# run DB and Next.js (dev) together
docker-compose up --build -d
```

3. Install dependencies:

```bash
npm install
```

4. Generate Prisma client and run migrations (local or inside a container):

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

- The project uses `DATABASE_URL` from the environment. The `.env.example` points to Postgres on localhost; adjust if using a different host.
- If starting the app inside Docker Compose, the Next.js container connects to the DB via the `db` service name. `docker-compose.yml` sets `DATABASE_URL` for the `web` service as `postgres://postgres:postgres@db:5432/appdb`.
- To run the app locally (not in Docker), copy `.env.example` to `.env` and use `npm run dev` to run the app on `localhost:3000` (it will connect to a DB on your host at `localhost:5432` if your `.env` points there).
- Prisma is now used as the ORM. `prisma/schema.prisma` defines the `Task` model. `npm run migrate` runs `prisma generate` and `prisma migrate dev --name init`.
- To inspect the database, you can run `npx prisma studio` after `npm install` and migrations.
