import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Temporary storage - in production use database
let orders: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { fromCurrency, toCurrency, amount, address, orderType, rate, expectedAmount } = await request.json();

    // Validate required fields
    if (!fromCurrency || !toCurrency || !amount || !address || !orderType) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (parseFloat(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Create order
    const order = {
      id: uuidv4(),
      fromCurrency,
      toCurrency,
      amount: parseFloat(amount),
      address,
      orderType,
      rate: rate || 0,
      expectedAmount: expectedAmount || 0,
      status: 'pending', // ✅ Fixed: status field added
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
    };

    orders.push(order);

    return NextResponse.json({
      success: true,
      order,
      message: 'Exchange order created successfully'
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create exchange order' },
      { status: 500 }
    );
  }
}