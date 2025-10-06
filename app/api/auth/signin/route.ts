// app/api/auth/signin/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Demo authentication - username "ondib" aur password "KUIzxXdUYC2w@" check karega
    if (username === 'ondib' && password === 'KUIzxXdUYC2w@') {
      return NextResponse.json({
        success: true,
        message: 'Signin successful',
        user: { username, id: '1' }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
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