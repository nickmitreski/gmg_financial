import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) },
        setAll(cs) { cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) },
      },
    }
  )

  const { data: article } = await supabase
    .from('articles')
    .select('id, title, slug, mdx, status, published_at, updated_at')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle()

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-2xl font-semibold text-gray-900">Article not found</h1>
        <p className="mt-2 text-gray-600">It may have been unpublished or the link is incorrect.</p>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto py-10 prose prose-teal">
      <h1>{article.title}</h1>
      <p className="text-sm text-gray-500">Published {article.published_at ? new Date(article.published_at as any).toLocaleDateString() : ''}</p>
      <div className="mt-6">
        <pre className="whitespace-pre-wrap text-sm">{article.mdx}</pre>
      </div>
    </article>
  )
}


