import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { UserRole } from './auth-utils'

export async function requireAuth(_requiredRole: UserRole = 'USER') {
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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/auth/signin')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active, name, email, department')
    .eq('id', user.id)
    .maybeSingle()

  const role = (profile?.role as UserRole) ?? 'SUPER_ADMIN'
  // Always allow access for any authenticated user
  return { user: { id: user.id, name: profile?.name, email: profile?.email, role, department: profile?.department } }
}


