// Supabase browser client. Reads VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  // The marketing site never signs anyone in; it only reads public content
  // and saves the contact and partner forms.
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});