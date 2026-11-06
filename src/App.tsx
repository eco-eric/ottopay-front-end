import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LandingPage from "@/pages/LandingPage";
import SiteChat from "@/components/chat/SiteChat";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";
import RouteHead from "@/components/RouteHead";
import ReferralCapture from "@/components/ReferralCapture";

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const WhyUsPage = lazy(() => import("@/pages/WhyUsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FeaturesPage = lazy(() => import("@/pages/FeaturesPage"));
const HelpCenterPage = lazy(() => import("@/pages/HelpCenterPage"));
const IntegrationsMarketingPage = lazy(() => import("@/pages/IntegrationsMarketingPage"));
const MobileAppPage = lazy(() => import("@/pages/MobileAppPage"));
const SpecialOfferPage = lazy(() => import("@/pages/SpecialOfferPage"));
const PartnersPage = lazy(() => import("@/pages/PartnersPage"));
const BlogIndex = lazy(() => import("@/pages/BlogIndex"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const ReferralLanding = lazy(() => import("@/pages/ReferralLanding"));
const ContentPageRoute = lazy(() => import("@/pages/ContentPageRoute"));

const queryClient = new QueryClient();

// Marketing site for ottopay.pro. The app (sign-in, dashboard, invoices,
// customer pay links) lives at app.ottopay.pro; vercel.json redirects any
// app path that lands here.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ReferralCapture />
          <SiteChat />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<><RouteHead /><LandingPage /></>} />
            <Route path="/welcome" element={<><RouteHead override={{ robots: "noindex,nofollow" }} /><LandingPage /></>} />
            <Route path="/about" element={<><RouteHead /><AboutPage /></>} />
            <Route path="/privacy" element={<><RouteHead /><PrivacyPage /></>} />
            <Route path="/terms" element={<><RouteHead /><TermsPage /></>} />
            <Route path="/pricing" element={<><RouteHead /><PricingPage /></>} />
            <Route path="/why-us" element={<><RouteHead /><WhyUsPage /></>} />
            <Route path="/contact" element={<><RouteHead /><ContactPage /></>} />
            <Route path="/features" element={<><RouteHead /><FeaturesPage /></>} />
            <Route path="/help" element={<><RouteHead /><HelpCenterPage /></>} />
            <Route path="/integrations" element={<><RouteHead /><IntegrationsMarketingPage /></>} />
            <Route path="/mobile-app" element={<><RouteHead /><MobileAppPage /></>} />
            <Route path="/special-offer" element={<><SEO noindex /><SpecialOfferPage /></>} />
            <Route path="/partners" element={<><RouteHead /><PartnersPage /></>} />
            <Route path="/blog" element={<><BlogIndex /></>} />
            <Route path="/blog/:slug" element={<><BlogPost /></>} />
            <Route path="/ref/:code" element={<><SEO noindex /><ReferralLanding /></>} />
            {/* Everything else: programmatic SEO pages from content_pages, or NotFound */}
            <Route path="*" element={<ContentPageRoute />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
