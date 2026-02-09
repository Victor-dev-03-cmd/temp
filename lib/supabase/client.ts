import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // This will prevent the build from failing, but log a warning.
    console.warn("Supabase URL or Key is missing. Returning a null client during build time.")
    return null;
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}
