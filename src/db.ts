import { Pool } from 'pg';
const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'splitwise',
        password: process.env.DB_PASS || 'postgres',
        port: Number(process.env.DB_PORT) || 5432,
      }
);
export const query = (text: string, params?: any[]) => pool.query(text, params); 