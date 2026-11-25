/**
 * Accesso al database.
 *
 * - In produzione (Vercel) si usa PostgreSQL tramite DATABASE_URL
 *   (Neon, Supabase, Vercel Postgres o qualsiasi Postgres gestito).
 * - In sviluppo, senza DATABASE_URL, si usa PGlite: un Postgres embedded
 *   che salva i dati nella cartella .data/ del progetto.
 *
 * Lo schema viene creato automaticamente al primo accesso.
 */

type Row = Record<string, unknown>;

interface Driver {
  query<T extends Row = Row>(sql: string, params?: unknown[]): Promise<T[]>;
}

const SCHEMA = `
CREATE SEQUENCE IF NOT EXISTS card_seq START 1;

CREATE TABLE IF NOT EXISTS members (
  id               TEXT PRIMARY KEY,
  email            TEXT NOT NULL UNIQUE,
  password_hash    TEXT NOT NULL,
  role             TEXT NOT NULL DEFAULT 'member',
  first_name       TEXT NOT NULL,
  last_name        TEXT NOT NULL,
  birth_date       DATE NOT NULL,
  birth_place      TEXT NOT NULL,
  fiscal_code      TEXT NOT NULL,
  address          TEXT NOT NULL,
  city             TEXT NOT NULL,
  phone            TEXT,
  interests        TEXT,
  motivation       TEXT,
  status           TEXT NOT NULL DEFAULT 'pending',
  card_number      TEXT UNIQUE,
  paid_until       DATE,
  approved_at      TIMESTAMPTZ,
  decided_by       TEXT,
  privacy_accepted_at TIMESTAMPTZ NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payments (
  id                TEXT PRIMARY KEY,
  member_id         TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  amount_cents      INTEGER NOT NULL,
  method            TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE,
  period_start      DATE NOT NULL,
  period_end        DATE NOT NULL,
  recorded_by       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checkins (
  id         TEXT PRIMARY KEY,
  member_id  TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  event_slug TEXT NOT NULL,
  staff_id   TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (member_id, event_slug)
);

ALTER TABLE members ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS marketing_consent_at TIMESTAMPTZ;
ALTER TABLE members ADD COLUMN IF NOT EXISTS sponsor_consent BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE members ADD COLUMN IF NOT EXISTS sponsor_consent_at TIMESTAMPTZ;
ALTER TABLE members ADD COLUMN IF NOT EXISTS password_changed_at TIMESTAMPTZ;

CREATE TABLE IF NOT EXISTS password_resets (
  token_hash TEXT PRIMARY KEY,
  member_id  TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS consent_log (
  id         TEXT PRIMARY KEY,
  member_id  TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL,
  granted    BOOLEAN NOT NULL,
  version    TEXT NOT NULL,
  source     TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              TEXT PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  token           TEXT NOT NULL UNIQUE,
  consent_version TEXT NOT NULL,
  source          TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);
`;

async function createDriver(): Promise<Driver> {
  const url = process.env.DATABASE_URL;

  if (url) {
    const { Pool } = await import("pg");
    const needsSsl = !/localhost|127\.0\.0\.1/.test(url);
    const pool = new Pool({
      connectionString: url,
      // Numero massimo di connessioni: gli hosting condivisi spesso ne concedono poche
      max: Math.max(1, Number(process.env.DB_POOL_MAX ?? 5)),
      ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
    });
    return {
      async query<T extends Row>(sql: string, params: unknown[] = []) {
        const res = await pool.query(sql, params);
        return res.rows as T[];
      },
    };
  }

  if (process.env.NODE_ENV === "production" && process.env.VERCEL) {
    throw new Error("DATABASE_URL non configurato: aggiungilo alle variabili d'ambiente del progetto Vercel.");
  }

  const { PGlite } = await import("@electric-sql/pglite");
  const { mkdirSync } = await import("node:fs");
  const dir = process.env.PGLITE_DIR ?? `${process.cwd()}/.data/pglite`;
  mkdirSync(dir, { recursive: true });
  const db = await PGlite.create(dir);
  return {
    async query<T extends Row>(sql: string, params: unknown[] = []) {
      const res = await db.query<T>(sql, params);
      return res.rows;
    },
  };
}

type Global = typeof globalThis & { __itacaDb?: Promise<Driver> };
const g = globalThis as Global;

async function init(): Promise<Driver> {
  const driver = await createDriver();
  for (const stmt of SCHEMA.split(";").map((s) => s.trim()).filter(Boolean)) {
    await driver.query(stmt);
  }
  return driver;
}

function getDriver(): Promise<Driver> {
  if (!g.__itacaDb) {
    g.__itacaDb = init().catch((err) => {
      g.__itacaDb = undefined;
      throw err;
    });
  }
  return g.__itacaDb;
}

export async function sql<T extends Row = Row>(text: string, params: unknown[] = []): Promise<T[]> {
  const db = await getDriver();
  return db.query<T>(text, params);
}

export async function one<T extends Row = Row>(text: string, params: unknown[] = []): Promise<T | null> {
  const rows = await sql<T>(text, params);
  return rows[0] ?? null;
}
