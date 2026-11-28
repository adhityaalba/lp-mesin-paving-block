import "server-only";
import { neon } from "@neondatabase/serverless";

export function database() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required. Configure Neon before building or starting the app.");
  return neon(url);
}
