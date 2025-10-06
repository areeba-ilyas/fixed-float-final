// app/api/auth/signin/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Temporary demo authentication
    if (email && password) {
      return NextResponse.json({
        success: true,
        message: 'Signin successful',
        user: { email, id: '1' }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}