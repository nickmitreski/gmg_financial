import { requireAuth } from '@/lib/auth-server'
import { 
  Users, 
  Calculator, 
  FileText, 
  MessageSquare,
  Clock,
  TrendingUp
} from 'lucide-react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Safety shim: if any stale markup still references <AdminChatWidget />, make it a no-op
const AdminChatWidget = () => null

export default async function AdminDashboard() {
  const session = await requireAuth('STAFF')
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

  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const [contactsRes, briefsRes, articlesRes] = await Promise.all([
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('content_briefs').select('*', { count: 'exact', head: true }).gte('created_at', since30),
    supabase.from('articles').select('*', { count: 'exact', head: true }).gte('created_at', since30),
  ])

  const stats = [
    { name: 'Contact Forms (30d)', value: String(contactsRes.count ?? 0), change: '', icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'SEO Briefs (30d)', value: String(briefsRes.count ?? 0), change: '', icon: FileText, color: 'bg-orange-500' },
    { name: 'Articles (30d)', value: String(articlesRes.count ?? 0), change: '', icon: FileText, color: 'bg-blue-500' },
    { name: 'Calculators', value: '—', change: '', icon: Calculator, color: 'bg-green-500' },
  ]

  const { data: recentContacts } = await supabase
    .from('contact_submissions')
    .select('id,name,created_at,message')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {session.user.name || 'Admin'}!
        </h1>
        <p className="text-teal-100">
          Here's what's happening with GMG Financial Services today.
        </p>
        <div className="mt-4 flex items-center text-sm text-teal-100">
          <Clock className="h-4 w-4 mr-2" />
          Last login: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {(recentContacts ?? []).map((c) => (
                <div key={c.id} className="flex items-start space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">New Contact</p>
                    <p className="text-sm text-gray-500">{c.name || 'Unknown'} submitted a message</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(c.created_at as any).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="h-8 w-8 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Add User</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="h-8 w-8 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">New Article</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calculator className="h-8 w-8 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Update Rates</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <TrendingUp className="h-8 w-8 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">View Analytics</span>
              </button>
              <a href="/admin/chat" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="h-8 w-8 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Open Chatbot</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Website</p>
                  <p className="text-xs text-gray-500">Operational</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Database</p>
                  <p className="text-xs text-gray-500">Operational</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Service</p>
                  <p className="text-xs text-gray-500">Operational</p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}