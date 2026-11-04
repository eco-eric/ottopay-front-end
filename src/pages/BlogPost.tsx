import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import RouteHead from "@/components/RouteHead";
import NotFound from "@/pages/NotFound";
import type { Json } from "@/integrations/supabase/types";

const SITE_ORIGIN = "https://ottopay.pro";

interface BlogPostFull {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_markdown: string;
  hero_image_url: string | null;
  author_name: string | null;
  published_at: string | null;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  structured_data: Json | null;
  tags: string[] | null;
}

function titleCase(tag: string): string {
  return tag
    .split(/[\s-_]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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

function buildBlogPostingJsonLd(post: BlogPostFull): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.hero_image_url ?? post.og_image_url ?? undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_name ?? "Otto Pay",
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
      "@id": `${SITE_ORIGIN}/blog/${post.slug}`,
    },
  };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    enabled: !!slug,
    queryFn: async () => {
      const nowIso = new Date().toISOString();
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          "id, slug, title, excerpt, body_markdown, hero_image_url, author_name, published_at, updated_at, meta_title, meta_description, canonical_url, og_title, og_description, og_image_url, structured_data, tags"
        )
        .eq("slug", slug!)
        .eq("status", "published")
        .lte("published_at", nowIso)
        .maybeSingle();

      if (error) throw error;
      return data as BlogPostFull | null;
    },
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <MarketingHeader />
        <main className="flex-1 mx-auto max-w-[720px] w-full px-5 py-16">
          <div className="aspect-video bg-muted animate-pulse rounded-xl mb-8" />
          <div className="h-10 bg-muted animate-pulse rounded w-3/4 mb-4" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2 mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
          </div>
        </main>
        <MarketingFooter />
      </div>
    );
  }

  if (error || !data) {
    return <NotFound />;
  }

  const post = data;
  const description =
    post.meta_description ||
    post.excerpt ||
    stripMarkdown(post.body_markdown).slice(0, 160);

  const structured =
    (post.structured_data as Record<string, unknown> | null) ??
    buildBlogPostingJsonLd(post);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RouteHead
        override={{
          title: post.meta_title || post.title,
          description,
          canonical_url: post.canonical_url || `${SITE_ORIGIN}/blog/${post.slug}`,
          og_title: post.og_title || post.meta_title || post.title,
          og_description: post.og_description || post.meta_description || post.excerpt || description,
          og_image_url: post.og_image_url || post.hero_image_url,
          robots: "index,follow,max-image-preview:large",
          twitter_card: "summary_large_image",
          structured_data: structured,
        }}
      />

      <MarketingHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-[720px] w-full px-5 py-12">
          {post.hero_image_url && (
            <img
              src={post.hero_image_url}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-xl mb-8"
            />
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
            {post.title}
          </h1>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((raw) => {
                const tag = raw.trim().toLowerCase();
                if (!tag) return null;
                return (
                  <Link
                    key={tag}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium no-underline"
                  >
                    {titleCase(tag)}
                  </Link>
                );
              })}
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-10">
            By {post.author_name || "Otto Pay"} · {formatDate(post.published_at)}
          </p>

          <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:text-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.body_markdown}
            </ReactMarkdown>
          </div>

          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              to="/blog"
              className="text-primary hover:underline no-underline font-medium"
            >
              ← Back to blog
            </Link>
          </footer>
        </article>
      </main>

      <MarketingFooter />
    </div>
  );
}
