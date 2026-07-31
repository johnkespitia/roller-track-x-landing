import mysql, { Pool, PoolOptions, QueryValues, RowDataPacket } from "mysql2/promise";

/**
 * Cliente MySQL de SOLO build-time.
 *
 * Las funciones de este archivo SOLO se ejecutan durante
 * `next build` (en `generateStaticParams`, `generateMetadata`, `lib/content/`,
 * etc.) o desde scripts Node (TS).
 *
 * NO se usa para el envío de leads — eso va por HTTP al Laravel API.
 *
 * Config desde variables de entorno (sin NEXT_PUBLIC_):
 *   DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
 *
 * Si este módulo se importa en el cliente, las queries devolverán []
 * porque las variables de entorno no estarán disponibles.
 */

let pool: Pool | null = null;

function getPool(): Pool | null {
  if (pool) return pool;

  const host = process.env.DB_HOST;
  const database = process.env.DB_DATABASE;
  const user = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;

  if (!host || !database || !user) {
    // Sin config, devolvemos null. Las funciones que dependan de DB
    // deben manejar este caso y devolver [] / null.
    return null;
  }

  const options: PoolOptions = {
    host,
    port: Number(process.env.DB_PORT ?? 3306),
    database,
    user,
    password,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };

  pool = mysql.createPool(options);
  return pool;
}

export type QueryRow = RowDataPacket;

export async function query<T extends QueryRow = QueryRow>(
  sql: string,
  params: QueryValues = []
): Promise<T[]> {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query<T[]>(sql, params);
  return rows;
}

export async function queryOne<T extends QueryRow = QueryRow>(
  sql: string,
  params: QueryValues = []
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export function isDbConfigured(): boolean {
  return getPool() !== null;
}
