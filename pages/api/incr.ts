import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

// Counting is optional: without credentials the endpoint just acknowledges.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

// Slugs come straight from the browser: only accept plain slug characters so
// nobody can mint arbitrary Redis keys.
const SLUG = /^[\w.&-]{1,100}$/;

const accepted = () => new NextResponse(null, { status: 202 });

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return new NextResponse("must be json", { status: 400 });
  }

  let slug: unknown;
  try {
    ({ slug } = await req.json());
  } catch {
    return new NextResponse("invalid json", { status: 400 });
  }
  if (typeof slug !== "string" || !SLUG.test(slug)) {
    return new NextResponse("invalid slug", { status: 400 });
  }

  if (!redis) return accepted();

  try {
    const ip =
      req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (ip) {
      // Hash the IP so it is never stored directly.
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(ip),
      );
      const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // One count per visitor per project per day.
      const isNew = await redis.set(
        ["deduplicate", hash, slug].join(":"),
        true,
        { nx: true, ex: 24 * 60 * 60 },
      );
      if (!isNew) return accepted();
    }
    await redis.incr(["pageviews", "projects", slug].join(":"));
  } catch (error) {
    // A view counter must never surface as an error to the visitor.
    console.error("Failed to record page view:", error);
  }
  return accepted();
}
