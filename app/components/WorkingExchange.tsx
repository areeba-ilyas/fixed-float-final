'use client';
import { useState } from 'react';

export default function ExchangeForm() {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const handleExchange = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!destinationAddress.trim()) {
      setAddressError(true);
      return;
    }

    setAddressError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert('Exchange successful! Order created.');
    }, 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          
          {/* Main Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Lightning cryptocurrency exchange
            </h1>

            {/* Send Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Send</label>
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                <div className="text-2xl font-bold mb-1 text-gray-900">0.00807625</div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Bitcoin</span>
                  <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-sm">BTC</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 BTC = 123,950.621 USDT</span>
                <span className="text-green-600 font-medium">$100,614</span>
              </div>
            </div>

            {/* Receive Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Receive</label>
              <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                <div className="text-2xl font-bold mb-1 text-gray-900">1,000.00</div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Tether</span>
                  <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded text-sm">USDT</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 USDT = 0.00000807 BTC</span>
                <span className="text-green-600 font-medium">$1.00</span>
              </div>
            </div>

            {/* Destination Address */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Destination</h2>
              <p className="text-gray-600 text-sm mb-3">Your Tether (TRC20) address</p>
              
              <input
                type="text"
                value={destinationAddress}
                onChange={(e) => {
                  setDestinationAddress(e.target.value);
                  setAddressError(false);
                }}
                placeholder="Enter USDT address"
                className={`w-full p-3 border-2 rounded-lg focus:outline-none transition-colors text-gray-900 ${
                  addressError 
                    ? 'border-red-500 bg-red-50 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500 bg-white'
                }`}
              />
              
              {addressError && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
                  <span>⚠️</span>
                  <span>Please enter destination address</span>
                </div>
              )}
            </div>

            {/* Order Type */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Order type</h2>
              <div className="flex gap-4">
                <button className="flex-1 p-4 border-2 border-gray-300 rounded-lg text-gray-700 bg-white hover:border-gray-400 transition-colors cursor-pointer">
                  <div className="font-medium">Fixed rate</div>
                  <div className="text-sm text-gray-500">(1.0%)</div>
                </button>
                <button className="flex-1 p-4 border-2 border-blue-500 bg-blue-50 rounded-lg text-blue-700 cursor-pointer">
                  <div className="font-medium">Float rate</div>
                  <div className="text-sm text-blue-600">(0.5%)</div>
                </button>
              </div>
            </div>

            {/* Exchange Button */}
            <button 
              onClick={handleExchange}
              disabled={isLoading}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all cursor-pointer ${
                isLoading 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                'Exchange now'
              )}
            </button>

            {/* Footer Terms */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By using the site and creating an exchange, you agree to the FixedFloat's Terms of Services and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}