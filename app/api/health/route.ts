import { createServerClient } from "@/app/[locale]/lib/supabase/server"


export async function GET() {
  try {
    const supabase = createServerClient()
    // Try to read a public table (location). Should work even if empty.
    const { data, error } = await supabase
      .from('location')
      .select('count', { count: 'exact', head: true })

    if (error) throw error

    return Response.json({
      status: 'ok',
      message: 'Supabase service_role connection successful',
      timestamp: new Date().toISOString(),
    })
  } catch (err: any) {
    return Response.json(
      { status: 'error', message: err.message },
      { status: 500 }
    )
  }
}