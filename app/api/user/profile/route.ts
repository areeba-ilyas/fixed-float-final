import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In real app, verify authentication and get user from database
    const authToken = request.cookies.get('auth-token');
    
    if (!authToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Mock user data
    const user = {
      id: '1',
      email: 'user@fixedfloat.com',
      name: 'John Doe',
      joinedAt: new Date('2024-01-01').toISOString(),
      totalExchanges: 15,
      totalVolume: '2.5 BTC'
    };

    return NextResponse.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}