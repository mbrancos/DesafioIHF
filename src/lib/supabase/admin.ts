import { createClient } from '@supabase/supabase-js';

/**
 * Cliente administrativo com SUPABASE_SERVICE_ROLE_KEY.
 * Utilizado exclusivamente no servidor (Server Actions / Route Handlers) para operações que
 * exigem privilégios elevados, como ingestão pública de fornecedores deslogados (/upload)
 * e escrita direta no bucket 'invoices' do Supabase Storage.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configuradas no ambiente do servidor.'
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
