import { requireAuth } from '@/lib/auth-server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function CalculatorRatesPage() {
  await requireAuth('ADMIN')
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll().map(c => ({ name: c.name, value: c.value })) }, setAll(cs){ cs.forEach(({name,value,options})=>cookieStore.set(name,value,options)) } } }
  )

  const { data: settings = [] } = await supabase
    .from('calculator_settings')
    .select('id, key, params, disclaimer, updated_at')
    .order('key', { ascending: true })

  const ensureKeys = ['loan_repayment', 'borrowing_power']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Calculator Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ensureKeys.map(k => {
          const row: any = settings.find((s: any) => s.key === k) || { id: '', key: k, params: {}, disclaimer: '' }
          return (
            <div key={k} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{k.replace('_',' ')}</h2>
              <form action="/api/admin/calculators/settings" method="post" className="space-y-3">
                <input type="hidden" name="id" value={row.id} />
                <input type="hidden" name="key" value={row.key} />
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Params (JSON)</label>
                  <textarea name="params" defaultValue={JSON.stringify(row.params ?? {}, null, 2)} className="w-full border rounded px-3 py-2 min-h-[160px] font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Disclaimer</label>
                  <textarea name="disclaimer" defaultValue={row.disclaimer ?? ''} className="w-full border rounded px-3 py-2 min-h-[80px]" />
                </div>
                <button className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700">Save</button>
              </form>
              {row.updated_at && (
                <p className="text-xs text-gray-500 mt-2">Updated {new Date(row.updated_at as any).toLocaleString()}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}


