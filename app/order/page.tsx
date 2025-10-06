// app/order/page.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface OrderData {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  toAddress: string;
  type: 'fixed' | 'float';
  status: string;
  timestamp: string;
  fromAddress: string;
  timeRemaining: number;
}

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  
  const [order, setOrder] = useState<OrderData | null>(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Get order data from localStorage
    const orderData = localStorage.getItem('currentOrder');
    if (orderData) {
      const parsedOrder: OrderData = JSON.parse(orderData);
      setOrder(parsedOrder);
      setTimeLeft(parsedOrder.timeRemaining);
    } else if (orderId) {
      // If no localStorage data but has orderId, redirect back
      router.push('/');
    }
  }, [orderId, router]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getCurrentDateTime = () => {
    return new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading order...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">FIXED FLOAT</h1>
            <nav className="hidden md:flex space-x-6 text-sm">
              <a href="#" className="hover:text-blue-400">About</a>
              <a href="#" className="hover:text-blue-400">Blog</a>
              <a href="#" className="hover:text-blue-400">FAQ</a>
              <a href="#" className="hover:text-blue-400">API</a>
              <a href="#" className="hover:text-blue-400">Support</a>
            </nav>
            <div className="text-sm">
              <span className="text-gray-400">Account</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Order Summary */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* You Send */}
            <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
              <h3 className="text-gray-400 text-sm mb-2">YOU SEND</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{order.fromAmount} {order.fromCurrency}</p>
                  <p className="text-gray-400 text-sm break-all mt-2">{order.fromAddress}</p>
                </div>
              </div>
            </div>

            {/* You Receive */}
            <div className="bg-gray-700 rounded-xl p-4 border border-gray-600">
              <h3 className="text-gray-400 text-sm mb-2">YOU RECEIVE</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{order.toAmount} {order.toCurrency}</p>
                  <p className="text-gray-400 text-sm break-all mt-2">{order.toAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
            <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-gray-400 text-sm">Time remaining</p>
                <p className="text-lg font-semibold text-green-400">{formatTime(timeLeft)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Order type</p>
                <p className="text-lg font-semibold capitalize">{order.type} rate</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Creation Time</p>
                <p className="text-lg font-semibold">{getCurrentDateTime()}</p>
              </div>
            </div>

            {/* Send Instructions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Send {order.fromAmount} {order.fromCurrency} to the address:
              </h3>
              <div className="bg-gray-600 rounded-lg p-4 border border-gray-500">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-mono break-all">{order.fromAddress}</p>
                  <button
                    onClick={() => handleCopyAddress(order.fromAddress)}
                    className="ml-4 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-xs whitespace-nowrap"
                  >
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                The exchange rate will be fixed after receiving 1 network confirmation.
              </p>
            </div>

            {/* Receiving Address */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Receiving address {order.toCurrency}</h3>
              <div className="bg-gray-600 rounded-lg p-4 border border-gray-500">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-mono break-all">{order.toAddress}</p>
                  <button
                    onClick={() => handleCopyAddress(order.toAddress)}
                    className="ml-4 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-xs whitespace-nowrap"
                  >
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">You will receive {order.toAmount} {order.toCurrency}</h3>
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <p className="text-sm font-mono break-all">{order.toAddress}</p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-2">Address</p>
              <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                <p className="text-sm font-mono break-all">{order.toAddress}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">With amount</p>
              <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
                <p className="text-sm">{order.toAmount} {order.toCurrency}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
          >
            Create New Exchange
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}