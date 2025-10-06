// app/components/Navbar.tsx
'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Fixed Float
        </Link>
        
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-blue-200">
            Exchange
          </Link>
          <Link href="/about" className="hover:text-blue-200">
            About
          </Link>
          <Link href="/blog" className="hover:text-blue-200">
            Blog
          </Link>
          <Link href="/support" className="hover:text-blue-200">
            Support
          </Link>
        </div>
      </div>
    </nav>
  )
}