import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const title = String(form.get('title') || '')
    const slug = String(form.get('slug') || '').toLowerCase().replace(/[^a-z0-9-]+/g,'-').replace(/(^-|-$)/g,'')
    const mdx = String(form.get('mdx') || '')
    if (!title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => request.headers.get('Cookie')?.split('; ').find(c => c.startsWith(n + '='))?.split('=')[1], set() {}, remove() {} } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase.from('articles').insert({ title, slug: slug || null, mdx, status: 'draft' }).select('id').single()
    if (error || !data) return NextResponse.json({ error: error?.message || 'Failed to create' }, { status: 400 })
    return NextResponse.redirect(new URL(`/admin/content/news/${data.id}/editor`, request.url))
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


