import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function ArticleEditorPage({ params }: { params: { id: string } }) {
  await requireAuth('MANAGER')
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) }, setAll(cs){ cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } } }
  )

  const { data: article } = await supabase
    .from('articles')
    .select('id, title, slug, mdx, status, published_at, updated_at')
    .eq('id', params.id)
    .maybeSingle()

  if (!article) return <div className="text-sm text-gray-600">Article not found</div>

  const { data: versions } = await supabase
    .from('article_versions')
    .select('id, created_at, created_by, title')
    .eq('article_id', params.id)
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="space-y-4 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Edit: {article.title || '(untitled)'}</h1>
        <div className="flex gap-2">
          <form action="/api/admin/content/news/generate" method="post" className="flex items-center gap-2">
            <input type="hidden" name="id" value={article.id} />
            <input name="topic" placeholder="Generate with AI (topic)" className="border rounded px-2 py-1 text-sm" />
            <button className="px-3 py-2 rounded bg-teal-600 text-white text-sm">AI Draft</button>
          </form>
          {article.status !== 'published' ? (
            <form action="/api/admin/content/news/publish" method="post">
              <input type="hidden" name="id" value={article.id} />
              <button className="px-3 py-2 rounded bg-teal-600 text-white text-sm">Publish</button>
            </form>
          ) : (
            <form action="/api/admin/content/news/unpublish" method="post">
              <input type="hidden" name="id" value={article.id} />
              <button className="px-3 py-2 rounded bg-gray-600 text-white text-sm">Unpublish</button>
            </form>
          )}
        </div>
      </div>

      <form action="/api/admin/content/news/update" method="post" className="space-y-4">
        <input type="hidden" name="id" value={article.id} />
        <div>
          <label className="block text-sm text-gray-700 mb-1">Title</label>
          <input name="title" defaultValue={article.title || ''} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Slug</label>
          <input name="slug" defaultValue={article.slug || ''} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">MDX</label>
          <textarea name="mdx" defaultValue={article.mdx || ''} className="w-full border rounded px-3 py-2 min-h-[320px] font-mono text-sm" />
        </div>
        <button className="px-4 py-2 rounded bg-gray-900 text-white">Save</button>
      </form>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-2">Versions</h2>
        {!versions?.length ? (
          <div className="text-sm text-gray-600">No versions yet.</div>
        ) : (
          <ul className="divide-y">
            {versions!.map((v) => (
              <li key={v.id} className="py-2 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{v.title || '(untitled)'}</div>
                  <div className="text-xs text-gray-500">{new Date(v.created_at as any).toLocaleString()}</div>
                </div>
                <form action="/api/admin/content/news/restore" method="post" className="shrink-0">
                  <input type="hidden" name="article_id" value={article.id} />
                  <input type="hidden" name="version_id" value={v.id} />
                  <button className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm">Restore</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}


