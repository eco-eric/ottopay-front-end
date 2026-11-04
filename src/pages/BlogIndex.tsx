import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import RouteHead from "@/components/RouteHead";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;
const SITE_ORIGIN = "https://ottopay.pro";

interface BlogPostCard {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  hero_image_url: string | null;
  author_name: string | null;
  published_at: string | null;
  tags: string[] | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function titleCase(tag: string): string {
  return tag
    .split(/[\s-_]+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

export default function BlogIndex() {
  const [searchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const initialTag = searchParams.get("tag")?.toLowerCase() ?? "";
  const initialQ = searchParams.get("q") ?? "";

  const [activeTag, setActiveTag] = useState<string>(initialTag);
  const [searchInput, setSearchInput] = useState<string>(initialQ);
  const [debouncedQ, setDebouncedQ] = useState<string>(initialQ);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(searchInput), 200);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Sync URL (replaceState — no re-render)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (debouncedQ) url.searchParams.set("q", debouncedQ);
    else url.searchParams.delete("q");
    if (activeTag) url.searchParams.set("tag", activeTag);
    else url.searchParams.delete("tag");
    window.history.replaceState({}, "", url.toString());
  }, [debouncedQ, activeTag]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  // Fetch ALL published posts (client-side filter for search/tags).
  // Keeping pagination on the unfiltered server fetch would mismatch filters,
  // so we fetch published list once and slice client-side.
  const { data, isLoading } = useQuery({
    queryKey: ["blog-posts-all"],
    queryFn: async () => {
      const nowIso = new Date().toISOString();
      const { data: rows, error } = await supabase
        .from("blog_posts")
        .select(
          "id, slug, title, excerpt, hero_image_url, author_name, published_at, tags"
        )
        .eq("status", "published")
        .lte("published_at", nowIso)
        .order("published_at", { ascending: false })
        .limit(500);

      if (error) throw error;
      return (rows ?? []) as BlogPostCard[];
    },
    staleTime: 60_000,
  });

  const allPosts = data ?? [];

  // Build distinct tag list
  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const p of allPosts) {
      for (const t of p.tags ?? []) {
        const n = normalizeTag(t);
        if (n) set.add(n);
      }
    }
    return Array.from(set).sort();
  }, [allPosts]);

  // Filter posts by tag + search
  const filtered = useMemo(() => {
    const q = debouncedQ.trim().toLowerCase();
    return allPosts.filter((p) => {
      const tags = (p.tags ?? []).map(normalizeTag);
      if (activeTag && !tags.includes(activeTag)) return false;
      if (q) {
        const hay = [
          p.title ?? "",
          p.excerpt ?? "",
          ...tags,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allPosts, activeTag, debouncedQ]);

  // Paginate filtered results client-side
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const prevHref = safePage > 1 ? `/blog?page=${safePage - 1}` : null;
  const nextHref = safePage < totalPages ? `/blog?page=${safePage + 1}` : null;

  const countLabel = activeTag
    ? `${filtered.length} ${filtered.length === 1 ? "article" : "articles"} tagged ${titleCase(activeTag)}`
    : `${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`;

  const clearFilters = () => {
    setSearchInput("");
    setDebouncedQ("");
    setActiveTag("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <RouteHead />
      <Helmet>
        {prevHref && <link rel="prev" href={`${SITE_ORIGIN}${prevHref}`} />}
        {nextHref && <link rel="next" href={`${SITE_ORIGIN}${nextHref}`} />}
      </Helmet>
      <MarketingHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-[1200px] px-5 py-16">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Otto Pay Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical guides, invoicing tips, and business advice for HVAC and field service contractors.
            </p>
          </header>

          {/* Search + filters */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-center">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search articles…"
                  className="pl-9 rounded-full"
                  aria-label="Search articles"
                />
              </div>
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTag("")}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                    activeTag === ""
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-pressed={activeTag === ""}
                >
                  All
                </button>
                {allTags.map((tag) => {
                  const selected = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setActiveTag(selected ? "" : tag)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                        selected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                      )}
                      aria-pressed={selected}
                    >
                      {titleCase(tag)}
                    </button>
                  );
                })}
              </div>
            )}

            <p className="text-center text-sm text-muted-foreground">
              {countLabel}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mx-auto max-w-xl text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No articles match your search.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="text-primary hover:underline font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pageRows.map((post) => {
                  const tags = (post.tags ?? []).map(normalizeTag).filter(Boolean).slice(0, 3);
                  return (
                    <article
                      key={post.id}
                      className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                    >
                      <Link to={`/blog/${post.slug}`} className="no-underline">
                        <div className="aspect-video bg-muted overflow-hidden">
                          {post.hero_image_url ? (
                            <img
                              src={post.hero_image_url}
                              alt={post.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                              <span className="text-primary/40 font-bold text-2xl">Otto Pay</span>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="p-5 flex-1 flex flex-col">
                        <Link to={`/blog/${post.slug}`} className="no-underline">
                          <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                              {post.excerpt}
                            </p>
                          )}
                        </Link>
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {tags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveTag(tag);
                                  window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                              >
                                {titleCase(tag)}
                              </button>
                            ))}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-auto">
                          {post.author_name && <>By {post.author_name} · </>}
                          {formatDate(post.published_at)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-12 flex items-center justify-center gap-4"
                  aria-label="pagination"
                >
                  {prevHref ? (
                    <Link
                      to={prevHref}
                      rel="prev"
                      className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-accent no-underline"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="px-4 py-2 rounded-md border border-border text-muted-foreground opacity-50">
                      ← Previous
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    Page {safePage} of {totalPages}
                  </span>
                  {nextHref ? (
                    <Link
                      to={nextHref}
                      rel="next"
                      className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-accent no-underline"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="px-4 py-2 rounded-md border border-border text-muted-foreground opacity-50">
                      Next →
                    </span>
                  )}
                </nav>
              )}
            </>
          )}
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
