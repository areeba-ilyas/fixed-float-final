import { NextRequest, NextResponse } from 'next/server';

// Mock database
const users = [
  {
    id: '1',
    email: 'areebakhan2k22@gmail.com',
    password: 'demo123',
    verified: true
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!user.verified) {
      return NextResponse.json(
        { success: false, error: 'Please verify your email first' },
        { status: 401 }
      );
    }

    // Create session token
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
    
    // Create response with success
    const response = NextResponse.json({
      success: true,
      message: 'Sign in successful',
      redirectTo: '/', // ✅ Homepage redirect URL
      user: {
        id: user.id,
        email: user.email
      }
    });

    // Set cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}