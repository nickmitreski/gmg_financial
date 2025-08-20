import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { session_id, message } = await request.json()
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) },
          setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Create session if needed
    let sid = session_id as string | undefined
    if (!sid) {
      const { data, error } = await supabase.from('chat_sessions').insert({ user_id: user.id, title: message.slice(0, 60) }).select('id').single()
      if (error || !data) return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
      sid = data.id
    }

    // Record user message
    await supabase.from('chat_messages').insert({ session_id: sid, role: 'user', content: message })

    // Call Mistral
    const mistralKey = process.env.MISTRAL_API_KEY!
    const resp = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mistralKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: 'You are an assistant for GMG Financial Services admin users.' },
          { role: 'user', content: message }
        ],
        temperature: 0.2,
      })
    })
    if (!resp.ok) return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
    const json = await resp.json()
    const assistant = json.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.'

    // Save assistant message
    await supabase.from('chat_messages').insert({ session_id: sid, role: 'assistant', content: assistant, model: json.model })

    return NextResponse.json({ session_id: sid, reply: assistant })
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}


