'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { Bell, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import { UserRole } from '@prisma/client'

interface AdminHeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    role?: UserRole
    department?: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/auth/signin' })
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-teal-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    {user?.department && (
                      <p className="text-xs text-gray-400 mt-1">{user.department}</p>
                    )}
                  </div>
                  
                  <div className="py-2">
                    <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="mr-3 h-4 w-4" />
                      Account Settings
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}