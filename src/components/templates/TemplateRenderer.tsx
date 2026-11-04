import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import RouteHead from "@/components/RouteHead";
import type { Json } from "@/integrations/supabase/types";

const SITE_ORIGIN = "https://ottopay.pro";

export interface ContentPageRow {
  id: string;
  url_path: string;
  template_id: string;
  title: string;
  excerpt: string | null;
  body_markdown: string;
  author_name: string | null;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  structured_data: Json | null;
  template_data: Json | null;
  published_at: string | null;
  updated_at: string;
  trade: string | null;
  sub_trade: string | null;
  metro: string | null;
  neighborhood: string | null;
  feature: string | null;
  pillar_slug: string | null;
  related_slugs: string[] | null;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HowToStep {
  step: string;
  detail: string;
}

interface ComparisonRow {
  feature: string;
  [provider: string]: string;
}

interface TemplateData {
  faqs?: FaqItem[];
  how_to_steps?: HowToStep[];
  comparison_table?: { headers: string[]; rows: ComparisonRow[] };
  metro?: string;
  related_links?: { label: string; url: string }[];
  cta?: { label: string; url: string };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function titleCase(s: string): string {
  return s
    .split(/[-_\s]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildArticleJsonLd(page: ContentPageRow): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.excerpt || page.meta_description || undefined,
    image: page.hero_image_url || page.og_image_url || undefined,
    datePublished: page.published_at || undefined,
    dateModified: page.updated_at,
    author: {
      "@type": "Person",
      name: page.author_name || "Otto Pay",
    },
    publisher: {
      "@type": "Organization",
      name: "Otto Pay",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/otto-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_ORIGIN}${page.url_path}`,
    },
  };
}

function buildLocalBusinessJsonLd(
  page: ContentPageRow,
  metro: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Otto Pay",
    url: `${SITE_ORIGIN}${page.url_path}`,
    areaServed: { "@type": "City", name: titleCase(metro) },
  };
}

function buildHowToJsonLd(
  page: ContentPageRow,
  steps: HowToStep[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.title,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.step,
      text: s.detail,
    })),
  };
}

function buildFaqJsonLd(faqs: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export default function TemplateRenderer({ page }: { page: ContentPageRow }) {
  const td = (page.template_data as TemplateData | null) ?? {};
  const description =
    page.meta_description ||
    page.excerpt ||
    stripMarkdown(page.body_markdown).slice(0, 160);

  // Build structured data blocks. Override wins entirely if set.
  let jsonLdBlocks: Record<string, unknown>[];
  if (page.structured_data) {
    const sd = page.structured_data as
      | Record<string, unknown>
      | Record<string, unknown>[];
    jsonLdBlocks = Array.isArray(sd) ? sd : [sd];
  } else {
    jsonLdBlocks = [buildArticleJsonLd(page)];

    const metro = td.metro || page.metro;
    if (page.template_id === "T-TRADE-CITY" && metro) {
      jsonLdBlocks.push(buildLocalBusinessJsonLd(page, metro));
    }

    if (
      page.template_id === "T-TRADE-GUIDE" &&
      td.how_to_steps &&
      td.how_to_steps.length > 0
    ) {
      jsonLdBlocks.push(buildHowToJsonLd(page, td.how_to_steps));
    }

    if (td.faqs && td.faqs.length > 0) {
      jsonLdBlocks.push(buildFaqJsonLd(td.faqs));
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RouteHead
        override={{
          title: page.meta_title || page.title,
          description,
          canonical_url:
            page.canonical_url || `${SITE_ORIGIN}${page.url_path}`,
          og_title: page.og_title || page.meta_title || page.title,
          og_description:
            page.og_description ||
            page.meta_description ||
            page.excerpt ||
            description,
          og_image_url: page.og_image_url || page.hero_image_url,
          robots: "index,follow,max-image-preview:large",
          twitter_card: "summary_large_image",
          structured_data: jsonLdBlocks[0],
        }}
      />

      {/* Emit any additional JSON-LD blocks (LocalBusiness, HowTo, FAQ, …) */}
      {jsonLdBlocks.length > 1 && (
        <Helmet>
          {jsonLdBlocks.slice(1).map((block, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(block)}
            </script>
          ))}
        </Helmet>
      )}

      <MarketingHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-[760px] w-full px-5 py-12">
          {page.hero_image_url && (
            <img
              src={page.hero_image_url}
              alt={page.title}
              className="w-full aspect-video object-cover rounded-xl mb-8"
            />
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
            {page.title}
          </h1>

          {(page.author_name || page.published_at) && (
            <p className="text-sm text-muted-foreground mb-10">
              By {page.author_name || "Otto Pay"}
              {page.published_at && ` · ${formatDate(page.published_at)}`}
            </p>
          )}

          {page.excerpt && (
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {page.excerpt}
            </p>
          )}

          <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:text-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {page.body_markdown}
            </ReactMarkdown>
          </div>

          {td.how_to_steps && td.how_to_steps.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Step-by-step
              </h2>
              <ol className="space-y-5">
                {td.how_to_steps.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {s.step}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {s.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {td.comparison_table &&
            td.comparison_table.headers &&
            td.comparison_table.rows && (
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  At a glance
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        {td.comparison_table.headers.map((h, i) => (
                          <th
                            key={i}
                            className="text-left py-3 px-4 font-semibold text-foreground"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {td.comparison_table.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-border">
                          {td.comparison_table!.headers.map((h, ci) => (
                            <td
                              key={ci}
                              className="py-3 px-4 text-foreground/90"
                            >
                              {row[h] ?? row.feature ?? ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

          {td.faqs && td.faqs.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {td.faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-foreground mb-2">
                      {f.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {td.cta && (
            <section className="mt-12 pt-8 border-t border-border text-center">
              <Link
                to={td.cta.url}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
              >
                {td.cta.label}
              </Link>
            </section>
          )}

          {td.related_links && td.related_links.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Related
              </h2>
              <ul className="space-y-2">
                {td.related_links.map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.url}
                      className="text-primary hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>

      <MarketingFooter />
    </div>
  );
}
