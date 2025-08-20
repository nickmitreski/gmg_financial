import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const formData = await request.formData()
  const articleId = String(formData.get('article_id') || '')
  const versionId = String(formData.get('version_id') || '')
  if (!articleId || !versionId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) },
        setAll(cs) { cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: version, error: vErr } = await supabase
    .from('article_versions')
    .select('title, slug, mdx')
    .eq('id', versionId)
    .maybeSingle()
  if (vErr || !version) return NextResponse.json({ error: vErr?.message || 'Version not found' }, { status: 404 })

  const { error: uErr } = await supabase
    .from('articles')
    .update({ title: version.title, slug: version.slug, mdx: version.mdx, status: 'draft' })
    .eq('id', articleId)
  if (uErr) return NextResponse.json({ error: uErr.message }, { status: 400 })

  return NextResponse.redirect(new URL(`/admin/content/news/${articleId}/editor`, request.url))
}


