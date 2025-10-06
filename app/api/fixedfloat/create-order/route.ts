import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Temporary solution - agar MongoDB setup nahi hai
let mockOrders: any[] = [];

// Mock database functions
const mockDB = {
  connect: async () => {
    console.log('📁 Using Mock Database');
    return true;
  },
  
  saveOrder: async (orderData: any) => {
    const order = {
      _id: Math.random().toString(36).substr(2, 9),
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockOrders.push(order);
    console.log('✅ Order saved to mock DB:', order.orderId);
    return order;
  }
};

const API_KEY = process.env.FIXEDFLOAT_API_KEY;
const API_SECRET = process.env.FIXEDFLOAT_API_SECRET;

function generateSignature(data: object) {
  if (!API_SECRET) {
    throw new Error('API_SECRET is not defined');
  }
  return crypto
    .createHmac("sha256", API_SECRET)
    .update(JSON.stringify(data))
    .digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    // Use mock database for now
    await mockDB.connect();
    
    const body = await req.json();
    const { fromCurrency, toCurrency, fromAmount, toAddress, email } = body;

    // Validate required fields
    if (!fromCurrency || !toCurrency || !fromAmount || !toAddress || !email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: fromCurrency, toCurrency, fromAmount, toAddress, email' 
      }, { status: 400 });
    }

    // Apply 2% commission
    const commission = 0.02;
    const commissionAmount = parseFloat(fromAmount) * commission;
    const finalFromAmount = (parseFloat(fromAmount) - commissionAmount).toFixed(8);

    // For development without FixedFloat API keys
    if (!API_KEY || !API_SECRET || API_KEY === 'dev_mock_key_for_now') {
      // Mock response for development
      const mockOrder = {
        orderId: `DPL${Date.now()}`,
        email: email,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        fromAmount: parseFloat(fromAmount),
        toAmount: parseFloat(fromAmount) * 0.98, // Mock conversion
        commissionRate: commission,
        commissionAmount: commissionAmount,
        finalFromAmount: parseFloat(finalFromAmount),
        destinationAddress: toAddress,
        fixedFloatOrderId: `FF${Date.now()}`,
        status: 'pending',
        createdAt: new Date()
      };

      // Save to mock database
      const order = await mockDB.saveOrder(mockOrder);

      return NextResponse.json({
        success: true,
        order: {
          id: order.orderId,
          fixedFloatId: order.fixedFloatOrderId,
          fromCurrency: order.fromCurrency,
          toCurrency: order.toCurrency,
          originalAmount: order.fromAmount,
          finalAmount: order.finalFromAmount,
          toAmount: order.toAmount,
          commission: {
            rate: order.commissionRate,
            amount: order.commissionAmount
          },
          status: order.status,
          destination: order.destinationAddress
        },
        message: "Development mode - Mock order created"
      });
    }

    // Real FixedFloat API call (when keys are available)
    const payload = {
      fromCurrency,
      toCurrency,
      fromAmount: finalFromAmount,
      toAddress,
    };

    const signature = generateSignature(payload);

    const res = await fetch("https://ff.io/api/v2/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY!,
        "X-API-SIGN": signature,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`FixedFloat API error: ${error}`);
    }

    const fixedFloatData = await res.json();

    // Save to mock database
    const order = await mockDB.saveOrder({
      orderId: `DPL${Date.now()}`,
      email: email,
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
      fromAmount: parseFloat(fromAmount),
      toAmount: fixedFloatData.toAmount || 0,
      commissionRate: commission,
      commissionAmount: commissionAmount,
      finalFromAmount: parseFloat(finalFromAmount),
      destinationAddress: toAddress,
      fixedFloatOrderId: fixedFloatData.id,
      status: fixedFloatData.status || 'pending',
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.orderId,
        fixedFloatId: order.fixedFloatOrderId,
        fromCurrency: order.fromCurrency,
        toCurrency: order.toCurrency,
        originalAmount: order.fromAmount,
        finalAmount: order.finalFromAmount,
        toAmount: order.toAmount,
        commission: {
          rate: order.commissionRate,
          amount: order.commissionAmount
        },
        status: order.status,
        destination: order.destinationAddress
      },
      fixedFloatResponse: fixedFloatData
    });
    
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}