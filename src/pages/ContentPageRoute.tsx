import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import MarketingHeader from "@/components/marketing/MarketingHeader";
import MarketingFooter from "@/components/marketing/MarketingFooter";
import NotFound from "@/pages/NotFound";
import TemplateRenderer, {
  type ContentPageRow,
} from "@/components/templates/TemplateRenderer";

/**
 * Catch-all route. Looks up the current pathname in `content_pages`.
 * - Loading → skeleton
 * - No row  → NotFound (final fallback)
 * - Found   → TemplateRenderer
 */
export default function ContentPageRoute() {
  const { pathname } = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["content-page", pathname],
    queryFn: async () => {
      const nowIso = new Date().toISOString();
      const { data, error } = await supabase
        .from("content_pages")
        .select(
          "id, url_path, template_id, title, excerpt, body_markdown, author_name, hero_image_url, meta_title, meta_description, canonical_url, og_title, og_description, og_image_url, structured_data, template_data, published_at, updated_at, trade, sub_trade, metro, neighborhood, feature, pillar_slug, related_slugs"
        )
        .eq("url_path", pathname)
        .eq("status", "published")
        .lte("published_at", nowIso)
        .maybeSingle();

      if (error) throw error;
      return (data as ContentPageRow | null) ?? null;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <MarketingHeader />
        <main className="flex-1 mx-auto max-w-[760px] w-full px-5 py-12">
          <div className="aspect-video bg-muted animate-pulse rounded-xl mb-8" />
          <div className="h-10 bg-muted animate-pulse rounded w-3/4 mb-4" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2 mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-4/6" />
          </div>
        </main>
        <MarketingFooter />
      </div>
    );
  }

  if (error || !data) {
    return <NotFound />;
  }

  return <TemplateRenderer page={data} />;
}
