import { createHash } from "node:crypto";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

function clientAddress(request: Request): string {
  const trustedProxyAddress = request.headers.get("x-real-ip");
  if (trustedProxyAddress) return trustedProxyAddress.trim().slice(0, 80);

  // Common reverse proxies append the connecting client as the final address.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",").at(-1)?.trim().slice(0, 80) ?? "unknown";
  return "unknown";
}

function consume(key: string, limit: number, windowMs: number): number | null {
  const now = Date.now();
  let bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  if (bucket.count >= limit) return Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  bucket.count += 1;

  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(bucketKey);
    }
    while (buckets.size > MAX_BUCKETS) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey === undefined) break;
      buckets.delete(oldestKey);
    }
  }

  return null;
}

export function checkAuthRateLimit(
  request: Request,
  scope: string,
  identity: string | undefined,
  limit: number,
  windowMs: number,
): number | null {
  const keys = [`${scope}:ip:${clientAddress(request)}`];
  if (identity) {
    const identityHash = createHash("sha256").update(identity).digest("hex");
    keys.push(`${scope}:identity:${identityHash}`);
  }

  const retryAfter = keys.map((key) => consume(key, limit, windowMs)).filter((n) => n !== null);
  return retryAfter.length ? Math.max(...retryAfter) : null;
}
