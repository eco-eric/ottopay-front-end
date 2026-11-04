import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { storeReferralCode } from "@/lib/referralCode";
import LandingPage from "@/pages/LandingPage";

/**
 * ottopay.pro/ref/CODE — the link partners and users share.
 * Saves the code (shared cookie + local backup) and shows the landing page;
 * every sign-up button then carries the code to app.ottopay.pro.
 */
export default function ReferralLanding() {
  const { code } = useParams<{ code: string }>();
  useEffect(() => {
    if (code) storeReferralCode(code);
  }, [code]);
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://ottopay.pro/" />
      </Helmet>
      <LandingPage />
    </>
  );
}
