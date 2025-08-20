import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const brief_id = String(form.get('brief_id') || '')
    if (!brief_id) return NextResponse.json({ error: 'Missing brief_id' }, { status: 400 })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (n: string) => request.headers.get('Cookie')?.split('; ').find(c => c.startsWith(n + '='))?.split('=')[1], set() {}, remove() {} } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: brief, error: briefErr } = await supabase
      .from('content_briefs')
      .select('id, keyword, outline, entities, faqs, meta')
      .eq('id', brief_id)
      .maybeSingle()
    if (briefErr || !brief) return NextResponse.json({ error: 'Brief not found' }, { status: 404 })

    const meta: any = brief.meta || {}
    const title = meta.title || brief.keyword
    const slug = (meta.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))

    const prompt = `Write a high-quality article draft in MDX based on this SEO brief for an Australian financial services site.\nKeyword: ${brief.keyword}\nOutline: ${JSON.stringify(brief.outline)}\nEntities: ${JSON.stringify(brief.entities)}\nFAQs: ${JSON.stringify(brief.faqs)}\nTitle: ${title}\nReturn only the MDX content.`

    const resp = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: 'You are a financial content writer. Return only MDX.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      })
    })
    if (!resp.ok) return NextResponse.json({ error: 'LLM request failed' }, { status: 500 })
    const j = await resp.json()
    let mdx = j.choices?.[0]?.message?.content || ''
    if (/```/m.test(mdx)) {
      const m = mdx.match(/```[a-zA-Z]*\n([\s\S]*?)```/)
      if (m) mdx = m[1]
    }

    const { data: article, error } = await supabase
      .from('articles')
      .insert({ brief_id, slug, title, mdx, status: 'draft' })
      .select('id')
      .single()
    if (error || !article) return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 })

    return NextResponse.redirect(new URL('/admin/seo', request.url))
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


