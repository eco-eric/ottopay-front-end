import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { storeReferralCode } from "@/lib/referralCode";

/** Stores ?ref=CODE from any marketing URL so sign-up on the app can credit it. */
export default function ReferralCapture() {
  const { search } = useLocation();
  useEffect(() => {
    const ref = new URLSearchParams(search).get("ref");
    if (ref) storeReferralCode(ref);
  }, [search]);
  return null;
}
