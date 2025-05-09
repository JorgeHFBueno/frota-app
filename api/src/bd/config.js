// api/src/bd/config.js   (versão ESM)

import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(isProduction
    ? { ssl: { rejectUnauthorized: false } }   // obrig. p/ Tembo
    : {})
});
