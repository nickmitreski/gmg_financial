import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function NewsListPage() {
  await requireAuth('MANAGER')
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) }, setAll(cs){ cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } } }
  )

  const { data: articles = [] } = await supabase
    .from('articles')
    .select('id, title, slug, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">News Articles</h1>
        <a href="/admin/content/news/new" className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">New Article</a>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-4 text-sm text-gray-600">No articles yet.</td></tr>
            )}
            {articles.map((a: any) => (
              <tr key={a.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => location.assign(`/admin/content/news/${a.id}/editor`)}>
                <td className="px-6 py-4 text-sm text-gray-900">{a.title || '(untitled)'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{a.slug || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-500 capitalize">{a.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{a.published_at ? new Date(a.published_at as any).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


