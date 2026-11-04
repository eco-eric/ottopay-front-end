import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useRouteMeta, type RouteMeta } from "@/hooks/useRouteMeta";

interface RouteHeadProps {
  /** Optional per-page overrides (e.g. blog post detail). All fields optional. */
  override?: Partial<RouteMeta>;
}

/**
 * Renders <title>, description, canonical, OG, Twitter, robots, and JSON-LD
 * for the current pathname based on the page_meta table. Per-page overrides
 * take precedence over DB values.
 */
export default function RouteHead({ override }: RouteHeadProps) {
  const { pathname } = useLocation();
  const meta = useRouteMeta(pathname);

  const merged: RouteMeta = { ...meta, ...override };

  const ogTitle = merged.og_title || merged.title;
  const ogDescription = merged.og_description || merged.description;
  const twitterCard = merged.twitter_card || "summary_large_image";

  return (
    <Helmet>
      <title>{merged.title}</title>
      <meta name="description" content={merged.description} />
      {merged.robots && <meta name="robots" content={merged.robots} />}
      {merged.canonical_url && <link rel="canonical" href={merged.canonical_url} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {merged.canonical_url && <meta property="og:url" content={merged.canonical_url} />}
      {merged.og_image_url && <meta property="og:image" content={merged.og_image_url} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {merged.og_image_url && <meta name="twitter:image" content={merged.og_image_url} />}

      {/* Structured data (JSON-LD) */}
      {merged.structured_data && (
        <script type="application/ld+json">
          {JSON.stringify(merged.structured_data)}
        </script>
      )}
    </Helmet>
  );
}
