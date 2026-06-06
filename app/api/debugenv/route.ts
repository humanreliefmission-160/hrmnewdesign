import { NextResponse } from 'next/server'

export function GET() {
  const vars = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
  }

  const missing: string[] = []
  for (const [name, value] of Object.entries(vars)) {
    if (!value) missing.push(name)
  }

  return NextResponse.json({
    allPresent: missing.length === 0,
    missing,
    tip: 'Check your .env.local file and restart the dev server.',
  })
}