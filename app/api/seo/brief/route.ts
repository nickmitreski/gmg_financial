import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: Request) {
  try {
    const { keyword, project = 'default' } = await request.json()
    if (!keyword || typeof keyword !== 'string') {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 })
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.headers.get('Cookie')?.split('; ').find(c => c.startsWith(name + '='))?.split('=')[1]
          },
          set() {}, remove() {},
        }
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Prepare Mistral prompt
    const prompt = `Create a concise SEO content brief for the keyword: "${keyword}" for an Australian financial services site.
Return JSON with keys: outline (array of headings with children), entities (array), faqs (array of {q,a}), meta (object with title, description, slug). Keep it factual and locally relevant.`

    const resp = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: 'You are an SEO strategist.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      })
    })
    if (!resp.ok) return NextResponse.json({ error: 'LLM request failed' }, { status: 500 })
    const json = await resp.json()
    const content = json.choices?.[0]?.message?.content
    let parsed: any = {}
    try {
      parsed = JSON.parse(content)
    } catch {
      try {
        const match = content?.match(/```json[\s\S]*?```/i)
        if (match) {
          const inner = match[0].replace(/```json/i, '').replace(/```$/, '')
          parsed = JSON.parse(inner)
        } else {
          const curly = content?.match(/\{[\s\S]*\}$/)
          if (curly) parsed = JSON.parse(curly[0])
        }
      } catch {
        parsed = {}
      }
    }

    const { data, error } = await supabase.from('content_briefs').insert({
      project,
      keyword,
      outline: parsed.outline ?? null,
      entities: parsed.entities ?? null,
      faqs: parsed.faqs ?? null,
      meta: parsed.meta ?? { title: keyword, description: null, slug: keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
      created_by: user.id,
    }).select('id').single()

    if (error || !data) return NextResponse.json({ error: 'Failed to save brief' }, { status: 500 })
    return NextResponse.json({ id: data.id })
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


