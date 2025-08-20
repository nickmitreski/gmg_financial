import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Do not enforce auth at layout level. Individual pages enforce auth.
  // This prevents auth pages from being blocked by global guards.
  const session: any = null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar userRole={session?.user?.role} />
      <div className="flex-1 flex flex-col">
        <AdminHeader user={session?.user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}