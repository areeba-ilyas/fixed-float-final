import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fromCurrency, toCurrency, amount, orderType } = await request.json();

    // Realistic exchange rates (mock data)
    const rates: any = {
      'BTC-USDT': 45000,
      'USDT-BTC': 0.00002222,
      'ETH-USDT': 2500,
      'USDT-ETH': 0.0004,
      'BTC-ETH': 18,
      'ETH-BTC': 0.055,
      'ADA-USDT': 0.5,
      'USDT-ADA': 2,
    };

    const rateKey = `${fromCurrency}-${toCurrency}`;
    let baseRate = rates[rateKey] || 1;
    
    // Apply commission
    const commission = orderType === 'fixed' ? 0.01 : 0.005; // 1% or 0.5%
    const finalRate = baseRate * (1 - commission);
    const expectedAmount = parseFloat(amount) * finalRate;

    return NextResponse.json({
      success: true,
      rate: finalRate.toFixed(8),
      expectedAmount: expectedAmount.toFixed(8),
      commission: commission * 100,
      baseRate: baseRate
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get exchange rate' },
      { status: 500 }
    );
  }
}