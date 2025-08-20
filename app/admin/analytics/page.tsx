import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getCounts() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((c) => ({ name: c.name, value: c.value }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    }
  )

  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [a,b,c,d, popularServices, calcUsage] = await Promise.all([
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('chat_messages').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('content_briefs').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('articles').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('contact_submissions').select('meta').gte('created_at', since30),
    supabase.from('calculator_usage').select('id').gte('created_at', since30),
  ])
  const contacts = a.count ?? 0
  const chats = b.count ?? 0
  const briefs = c.count ?? 0
  const articles = d.count ?? 0

  return {
    contacts: contacts ?? 0,
    chats: chats ?? 0,
    briefs: briefs ?? 0,
    articles: articles ?? 0,
    popularServices: popularServices?.data ?? [],
    calculatorUsageCount: calcUsage?.data?.length ?? 0,
  }
}

export default async function AnalyticsPage() {
  await requireAuth('STAFF')
  const counts = await getCounts()
  const rawUrl = process.env.NEXT_PUBLIC_POSTHOG_DASHBOARD_URL || ''
  const posthogDashboard = rawUrl.includes('?') ? rawUrl : (rawUrl ? `${rawUrl}?no-toolbar=1` : '')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Contact Submissions (30d)</p>
          <p className="text-3xl font-semibold text-gray-900">{counts.contacts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Chat Messages (30d)</p>
          <p className="text-3xl font-semibold text-gray-900">{counts.chats}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">SEO Briefs (30d)</p>
          <p className="text-3xl font-semibold text-gray-900">{counts.briefs}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Articles (30d)</p>
          <p className="text-3xl font-semibold text-gray-900">{counts.articles}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Calculator Usage (30d)</p>
          <p className="text-3xl font-semibold text-gray-900">{counts.calculatorUsageCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">PostHog</h2>
          <p className="text-sm text-gray-500">Pageviews and events from your site {process.env.NEXT_PUBLIC_SITE_URL}</p>
        </div>
        <div className="p-4">
          {posthogDashboard ? (
            <iframe
              src={posthogDashboard}
              className="w-full h-[700px] rounded border"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div className="text-sm text-gray-600">
              <p className="mb-2">To embed a PostHog dashboard here:</p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Open PostHog → Dashboards → Share → Create shared link.</li>
                <li>Add the link to your env as <code className="px-1 bg-gray-100 rounded">NEXT_PUBLIC_POSTHOG_DASHBOARD_URL</code>.</li>
                <li>Restart the dev server and refresh this page.</li>
              </ol>
            </div>
          )}
        </div>
        {posthogDashboard && (
          <div className="px-6 pb-4 text-sm text-gray-500">
            <a href={posthogDashboard} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">Open in PostHog</a>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Popular Service Inquiries (30d)</h2>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Service</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Count</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(() => {
                const counts: Record<string, number> = {}
                for (const row of (counts.popularServices ?? [])) {
                  const svc = (row as any).meta?.service || 'unknown'
                  counts[svc] = (counts[svc] || 0) + 1
                }
                const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,10)
                if (entries.length === 0) return <tr><td className="px-4 py-3 text-sm text-gray-600" colSpan={2}>No data.</td></tr>
                return entries.map(([svc, count]) => (
                  <tr key={svc}>
                    <td className="px-4 py-3 text-sm text-gray-900">{svc}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{count}</td>
                  </tr>
                ))
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


