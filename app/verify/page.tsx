// app/verify/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState('verifying')
  const email = searchParams.get('email')

  useEffect(() => {
    // Temporary verification logic
    const verifyEmail = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setStatus('verified')
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } catch (error) {
        setStatus('error')
      }
    }

    verifyEmail()
  }, [router])

  if (status === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your email address...</p>
          <p className="text-sm text-gray-500 mt-2">{email}</p>
        </div>
      </div>
    )
  }

  if (status === 'verified') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
          <div className="text-green-500 text-4xl mb-4">✓</div>
          <p className="text-gray-600">Email verified successfully!</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting to homepage...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <div className="text-red-500 text-4xl mb-4">✗</div>
        <p className="text-gray-600">Verification failed</p>
        <button 
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  )
}