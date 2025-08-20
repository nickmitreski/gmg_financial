'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewUserPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create user')
      router.push('/admin/users')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New User</h1>
      {error && <div className="mb-4 rounded bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Name</label>
          <input name="name" className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input name="email" type="email" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input name="password" type="password" required className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Role</label>
          <select name="role" defaultValue="STAFF" className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="USER">USER</option>
            <option value="STAFF">STAFF</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Department</label>
          <input name="department" className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={isLoading} className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50">
          {isLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  )
}



