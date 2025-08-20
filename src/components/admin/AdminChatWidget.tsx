"use client"

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'

export function AdminChatWidget() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user'|'assistant', content: string }>>([])
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async () => {
    const content = input.trim()
    if (!content) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content }])
    setLoading(true)
    try {
      const res = await fetch('/api/admin/chat/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: content })
      })
      const json = await res.json()
      if (res.ok) {
        if (!sessionId) setSessionId(json.session_id)
        setMessages(prev => [...prev, { role: 'assistant', content: json.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + (json.error || 'unknown') }])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Admin Assistant</h2>
        <p className="text-xs text-gray-500">Ask product or operational questions; responses are AI-generated.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={
              'inline-block px-3 py-2 rounded-lg ' +
              (m.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-800')
            }>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          placeholder="Ask the admin assistant..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') sendMessage() }}
        />
        <button onClick={sendMessage} disabled={loading} className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}


