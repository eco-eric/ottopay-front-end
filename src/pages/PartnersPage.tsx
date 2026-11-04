import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import PartnersHero from "@/components/partners/PartnersHero";
import PartnersHowItWorks from "@/components/partners/PartnersHowItWorks";
import PartnersAudience from "@/components/partners/PartnersAudience";

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <PartnersHero />
      <PartnersHowItWorks />
      <PartnersAudience />
      <MarketingFooter />
    </div>
  );
}
