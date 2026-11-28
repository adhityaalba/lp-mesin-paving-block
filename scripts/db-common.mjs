import { loadEnvFile } from "node:process";
import { neon } from "@neondatabase/serverless";

export function connectDatabase({ requireTarget = false } = {}) {
  try { loadEnvFile(".env.local"); } catch (error) { if (error.code !== "ENOENT") throw error; }
  const connection = process.env.DATABASE_URL;
  if (!connection) throw new Error("DATABASE_URL is missing");
  const host = new URL(connection).hostname;
  if (requireTarget) {
    const target = process.argv.find((arg) => arg.startsWith("--target-host="))?.slice("--target-host=".length);
    if (host !== target) throw new Error("Pass --target-host=<database hostname> matching DATABASE_URL before writing");
  }
  console.log(`Database target: ${host}`);
  return neon(connection, { fetchOptions: { signal: AbortSignal.timeout(30000) } });
}

export function failSafely(error) {
  // Driver errors can contain connection details; never dump the original error object.
  console.error("Database operation failed. Check credentials, network, target schema, and source validation. No credentials were logged.");
  if (typeof error?.code === "string" && /^[A-Z0-9_]+$/.test(error.code)) console.error(`Code: ${error.code}`);
  process.exitCode = 1;
}
