import { getStoredReferralCode } from "@/lib/referralCode";

/** Where the OttoPay app lives. Set VITE_APP_URL on Vercel preview builds to test against another app address. */
export const APP_URL = (import.meta.env.VITE_APP_URL || "https://app.ottopay.pro").replace(/\/$/, "");

/**
 * Absolute link into the app, e.g. appUrl("/auth?mode=signup").
 * Sign-in and sign-up links carry a stored referral code as ?ref=, so the
 * app credits the referrer even when the shared cookie isn't readable.
 */
export function appUrl(path: string): string {
  const url = new URL(path, APP_URL + "/");
  const ref = getStoredReferralCode();
  if (ref && !url.searchParams.has("ref") && url.pathname.startsWith("/auth")) {
    url.searchParams.set("ref", ref);
  }
  return url.toString();
}
