import { Helmet } from "react-helmet-async";

interface SEOProps {
  /** Path portion of canonical URL, e.g. "/", "/features". Required for indexable pages. */
  canonicalPath?: string;
  /** When true, emits noindex,nofollow. Used for /auth and signed-in app pages. */
  noindex?: boolean;
  title?: string;
}

const SITE_ORIGIN = "https://ottopay.pro";

export default function SEO({ canonicalPath, noindex = false, title }: SEOProps) {
  const canonical = canonicalPath ? `${SITE_ORIGIN}${canonicalPath}` : undefined;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}
    </Helmet>
  );
}
