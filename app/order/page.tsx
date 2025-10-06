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
  expired: boolean;
}

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'continue' | 'refund'>('continue');

  useEffect(() => {
    // Demo data based on the exact image content
    const demoOrder: OrderData = {
      id: 'PEZS2Q',
      fromCurrency: 'BTC',
      toCurrency: 'USDT',
      fromAmount: 0.00807625,
      toAmount: 1003.348,
      toAddress: 'TQDz3Nze6yIETZA6qdqMm6QmuQxzzo3qa',
      type: 'float',
      status: 'expired',
      timestamp: '10/06/2025 7:37 PM',
      fromAddress: 'bc1qrvh7l7dfjqgunnxxxjlfae9ph5ggqddor',
      timeRemaining: 0,
      expired: true
    };
    setOrder(demoOrder);
  }, [orderId]);

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-white text-xl">Loading order...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="bg-[#1e293b] border-b border-[#334155]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-white">FIXED FLOAT</h1>
              <nav className="hidden md:flex space-x-6 text-sm">
                <a href="#" className="text-[#94a3b8] hover:text-white transition-colors">About</a>
                <a href="#" className="text-[#94a3b8] hover:text-white transition-colors">Blog</a>
                <a href="#" className="text-[#94a3b8] hover:text-white transition-colors">FAQ</a>
                <a href="#" className="text-[#94a3b8] hover:text-white transition-colors">API</a>
                <a href="#" className="text-[#94a3b8] hover:text-white transition-colors">Support</a>
              </nav>
            </div>
            <div className="text-sm">
              <span className="text-[#94a3b8]">Account</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Not centered, aligned to left like original */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="flex-1">
            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* You Send */}
              <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#94a3b8] text-sm font-medium">YOU SEND</span>
                  <span className="text-white text-sm font-medium">{order.fromCurrency}</span>
                </div>
                <p className="text-3xl font-bold text-white mb-4">{order.fromAmount.toFixed(8)} {order.fromCurrency}</p>
                <div className="bg-[#0f172a] rounded p-3 border border-[#334155]">
                  <p className="text-sm font-mono text-[#cbd5e1] break-all">{order.fromAddress}</p>
                </div>
              </div>

              {/* You Receive */}
              <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#94a3b8] text-sm font-medium">YOU RECEIVE</span>
                  <span className="text-white text-sm font-medium">{order.toCurrency}</span>
                </div>
                <p className="text-3xl font-bold text-white mb-4">{order.toAmount.toFixed(3)} {order.toCurrency}™</p>
                <div className="bg-[#0f172a] rounded p-3 border border-[#334155]">
                  <p className="text-sm font-mono text-[#cbd5e1] break-all">{order.toAddress}</p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155] mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Order ID</h3>
                  <p className="text-2xl font-bold text-white">{order.id}</p>
                </div>
                <div>
                  <h3 className="text-[#94a3b8] text-sm mb-1">Time remaining</h3>
                  <p className="text-lg font-semibold text-red-400">Order expired</p>
                </div>
                <div>
                  <h3 className="text-[#94a3b8] text-sm mb-1">Order type</h3>
                  <p className="text-lg font-semibold text-white capitalize">{order.type} rate</p>
                </div>
              </div>
              <div className="mb-2">
                <h3 className="text-[#94a3b8] text-sm mb-1">Creation Time</h3>
                <p className="text-lg font-semibold text-white">{order.timestamp}</p>
              </div>
            </div>

            {/* Send Instructions */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155] mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Send {order.fromAmount.toFixed(8)} {order.fromCurrency} to the address:
              </h3>
              <div className="bg-[#0f172a] rounded p-4 border border-[#334155] mb-4">
                <p className="text-sm font-mono text-white break-all">{order.fromAddress}</p>
              </div>
              <button
                onClick={() => handleCopyAddress(order.fromAddress)}
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {isCopied ? 'Address Copied!' : 'Copy Address'}
              </button>
              <p className="text-[#94a3b8] text-sm text-center mt-3">
                The exchange rate will be fixed after receiving 1 network confirmations:
              </p>
            </div>

            {/* Receiving Address */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155] mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Receiving address {order.toCurrency}</h3>
              <div className="bg-[#0f172a] rounded p-4 border border-[#334155]">
                <p className="text-sm font-mono text-white break-all">{order.toAddress}</p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155] mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                1. I sent funds for exchange, but my order has expired. What should I do?
              </h3>
              <p className="text-[#94a3b8] mb-6">
                We have not received your transaction yet, but you can choose what to do if funds arrive at this address within 24 hours. Pick one of the following:
              </p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start space-x-3 p-4 border border-[#334155] rounded-lg hover:bg-[#334155]/30 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="expiredOption"
                    value="continue"
                    checked={selectedOption === 'continue'}
                    onChange={(e) => setSelectedOption(e.target.value as 'continue')}
                    className="w-5 h-5 text-[#3b82f6] bg-[#1e293b] border-[#475569] focus:ring-[#3b82f6] mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-white">Continue my exchange</span>
                    <span className="text-[#94a3b8] text-sm block">(at the current market rate)</span>
                  </div>
                </label>
                
                <label className="flex items-start space-x-3 p-4 border border-[#334155] rounded-lg hover:bg-[#334155]/30 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="expiredOption"
                    value="refund"
                    checked={selectedOption === 'refund'}
                    onChange={(e) => setSelectedOption(e.target.value as 'refund')}
                    className="w-5 h-5 text-[#3b82f6] bg-[#1e293b] border-[#475569] focus:ring-[#3b82f6] mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-white">Make a refund of the amount sent for exchange minus the network fee</span>
                  </div>
                </label>
              </div>

              <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Continue the exchange
              </button>

              {/* Progress Steps */}
              <div className="mt-8 flex justify-between items-center relative">
                <div className="flex flex-col items-center text-center z-10">
                  <div className="w-3 h-3 bg-[#3b82f6] rounded-full mb-2"></div>
                  <span className="text-xs text-[#94a3b8]">Awaiting deposit</span>
                </div>
                <div className="flex flex-col items-center text-center z-10">
                  <div className="w-3 h-3 bg-[#475569] rounded-full mb-2"></div>
                  <span className="text-xs text-[#94a3b8]">Awaiting confirmations</span>
                </div>
                <div className="flex flex-col items-center text-center z-10">
                  <div className="w-3 h-3 bg-[#475569] rounded-full mb-2"></div>
                  <span className="text-xs text-[#94a3b8]">Perform exchange</span>
                </div>
                <div className="flex flex-col items-center text-center z-10">
                  <div className="w-3 h-3 bg-[#475569] rounded-full mb-2"></div>
                  <span className="text-xs text-[#94a3b8]">Done</span>
                </div>
                <div className="absolute top-1.5 left-8 right-8 h-0.5 bg-[#475569] -z-10"></div>
              </div>
            </div>

            {/* Information Section */}
            <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155] mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">What do you need to know?</h3>
              
              <div className="space-y-4 text-[#94a3b8] text-sm">
                <p>• You only need 1 confirmation of the Bitcoin blockchain for the exchange.</p>
                <p>• Bitcoin transaction confirmation speed depends on the level of blockchain network congestion, more in our article.</p>
                <p>• We use segwit Bitcoin addresses for faster and cheaper transactions, if your wallet does.</p>
              </div>

              {/* Additional Info */}
              <div className="mt-6 space-y-4 text-[#94a3b8] text-sm">
                <p>• If the amount of the transaction you sent differs from the initial amount specified in the order with a float rate, the order will be automatically recalculated.</p>
                <p>• If your transaction is received after the expiration of the order, but within 24 hours, then this transaction will be automatically displayed in the order. You will be able to continue the order yourself or make a refund.</p>
              </div>

              {/* Notifications */}
              <div className="mt-6 p-4 bg-[#1e40af]/20 rounded-lg border border-[#1e40af]">
                <h4 className="text-[#60a5fa] font-semibold mb-2">Order status notifications</h4>
                <p className="text-[#94a3b8] text-sm">
                  You have subscribed to notifications of changes to this order; a notification has been sent to your email{' '}
                  <span className="text-white">areebakhan2k22@gmail.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - QR Code */}
          <div className="lg:w-80">
            <div className="bg-[#1e293b] rounded-lg p-6 border border-[#334155] sticky top-8">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Scan QR Code</h3>
              
              {/* QR Code Placeholder */}
              <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-sm text-center">
                    QR Code<br/>Placeholder
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-[#94a3b8] text-sm mb-2">Send exactly:</p>
                <p className="text-xl font-bold text-white mb-4">{order.fromAmount.toFixed(8)} {order.fromCurrency}</p>
                
                <div className="bg-[#0f172a] rounded p-3 border border-[#334155] mb-4">
                  <p className="text-xs font-mono text-[#cbd5e1] break-all text-center">{order.fromAddress}</p>
                </div>
                
                <button
                  onClick={() => handleCopyAddress(order.fromAddress)}
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {isCopied ? 'Copied!' : 'Copy Address'}
                </button>
              </div>

              {/* Additional Info in Sidebar */}
              <div className="mt-6 p-4 bg-[#1e40af]/10 rounded-lg border border-[#1e40af]/30">
                <h4 className="text-[#60a5fa] font-semibold mb-2 text-sm">Important</h4>
                <ul className="text-[#94a3b8] text-xs space-y-2">
                  <li>• Send only {order.fromCurrency} to this address</li>
                  <li>• Minimum deposit: 0.0001 BTC</li>
                  <li>• Network fee: 0.0001 BTC</li>
                  <li>• Expected arrival: 10-30 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#334155] pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Fixed-Float</h4>
              <div className="space-y-2 text-[#94a3b8] text-sm">
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Our brand</a>
                <a href="#" className="block hover:text-white transition-colors">Affiliate program</a>
                <a href="#" className="block hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors">Affiliate Program Terms</a>
                <a href="#" className="block hover:text-white transition-colors">API Terms of Use</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Popular</h4>
              <div className="space-y-2 text-[#94a3b8] text-sm">
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">XMR to BTC</a>
                <a href="#" className="block hover:text-white transition-colors">BTC to XMR</a>
                <a href="#" className="block hover:text-white transition-colors">ETH to XMR</a>
                <a href="#" className="block hover:text-white transition-colors">ETH to BTC</a>
                <a href="#" className="block hover:text-white transition-colors">USDT(TRX) to USDT(ETH)</a>
                <a href="#" className="block hover:text-white transition-colors">USDT(ETH) to USDT(TRX)</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-[#94a3b8] text-sm">
                <a href="#" className="block hover:text-white transition-colors">FAQ</a>
                <a href="#" className="block hover:text-white transition-colors">Support</a>
                <a href="#" className="block hover:text-white transition-colors">API</a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#334155] text-center text-[#94a3b8] text-sm">
            <p>© 2018-2025 FixedFloat. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}