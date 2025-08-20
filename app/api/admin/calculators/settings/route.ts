import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const id = String(form.get('id') || '')
    const key = String(form.get('key') || '')
    const paramsRaw = String(form.get('params') || '{}')
    const disclaimer = String(form.get('disclaimer') || '')
    if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })
    let params: any = {}
    try { params = JSON.parse(paramsRaw) } catch { return NextResponse.json({ error: 'Params must be valid JSON' }, { status: 400 }) }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => request.headers.get('Cookie')?.split('; ').find(c => c.startsWith(n + '='))?.split('=')[1], set() {}, remove() {} } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    if (id) {
      const { error } = await supabase.from('calculator_settings').update({ params, disclaimer }).eq('id', id)
      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    } else {
      const { error } = await supabase.from('calculator_settings').upsert({ key, params, disclaimer }, { onConflict: 'key' })
      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.redirect(new URL('/admin/calculators/rates', request.url))
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


