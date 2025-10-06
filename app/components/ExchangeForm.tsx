"use client";
import { useState, useEffect } from 'react';

export default function ExchangeForm() {
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USDT');
  const [amount, setAmount] = useState('0.008166');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState('fixed');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [rateInfo, setRateInfo] = useState<any>(null);

  // Real-time rate calculation
  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      calculateRate();
    }
  }, [fromCurrency, toCurrency, amount, orderType]);

  const calculateRate = async () => {
    try {
      const response = await fetch('/api/exchange/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCurrency,
          toCurrency,
          amount: parseFloat(amount),
          orderType
        }),
      });

      const data = await response.json();
      if (data.success) {
        setRateInfo(data);
      }
    } catch (error) {
      console.error('Rate calculation error:', error);
    }
  };

  const handleFirstExchangeClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // ✅ FIXEDFLOAT STYLE: Pehle address input show karo
    setShowAddressInput(true);
    setError('');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleFinalExchange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!address.trim()) {
      setError('Please enter your destination address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/exchange/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCurrency,
          toCurrency,
          amount: parseFloat(amount),
          address,
          orderType,
          rate: rateInfo?.rate,
          expectedAmount: rateInfo?.expectedAmount
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = `/order/${data.order.id}`;
      } else {
        setError(data.error || 'Exchange creation failed');
      }

    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Instant Exchange
      </h2>

      <form onSubmit={showAddressInput ? handleFinalExchange : handleFirstExchangeClick} className="space-y-6">
        {/* Send Section */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Send
          </label>
          <div className="flex justify-between items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl font-bold text-gray-900 dark:text-white w-32 border-none focus:outline-none"
              step="0.000001"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="bg-transparent border-none text-gray-900 dark:text-white font-semibold focus:outline-none"
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="AAVEETH">AAVEETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>

        {/* Exchange Rate Display */}
        {rateInfo && (
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p>1 {fromCurrency} = {rateInfo.rate} {toCurrency}</p>
            <p className="text-green-600 font-semibold">
              ${(parseFloat(amount) * 45000).toFixed(2)}
            </p>
          </div>
        )}

        {/* Receive Section */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Receive
          </label>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {rateInfo ? rateInfo.expectedAmount : '0.00'}
            </span>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="bg-transparent border-none text-gray-900 dark:text-white font-semibold focus:outline-none"
            >
              <option value="USDT">USDT</option>
              <option value="ADA">ADA</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Order type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex flex-col p-3 border rounded-lg cursor-pointer transition-all ${
              orderType === 'fixed' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}>
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  name="orderType"
                  value="fixed"
                  checked={orderType === 'fixed'}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  Fixed rate
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                (1.0%)
              </span>
            </label>
            
            <label className={`flex flex-col p-3 border rounded-lg cursor-pointer transition-all ${
              orderType === 'float' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}>
              <div className="flex items-center mb-1">
                <input
                  type="radio"
                  name="orderType"
                  value="float"
                  checked={orderType === 'float'}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  Float rate
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">
                (0.5%)
              </span>
            </label>
          </div>
        </div>

        {/* ✅ DESTINATION ADDRESS INPUT - Only shows after first click */}
        {showAddressInput && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 animate-fadeIn">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Destination
              </h3>
              <div className="mb-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {toCurrency === 'USDT' ? 'TRC20' : toCurrency}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Enter your {toCurrency === 'USDT' ? 'Tether (TRC20)' : toCurrency} address
              </p>
              <input
                type="text"
                placeholder={`Your ${toCurrency} address...`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm animate-fadeIn">
            {error}
          </div>
        )}

        {/* Exchange Now Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl"
        >
          {loading ? 'Processing...' : 'Exchange now'}
        </button>

        {/* Terms */}
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By using the site and creating an exchange, you agree to the FixedFloat's 
          Terms of Service and Privacy Policy.
        </p>
      </form>

      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}