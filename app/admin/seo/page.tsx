import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function SeoBriefsPage() {
  await requireAuth('MANAGER')
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      cookies: { 
        getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) },
        setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) },
      } 
    }
  )
  const { data: briefs } = await supabase
    .from('content_briefs')
    .select('id, keyword, created_at, status, meta')
    .order('created_at', { ascending: false })
    .limit(25)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">SEO Briefs</h1>
        <a href="/admin/seo/new" className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">New Brief</a>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(briefs ?? []).length === 0 && (
              <tr><td className="px-6 py-4 text-sm text-gray-600" colSpan={4}>No briefs yet.</td></tr>
            )}
            {(briefs ?? []).map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  <a href={`/admin/seo/${b.id}`} className="text-teal-700 hover:underline">{b.keyword}</a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{(b.meta as any)?.slug || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{b.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(b.created_at as any).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


