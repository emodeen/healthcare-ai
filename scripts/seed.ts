import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL || process.env['DATABASE_URL'];

if (!DATABASE_URL) {
  console.error('Please set DATABASE_URL in environment');
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

async function seed() {
  const client = await pool.connect();
  try {
    await client.query(`INSERT INTO tasks (title) VALUES ($1), ($2), ($3)` , ['First task', 'Second task', 'Buy milk']);
    console.log('Seed data inserted.');
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
