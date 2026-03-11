import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * BIGWEB Digital — Global Rate Limiter
 * ──────────────────────────────────────
 * Protects critical mutation endpoints (contact forms, estimators, AI chat)
 * against brute force and scraping.
 */

// We create a new ratelimiter that allows 5 requests per minute
export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
})
