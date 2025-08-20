'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function AuthErrorPage() {
  const params = useSearchParams()
  const error = params.get('error')

  const message =
    error === 'Configuration'
      ? 'There is a problem with the server configuration.'
      : error === 'AccessDenied'
      ? 'You do not have permission to sign in.'
      : error === 'Verification'
      ? 'The sign in link is no longer valid.'
      : 'An unexpected error occurred while signing in.'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Sign in error</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/admin/auth/signin" className="inline-flex items-center px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700">
            Try again
          </Link>
          <Link href="/" className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to site
          </Link>
        </div>
      </div>
    </div>
  )
}



