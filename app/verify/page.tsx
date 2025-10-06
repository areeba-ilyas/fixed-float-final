// app/verify/page.tsx
'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState('verifying')
  const email = searchParams.get('email')

  useEffect(() => {
    // Temporary verification logic
    setTimeout(() => {
      setStatus('verified')
      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }, 2000)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
        
        {status === 'verifying' && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying your email address...</p>
            <p className="text-sm text-gray-500 mt-2">{email}</p>
          </div>
        )}
        
        {status === 'verified' && (
          <div>
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <p className="text-gray-600">Email verified successfully!</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to homepage...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}