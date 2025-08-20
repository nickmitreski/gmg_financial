import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function LeadsPage() {
  await requireAuth('STAFF')
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
  const { data: leads } = await supabase
    .from('contact_submissions')
    .select('id, name, email, phone, message, status, stage, created_at, source_page, meta')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Leads & Contact Submissions</h1>
      </div>
      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Phone</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Service</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Stage</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(leads ?? []).length === 0 && (
              <tr><td className="px-4 py-3 text-sm text-gray-600" colSpan={6}>No submissions yet.</td></tr>
            )}
            {(leads ?? []).map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{l.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{l.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{l.phone || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{(l.meta as any)?.service || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <form action="/api/admin/leads/update" method="post" className="flex items-center gap-2">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="status" defaultValue={l.status} className="border rounded px-2 py-1 text-sm">
                      <option value="new">new</option>
                      <option value="in_progress">in_progress</option>
                      <option value="closed">closed</option>
                    </select>
                    <button className="px-2 py-1 rounded bg-teal-600 text-white text-xs">Save</button>
                  </form>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <form action="/api/admin/leads/stage" method="post" className="flex items-center gap-2">
                    <input type="hidden" name="id" value={l.id} />
                    <select name="stage" defaultValue={(l as any).stage || 'new'} className="border rounded px-2 py-1 text-sm">
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="consult">consult</option>
                      <option value="proposal">proposal</option>
                      <option value="won">won</option>
                      <option value="lost">lost</option>
                    </select>
                    <button className="px-2 py-1 rounded bg-gray-600 text-white text-xs">Save</button>
                  </form>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{new Date(l.created_at as any).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


