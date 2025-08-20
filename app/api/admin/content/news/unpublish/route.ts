import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const id = String(form.get('id') || '')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => request.headers.get('Cookie')?.split('; ').find(c => c.startsWith(n + '='))?.split('=')[1], set() {}, remove() {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: updated } = await supabase.from('articles').update({ status: 'draft', published_at: null }).eq('id', id).select('slug').single()
    if (!updated) return NextResponse.json({ error: 'Failed to unpublish' }, { status: 400 })
    try { revalidatePath('/api/sitemap') } catch {}
    try { revalidatePath(`/news/${updated.slug}`) } catch {}
    return NextResponse.redirect(new URL(`/admin/content/news/${id}/editor`, request.url))
  } catch (e) { return NextResponse.json({ error: 'Unexpected error' }, { status: 500 }) }
}


