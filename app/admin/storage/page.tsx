"use client"

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase-browser'

export default function StoragePage() {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabaseBrowser.storage.from('public').list('', { limit: 100 })
      if (!error) setFiles(data || [])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const { error } = await supabaseBrowser.storage.from('public').upload(file.name, file, { upsert: true })
      if (!error) await load()
    } finally { setLoading(false); e.currentTarget.value = '' }
  }

  const onDelete = async (name: string) => {
    setLoading(true)
    try {
      const { error } = await supabaseBrowser.storage.from('public').remove([name])
      if (!error) await load()
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Storage</h1>
        <label className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 cursor-pointer">
          Upload
          <input type="file" className="hidden" onChange={onUpload} />
        </label>
      </div>
      <div className="bg-white rounded-lg shadow overflow-auto">
        {loading && <div className="p-4 text-sm text-gray-500">Loading...</div>}
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Size</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.length === 0 && <tr><td className="px-4 py-3 text-sm text-gray-600" colSpan={3}>No files.</td></tr>}
            {files.map((f) => (
              <tr key={f.name}>
                <td className="px-4 py-3 text-sm text-gray-900">{f.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{f.metadata?.size ?? '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  <button onClick={() => onDelete(f.name)} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


