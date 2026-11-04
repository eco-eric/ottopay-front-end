/**
 * Referral code capture for the marketing site.
 * The cookie is shared with app.ottopay.pro (domain .ottopay.pro), where
 * sign-up reads it. localStorage is a same-site backup for appUrl().
 */

const COOKIE_NAME = "ref_code";
const LS_CODE_KEY = "otto_ref";
const LS_TS_KEY = "otto_ref_ts";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function cookieDomain(): string {
  const host = window.location.hostname;
  return host === "ottopay.pro" || host.endsWith(".ottopay.pro") ? "; domain=.ottopay.pro" : "";
}

export function normalizeReferralCode(code: string): string | null {
  const clean = code.trim().toUpperCase();
  return /^[A-Z0-9_-]{2,64}$/.test(clean) ? clean : null;
}

export function storeReferralCode(raw: string) {
  const code = normalizeReferralCode(raw);
  if (!code) return;
  try {
    document.cookie = `${COOKIE_NAME}=${code}; max-age=2592000; path=/${cookieDomain()}; SameSite=Lax`;
    localStorage.setItem(LS_CODE_KEY, code);
    localStorage.setItem(LS_TS_KEY, Date.now().toString());
  } catch (e) {
    console.warn("Failed to store referral code:", e);
  }
}

export function getStoredReferralCode(): string | null {
  try {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`));
    const fromCookie = cookie ? normalizeReferralCode(cookie.split("=")[1] ?? "") : null;
    if (fromCookie) return fromCookie;
    const code = localStorage.getItem(LS_CODE_KEY);
    const ts = Number(localStorage.getItem(LS_TS_KEY));
    if (code && ts && Date.now() - ts < TTL_MS) return normalizeReferralCode(code);
  } catch {
    // storage blocked: no code
  }
  return null;
}
