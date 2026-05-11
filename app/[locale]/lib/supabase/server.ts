import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!

  if (!url || !key) {
    throw new Error('Missing SUPABASE environment variables')
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false },
  })
}