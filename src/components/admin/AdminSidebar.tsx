'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, ChevronDown, ChevronRight } from 'lucide-react'
import type { UserRole } from '@/lib/auth-utils'
import { cn } from '@/lib/utils'
import { adminNavigation, type NavItem } from '@/constants/admin-nav'
import { supabaseBrowser } from '@/lib/supabase-browser'

interface AdminSidebarProps {
  userRole?: UserRole
}

// Navigation items are defined in src/constants/admin-nav.ts

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [role, setRole] = useState<UserRole>('USER')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      // Prefer prop if provided
      if (userRole) { setRole(userRole); return }
      const { data: { user } } = await supabaseBrowser.auth.getUser()
      if (!user) return
      const { data } = await supabaseBrowser.from('profiles').select('role').eq('id', user.id).maybeSingle()
      if (mounted && data?.role) setRole(data.role as UserRole)
    })()
    return () => { mounted = false }
  }, [userRole])

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const hasPermission = (_permission?: UserRole) => true

  const renderNavItem = (item: NavItem, level = 0) => {
    if (!hasPermission(item.permission)) return null

    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
    const isExpanded = expandedItems.includes(item.href)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.href}>
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              'flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              level > 0 && 'ml-6',
              isActive
                ? 'bg-teal-100 text-teal-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="flex-1">{item.name}</span>
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.href)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && item.children && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-teal-600" />
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">Admin Portal</h1>
            <p className="text-sm text-gray-500">GMG Financial</p>
          </div>
        </div>
      </div>

      <nav className="px-3 pb-6">
        <div className="space-y-1">
          {adminNavigation.map(item => renderNavItem(item))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-500">
          <p>Role: <span className="font-medium">{role}</span></p>
        </div>
      </div>
    </div>
  )
}