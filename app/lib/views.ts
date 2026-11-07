import { Redis } from "@upstash/redis";

// Page views are optional: without Redis credentials (local dev, preview
// builds) the site works and simply hides the counters.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const key = (slug: string) => `pageviews:projects:${slug}`;

/** View counts by slug, or null when the counter is unavailable. */
export async function getViews(
  slugs: string[],
): Promise<Record<string, number> | null> {
  if (!redis || slugs.length === 0) return null;
  try {
    const counts = await redis.mget<(number | null)[]>(...slugs.map(key));
    return Object.fromEntries(slugs.map((s, i) => [s, Number(counts[i] ?? 0)]));
  } catch (error) {
    console.error("Failed to fetch project views:", error);
    return null;
  }
}

export async function getViewCount(slug: string): Promise<number | null> {
  const views = await getViews([slug]);
  return views ? (views[slug] ?? 0) : null;
}
