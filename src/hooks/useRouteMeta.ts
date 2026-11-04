import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface RouteMeta {
  title: string;
  description: string;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  twitter_card: string | null;
  robots: string | null;
  structured_data: Record<string, unknown> | null;
}

const SITE_ORIGIN = "https://ottopay.pro";

const FALLBACK: RouteMeta = {
  title: "Otto Pay - Smart Invoicing for HVAC Contractors",
  description:
    "Professional invoicing built for HVAC contractors. Create invoices in 30 seconds, accept payments instantly.",
  canonical_url: null,
  og_title: null,
  og_description: null,
  og_image_url: null,
  twitter_card: "summary_large_image",
  robots: "index,follow,max-image-preview:large",
  structured_data: null,
};

/**
 * Fetches per-route SEO metadata from the page_meta table.
 * Stale-while-revalidate: served instantly from cache, refreshed in background.
 * Falls back to sensible defaults if the row is missing.
 */
export function useRouteMeta(pathname: string) {
  const { data } = useQuery({
    queryKey: ["page-meta", pathname],
    queryFn: async (): Promise<RouteMeta> => {
      const { data, error } = await supabase
        .from("page_meta")
        .select(
          "title, description, canonical_url, og_title, og_description, og_image_url, twitter_card, robots, structured_data"
        )
        .eq("route", pathname)
        .maybeSingle();

      if (error) {
        console.warn(`[useRouteMeta] failed for ${pathname}:`, error.message);
        return { ...FALLBACK, canonical_url: `${SITE_ORIGIN}${pathname}` };
      }
      if (!data) {
        console.warn(`[useRouteMeta] no page_meta row for ${pathname}`);
        return { ...FALLBACK, canonical_url: `${SITE_ORIGIN}${pathname}` };
      }
      return data as RouteMeta;
    },
    staleTime: 5 * 60 * 1000, // 5 min — stale-while-revalidate
    gcTime: 30 * 60 * 1000,
  });

  return data ?? { ...FALLBACK, canonical_url: `${SITE_ORIGIN}${pathname}` };
}
