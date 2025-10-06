import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fromCurrency, toCurrency, amount, address } = body;

    // Validation - Yeh error tha (laddress ki jagah !address)
    if (!address) {
      return NextResponse.json(
        { error: 'Please enter receiving address' },
        { status: 400 }
      );
    }

    // Generate order data
    const orderData = {
      orderId: 'Z' + Math.random().toString(36).substr(2, 6).toUpperCase(), // toUpperCase() correct spelling
      btcAddress: 'bclq234fa0lm3adhlgl0nut3pkapfm4t7xgvgemmy', // Correct BTC address
      usdtAddress: address,
      sendAmount: '0.00809223', // Correct amount
      receiveAmount: '1001.424', // Add this missing field
      timeRemaining: '28:01',
      creationTime: new Date().toLocaleString(),
      orderType: 'Float rate'
    };

    return NextResponse.json({ 
      success: true, 
      data: orderData 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}