import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const id = String(form.get('id') || '')
    const title = String(form.get('title') || '')
    const description = String(form.get('description') || '')
    const slug = String(form.get('slug') || '')
    const status = String(form.get('status') || 'draft')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => request.headers.get('Cookie')?.split('; ').find(c => c.startsWith(n + '='))?.split('=')[1], set() {}, remove() {} } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const meta = { title, description, slug }
    const { error } = await supabase.from('content_briefs').update({ meta, status }).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.redirect(new URL(`/admin/seo/${id}`, request.url))
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


