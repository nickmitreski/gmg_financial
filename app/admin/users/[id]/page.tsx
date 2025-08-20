import { requireAuth } from '@/lib/auth-server'
import { prisma } from '@/lib/prisma'

export default async function UserDetailPage({ params }: { params: { id: string } }) {
  await requireAuth('ADMIN')

  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      lastLogin: true,
      department: true,
    }
  })

  if (!user) {
    return <div className="text-gray-600">User not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Manage User</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-gray-900">{user.name || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-gray-900">{user.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-gray-900">{user.department || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
          <form action={`/api/admin/users/${user.id}`} method="post" className="space-y-3">
            <input type="hidden" name="_method" value="PATCH" />
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm text-gray-700">Role</label>
              <select name="role" defaultValue={user.role} className="border border-gray-300 rounded px-2 py-1">
                <option value="USER">USER</option>
                <option value="STAFF">STAFF</option>
                <option value="MANAGER">MANAGER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
              <label className="text-sm text-gray-700">Department</label>
              <input name="department" defaultValue={user.department || ''} className="border border-gray-300 rounded px-2 py-1" />
              <label className="text-sm text-gray-700">Active</label>
              <select name="isActive" defaultValue={String(user.isActive)} className="border border-gray-300 rounded px-2 py-1">
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <label className="text-sm text-gray-700">Reset Password</label>
              <input type="password" name="password" placeholder="New password (optional)" className="border border-gray-300 rounded px-2 py-1" />
            </div>
            <button className="mt-4 px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700" formAction={`/api/admin/users/${user.id}`}>Save changes</button>
          </form>
        </div>
      </div>
    </div>
  )
}



