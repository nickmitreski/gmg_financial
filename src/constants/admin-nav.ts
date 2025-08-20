import { LayoutDashboard, Users, FileText, Calculator, BarChart3, Settings, MessageSquare, HardDrive, Shield } from 'lucide-react'
import type { UserRole } from '@/lib/auth-utils'
import { PERMISSIONS } from '@/lib/auth-utils'

export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission?: UserRole
  children?: NavItem[]
}

export const adminNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Chatbot', href: '/admin/chat', icon: MessageSquare, permission: PERMISSIONS.VIEW_ANALYTICS },
  {
    name: 'SEO', href: '/admin/seo', icon: FileText, permission: PERMISSIONS.EDIT_CONTENT,
    children: [
      { name: 'Briefs', href: '/admin/seo', icon: FileText },
      { name: 'New Brief', href: '/admin/seo/new', icon: FileText },
    ]
  },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, permission: PERMISSIONS.VIEW_ANALYTICS },
  { name: 'Storage', href: '/admin/storage', icon: HardDrive, permission: PERMISSIONS.EDIT_CONTENT },
  { name: 'Audit Logs', href: '/admin/audit', icon: Shield, permission: PERMISSIONS.VIEW_SETTINGS },
  {
    name: 'Content', href: '/admin/content', icon: FileText, permission: PERMISSIONS.EDIT_CONTENT,
    children: [
      { name: 'News Articles', href: '/admin/content/news', icon: FileText },
      { name: 'FAQ Management', href: '/admin/content/faq', icon: MessageSquare },
      { name: 'Services', href: '/admin/content/services', icon: Settings },
    ]
  },
  {
    name: 'Calculators', href: '/admin/calculators', icon: Calculator, permission: PERMISSIONS.EDIT_CONTENT,
    children: [
      { name: 'Interest Rates', href: '/admin/calculators/rates', icon: Calculator },
      { name: 'Usage Analytics', href: '/admin/calculators/analytics', icon: BarChart3 },
    ]
  },
  { name: 'Users', href: '/admin/users', icon: Users, permission: PERMISSIONS.VIEW_USERS },
  { name: 'Leads & Contacts', href: '/admin/leads', icon: MessageSquare, permission: PERMISSIONS.VIEW_CLIENTS },
  { name: 'Settings', href: '/admin/settings', icon: Settings, permission: PERMISSIONS.VIEW_SETTINGS },
]


