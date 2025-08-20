"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewBriefPage() {
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/seo/brief', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ keyword })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to generate brief')
      router.push('/admin/seo')
    } catch (err: any) {
      setError(err.message || 'Failed to generate brief')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">New SEO Brief</h1>
      <div className="mb-6 rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900">
        <p className="font-medium mb-2">What is a brief?</p>
        <p className="mb-3">An SEO brief is a structured plan for an article. It includes the outline (H2/H3s), key entities to cover, FAQs, and suggested metadata. Generate a brief first, review/edit it, then create the full draft.</p>
        <p className="font-medium mb-2">How to use it</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Enter a target keyword or topic (e.g., “offset account explained”).</li>
          <li>Click <span className="font-semibold">Generate Brief</span> to create a recommended outline.</li>
          <li>Open the brief from the list, adjust sections/entities/FAQs, and approve.</li>
          <li>In the next step, generate a draft and publish to your News section.</li>
        </ul>
        <p className="font-medium mt-3 mb-2">Benefits</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Faster content planning aligned to search intent.</li>
          <li>Consistent structure and entity coverage for better rankings.</li>
          <li>Built‑in FAQs and metadata to improve CTR and snippet eligibility.</li>
        </ul>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Keyword</label>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" placeholder="e.g., offset account explained" required />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50">
          {loading ? 'Generating...' : 'Generate Brief'}
        </button>
      </form>
    </div>
  )
}


