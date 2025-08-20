import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function SeoBriefDetail({ params }: { params: { id: string } }) {
  await requireAuth('MANAGER')
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

  const { data: brief } = await supabase
    .from('content_briefs')
    .select('id, keyword, outline, entities, faqs, meta, status, created_at, updated_at')
    .eq('id', params.id)
    .maybeSingle()

  if (!brief) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">Brief not found</h1>
        <Link href="/admin/seo" className="text-teal-700 hover:underline">Back to briefs</Link>
      </div>
    )
  }

  const meta = (brief.meta as any) || {}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Brief: {brief.keyword}</h1>
          <p className="text-sm text-gray-500">Created {new Date(brief.created_at as any).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <form action="/api/seo/draft" method="post">
            <input type="hidden" name="brief_id" value={brief.id} />
            <button className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">Generate draft</button>
          </form>
          <Link href="/admin/seo" className="px-4 py-2 rounded border border-gray-200 hover:bg-gray-50">Back</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Outline</h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(brief.outline, null, 2)}</pre>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">FAQs</h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(brief.faqs, null, 2)}</pre>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Meta</h2>
            <form action="/api/seo/brief/update" method="post" className="space-y-3">
              <input type="hidden" name="id" value={brief.id} />
              <div>
                <label className="block text-sm text-gray-700 mb-1">Title</label>
                <input name="title" defaultValue={meta.title || ''} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Description</label>
                <textarea name="description" defaultValue={meta.description || ''} className="w-full border rounded px-3 py-2 min-h-[80px]" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Slug</label>
                <input name="slug" defaultValue={meta.slug || ''} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Status</label>
                <select name="status" defaultValue={brief.status} className="w-full border rounded px-3 py-2">
                  <option value="draft">draft</option>
                  <option value="approved">approved</option>
                </select>
              </div>
              <button className="px-4 py-2 rounded bg-gray-900 text-white">Save</button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Entities</h2>
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(brief.entities, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

 