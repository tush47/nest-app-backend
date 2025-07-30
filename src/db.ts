import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

// Add debug logging to see what's happening
const pool = new Pool(
  process.env.DATABASE_URL
    ? { 
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
          require: true
        }
      }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'splitwise',
        password: process.env.DB_PASS || 'postgres',
        port: Number(process.env.DB_PORT) || 5432,
      }
);

export const query = (text: string, params?: any[]) => pool.query(text, params); 