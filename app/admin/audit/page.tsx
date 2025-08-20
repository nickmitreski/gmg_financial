import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function AuditPage() {
  await requireAuth('ADMIN')
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) }, setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } } }
  )

  const { data: logsData } = await supabase
    .from('audit_logs')
    .select('id, created_at, actor_id, action, table_name, row_id, changes')
    .order('created_at', { ascending: false })
    .limit(100)
  const logs = logsData ?? []

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Time</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actor</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Action</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Table</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Row</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Changes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.length === 0 && <tr><td className="px-4 py-3 text-sm text-gray-600" colSpan={6}>No logs.</td></tr>}
            {logs.map((l: any) => (
              <tr key={l.id}>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(l.created_at as any).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{l.actor_id || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{l.action}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{l.table_name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{l.row_id}</td>
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-pre-wrap">{JSON.stringify(l.changes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


