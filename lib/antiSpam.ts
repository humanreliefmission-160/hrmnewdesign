/**
 * lib/antiSpam.ts
 *
 * Centralized anti-spam utilities for the HRM contact form and email endpoints.
 * Covers: IP rate limiting, Cloudflare Turnstile verification, email domain
 * validation, and heuristic content/gibberish detection.
 */

// ---------------------------------------------------------------------------
// IP Rate Limiter (in-memory sliding window)
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Check whether the given IP has exceeded the allowed request rate.
 *
 * @param ip        The client IP address.
 * @param max       Maximum number of allowed requests in the window. Default: 5.
 * @param windowMs  Sliding window duration in milliseconds. Default: 10 minutes.
 * @returns `true` if the request is allowed, `false` if the rate limit is exceeded.
 */
export function checkRateLimit(
  ip: string,
  { max = 5, windowMs = 10 * 60 * 1000 }: { max?: number; windowMs?: number } = {}
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;

  let entry = rateLimitStore.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitStore.set(ip, entry);
  }

  // Remove timestamps that have fallen outside the sliding window
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= max) {
    return false; // Rate limit exceeded
  }

  entry.timestamps.push(now);
  return true;
}

// Periodically clean up stale IPs to prevent memory leaks (every 30 minutes)
if (typeof globalThis !== 'undefined') {
  setInterval(() => {
    const cutoff = Date.now() - 60 * 60 * 1000; // 1-hour old entries
    for (const [ip, entry] of rateLimitStore.entries()) {
      if (entry.timestamps.every((t) => t < cutoff)) {
        rateLimitStore.delete(ip);
      }
    }
  }, 30 * 60 * 1000);
}

// ---------------------------------------------------------------------------
// Cloudflare Turnstile Verification
// ---------------------------------------------------------------------------

/**
 * Verify a Cloudflare Turnstile challenge token server-side.
 *
 * Requires the `TURNSTILE_SECRET_KEY` environment variable to be set.
 *
 * @param token  The `cf-turnstile-response` token from the client.
 * @param ip     Optional: the client IP, forwarded to Cloudflare for extra signal.
 * @returns `true` if the token is valid, `false` otherwise.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  ip?: string
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If no secret is configured (e.g. local dev without keys), skip verification
  // and allow the request through — other layers (honeypot, speed-trap) still apply.
  if (!secret) {
    console.warn('[antiSpam] TURNSTILE_SECRET_KEY not set — skipping Turnstile verification.');
    return true;
  }

  // If a secret IS configured but no token was provided, reject immediately.
  if (!token) {
    return false;
  }

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
    });
    if (ip) params.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('[antiSpam] Turnstile verification request failed:', err);
    // Fail open if Cloudflare itself is unreachable — don't punish real users
    // for a third-party outage. Other layers still protect the endpoint.
    return true;
  }
}

// ---------------------------------------------------------------------------
// Email Domain Validation
// ---------------------------------------------------------------------------

/**
 * Disposable / throwaway email providers that bots and spam accounts commonly use.
 * These domains are rejected outright.
 */
const BLOCKED_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'trashmail.com',
  'trashmail.io',
  'temp-mail.org',
  'tempmail.com',
  'yopmail.com',
  'throwam.com',
  'sharklasers.com',
  '10minutemail.com',
  'maildrop.cc',
  'dispostable.com',
  'getairmail.com',
  'fakeinbox.com',
  'spamgourmet.com',
  'mailnull.com',
  'discard.email',
  'spamex.com',
  'jetable.fr.nf',
  'filzmail.com',
  'dayrep.com',
  'einrot.com',
  'fleckens.hu',
  'gustr.com',
  'kurzepost.de',
  'objectmail.com',
  'obobbo.com',
  'regbypass.com',
  'spamfree24.org',
  'tempe-mail.com',
  'wegwerfmail.de',
]);

/**
 * Validate an email address for format and domain quality.
 *
 * Rejects: disposable/throwaway providers.
 * Accepts: major personal providers (Gmail, Yahoo, Outlook, iCloud, Proton, AOL, etc.)
 *          and any legitimate business/organisation domain not on the blocklist.
 *
 * @param email  The email address to validate.
 * @returns `true` if the email appears legitimate, `false` otherwise.
 */
export function isValidEmailDomain(email: string): boolean {
  // 1. Basic RFC-style format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email.trim())) return false;

  const domain = email.trim().toLowerCase().split('@')[1];
  if (!domain) return false;

  // 2. Block known disposable providers
  if (BLOCKED_DOMAINS.has(domain)) return false;

  // 3. Check for suspicious username patterns (e.g. zpaf1@aol.com)
  const username = email.trim().toLowerCase().split('@')[0];
  if (isSuspiciousUsername(username)) return false;

  return true;
}

/**
 * Heuristic check on the username portion of an email address.
 * Catches random-string usernames like "zpaf1", "xQkjlDm2", "fscsgfQk".
 */
function isSuspiciousUsername(username: string): boolean {
  if (username.length < 3) return true;

  // Allow short, human-readable usernames (e.g. "ali", "bob", "tj")
  if (username.length <= 5) return false;

  // High ratio of digits to characters suggests a generated address
  const digitCount = (username.match(/\d/g) || []).length;
  if (digitCount / username.length > 0.5) return true;

  // No vowels in a username longer than 6 chars — almost certainly random
  const vowels = username.replace(/[^aeiou]/gi, '');
  if (username.length > 6 && vowels.length === 0) return true;

  // Very high Shannon entropy (random strings)
  if (shannonEntropy(username) > 4.0) return true;

  return false;
}

// ---------------------------------------------------------------------------
// Suspicious Content Heuristics
// ---------------------------------------------------------------------------

/**
 * Detect high-entropy / gibberish / bot-generated message content.
 *
 * FAILS (rejected) examples:
 *   "fscsgfQkljJKDGCqKUm"   → high entropy, no spaces, no vowels
 *   "qwertyuiop"             → keyboard walk pattern
 *   "aaaaaaaaaaaa"           → repeating characters
 *   "http://spam.com"        → URL/injection attempt
 *   "<script>alert(1)</script>" → XSS probe
 *   "xDfGhJkLpQrStVwXyZ"   → no vowels, high entropy
 *
 * PASSES (accepted) examples:
 *   "Hi, I'd like to enquire about your Zakat appeal."
 *   "Can I get more information about volunteering in Gaza?"
 *   "I donated last week and haven't received my receipt yet."
 *   "My reference is DON-2026-1234, please help."
 *   "Assalamu Alaikum, I need to update my bank details."
 *
 * @param text  The content string to evaluate.
 * @returns `true` if the content appears suspicious/gibberish, `false` if it looks legitimate.
 */
export function isSuspiciousContent(text: string): boolean {
  const trimmed = text.trim();

  // Minimum meaningful message length
  if (trimmed.length < 10) return true;

  // Block URL injection / header injection / XSS probe attempts
  const injectionPatterns = [
    /https?:\/\//i,
    /<script/i,
    /onclick\s*=/i,
    /onerror\s*=/i,
    /javascript:/i,
    /\beval\s*\(/i,
    /Content-Type:/i,
    /Bcc:/i,
    /Cc:/i,
  ];
  if (injectionPatterns.some((re) => re.test(trimmed))) return true;

  // Keyboard walk patterns (common bot/test filler)
  const keyboardWalks = ['qwerty', 'asdfgh', 'zxcvbn', '123456', 'abcdef', 'qazwsx', 'qweasd'];
  const lower = trimmed.toLowerCase();
  if (keyboardWalks.some((walk) => lower.includes(walk))) return true;

  // Repeating character block (e.g. "aaaaaaa", "xoxoxoxo")
  if (/(.)\1{6,}/.test(trimmed)) return true;

  // For single "words" (no spaces) longer than 8 chars — likely a random token
  const words = trimmed.split(/\s+/);
  if (words.length === 1 && trimmed.length > 8) {
    // No vowels in a long single-word string
    const vowels = trimmed.replace(/[^aeiouAEIOU]/g, '');
    if (vowels.length === 0) return true;

    // Very high Shannon entropy
    if (shannonEntropy(trimmed) > 4.2) return true;
  }

  // Check average word entropy across the whole message
  // Genuine sentences have lower average entropy than random strings
  const avgWordEntropy =
    words.reduce((sum, word) => sum + shannonEntropy(word), 0) / words.length;
  if (avgWordEntropy > 3.8 && words.length <= 3) return true;

  return false;
}

// ---------------------------------------------------------------------------
// Shannon Entropy Helper
// ---------------------------------------------------------------------------

/**
 * Calculate the Shannon entropy of a string.
 * Higher values indicate more randomness (closer to random gibberish).
 * English words typically score 2.5–3.5 bits/char.
 * Random alphanumeric strings typically score > 4.0 bits/char.
 */
function shannonEntropy(str: string): number {
  if (!str) return 0;
  const freq: Record<string, number> = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  const len = str.length;
  return Object.values(freq).reduce((entropy, count) => {
    const p = count / len;
    return entropy - p * Math.log2(p);
  }, 0);
}
