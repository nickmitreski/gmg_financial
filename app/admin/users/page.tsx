import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function UsersPage() {
  await requireAuth('USER')
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

  const { data: profiles = [] } = await supabase
    .from('profiles')
    .select('id, email, name, department, role, is_active, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Department</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Role</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Active</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.length === 0 && (
              <tr><td className="px-4 py-3 text-sm text-gray-600" colSpan={6}>No users.</td></tr>
            )}
            {profiles.map((p: any) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{p.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.name || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.department || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <form action={`/api/admin/users/update`} method="post" className="flex items-center gap-2">
                    <input type="hidden" name="id" value={p.id} />
                    <select name="role" defaultValue={p.role} className="border rounded px-2 py-1 text-sm">
                      <option value="USER">USER</option>
                      <option value="STAFF">STAFF</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    </select>
                    <label className="inline-flex items-center gap-1 text-sm text-gray-600">
                      <input type="checkbox" name="is_active" defaultChecked={p.is_active} /> Active
                    </label>
                    <button type="submit" className="px-3 py-1 rounded bg-teal-600 text-white text-sm">Save</button>
                  </form>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.is_active ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-sm text-gray-500"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}



