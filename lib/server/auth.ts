import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authSecret } from "./config";
import { findMemberById, syncRole, type Member } from "./members";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, keylen: number) => Promise<Buffer>;

const COOKIE = "itaca_session";
const SESSION_DAYS = 30;

/* ------------------------------ Password -------------------------------- */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltB64, keyB64] = stored.split("$");
  if (scheme !== "scrypt" || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, "base64");
  const key = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length);
  return key.length === expected.length && timingSafeEqual(key, expected);
}

/* -------------------------------- Firme --------------------------------- */

export function sign(value: string, purpose: string): string {
  return createHmac("sha256", `${authSecret()}:${purpose}`).update(value).digest("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

/* ------------------------------- Sessione ------------------------------- */

export async function startSession(memberId: string) {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `${memberId}.${expires}`;
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload, "session")}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expires),
  });
}

export async function endSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function currentMember(): Promise<Member | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  const parts = raw.split(".");
  if (parts.length !== 3) return null;
  const [id, expires, sig] = parts;
  if (!safeEqual(sig, sign(`${id}.${expires}`, "session"))) return null;
  if (Number(expires) < Date.now()) return null;
  const member = await findMemberById(id);
  return member ? syncRole(member) : null;
}

export async function requireMember(): Promise<Member> {
  const m = await currentMember();
  if (!m) redirect("/accedi");
  return m;
}

export async function requireAdmin(): Promise<Member> {
  const m = await requireMember();
  if (m.role !== "admin") redirect("/area-soci");
  return m;
}
