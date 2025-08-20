import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this resource. Please contact your administrator 
          if you believe this is an error.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/admin/dashboard"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors inline-block"
          >
            Return to Dashboard
          </Link>
          
          <Link
            href="/admin/auth/signin"
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Sign In as Different User
          </Link>
        </div>
      </div>
    </div>
  )
}