import fs from 'fs';
import { Pool } from 'pg';

const sql = fs.readFileSync('migrations/001_create_tasks.sql', 'utf8');
const DATABASE_URL = process.env.DATABASE_URL || process.env['DATABASE_URL'];

if (!DATABASE_URL) {
  console.error('Please set DATABASE_URL in environment');
  process.exit(1);
}

const pool = new Pool({ connectionString: DATABASE_URL });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('Migration applied.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
