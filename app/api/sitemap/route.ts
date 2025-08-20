import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) }, setAll(cs){ cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } } }
  )
  const { data: articles = [] } = await supabase
    .from('articles')
    .select('slug, updated_at, published_at')
    .eq('status', 'published')

  const staticUrls = [
    { loc: baseUrl, changefreq: 'weekly', priority: '1.0' },
  ]

  const articleUrls = (articles || []).map(a => ({
    loc: `${baseUrl}/news/${a.slug}`,
    lastmod: (a.updated_at || a.published_at || new Date().toISOString()) as any,
    changefreq: 'weekly',
    priority: '0.6',
  }))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
${articleUrls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${new Date(u.lastmod).toISOString()}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate' },
  })
}