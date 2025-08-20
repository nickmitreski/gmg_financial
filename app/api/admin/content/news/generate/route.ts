import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function fetchSerp(topic: string) {
  try {
    if (!process.env.SERPER_API_KEY) return []
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': process.env.SERPER_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: topic, num: 5, gl: 'au' }),
    })
    if (!res.ok) return []
    const j = await res.json()
    const items = (j?.organic ?? []).slice(0, 5).map((r: any) => ({ title: r.title, link: r.link, snippet: r.snippet }))
    return items
  } catch { return [] }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData().catch(async () => {
      // fallback for JSON
      try { return await request.formData() } catch { return new FormData() }
    })
    const id = String(form.get('id') || '')
    const topic = String(form.get('topic') || form.get('title') || '')
    const style = String(form.get('style') || 'clear, helpful, Australian financial context, plain English')
    if (!topic) return NextResponse.json({ error: 'Missing topic' }, { status: 400 })

    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll().map((c) => ({ name: c.name, value: c.value }))
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const serp = await fetchSerp(topic)

    const prompt = `Write a high-quality financial news/blog article in MDX about: "${topic}" for an Australian mortgage/finance audience.
Style: ${style}.
Length: 800-1200 words.
Include: intro, H2/H3 sections, bullet points where useful, and a conclusion with a call-to-action to contact GMG.
Citations: after relevant statements, include a markdown reference list at the end under "References" with the provided links.
Return only the MDX content.

Here are optional reference results (use if relevant):
${serp.map((s, i) => `${i + 1}. ${s.title} - ${s.link} — ${s.snippet}`).join('\n')}`

    const resp = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: 'You are a professional financial copywriter. Return only MDX.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.4,
      })
    })
    if (!resp.ok) return NextResponse.json({ error: 'LLM request failed' }, { status: 500 })
    const j = await resp.json()
    let mdx = j.choices?.[0]?.message?.content || ''
    if (/```/m.test(mdx)) {
      const m = mdx.match(/```[a-zA-Z]*\n([\s\S]*?)```/)
      if (m) mdx = m[1]
    }

    const title = topic
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    if (id) {
      const { error } = await supabase.from('articles').update({ title, slug, mdx, status: 'draft' }).eq('id', id)
      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.redirect(new URL(`/admin/content/news/${id}/editor`, request.url))
    } else {
      const { data, error } = await supabase.from('articles').insert({ title, slug, mdx, status: 'draft' }).select('id').single()
      if (error || !data) return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 })
      return NextResponse.redirect(new URL(`/admin/content/news/${data.id}/editor`, request.url))
    }
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


