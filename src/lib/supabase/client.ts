import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://seu_project_id.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sua_anon_key'
  );
}
