// components/ExchangeForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExchangeForm() {
  const router = useRouter();
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [rateType, setRateType] = useState<'fixed' | 'float'>('fixed');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // FixedFloat جیسی colors اور styling
  const fetchExchangeRate = async (from: string, to: string, type: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/fixedfloat/coin-rate?type=${type}`);
      const data = await response.json();
      
      const rate = data[from]?.[to] || 0;
      setExchangeRate(rate);
      
      if (amount && !isNaN(parseFloat(amount))) {
        const calculated = (parseFloat(amount) * rate).toFixed(6);
        setCalculatedAmount(calculated);
      }
    } catch (error) {
      console.error('Error fetching rate:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate(fromCurrency, toCurrency, rateType);
    }
  }, [fromCurrency, toCurrency, rateType]);

  useEffect(() => {
    if (amount && exchangeRate > 0) {
      const calculated = (parseFloat(amount) * exchangeRate).toFixed(6);
      setCalculatedAmount(calculated);
    } else {
      setCalculatedAmount('0.00');
    }
  }, [amount, exchangeRate]);

  const handleExchange = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    try {
      const response = await fetch('/api/fixedfloat/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromCurrency,
          toCurrency,
          amount: parseFloat(amount),
          rateType
        })
      });
      
      const orderData = await response.json();
      
      if (orderData.success) {
        // Success par exchange page par redirect karen
        router.push('/exchange');
      } else {
        alert('Failed to create order: ' + orderData.error);
      }
    } catch (error) {
      alert('Error creating order');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-white text-center">Instant Exchange</h3>
      
      {/* Current Rate Display - FixedFloat jaisa style */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-400">Current Rate ({rateType})</p>
        <p className="text-lg font-semibold text-white">
          {loading ? 'Loading...' : `1 ${fromCurrency} = ${exchangeRate.toFixed(6)} ${toCurrency}`}
        </p>
      </div>
      
      {/* From Currency - Dark theme */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-300">You Send</label>
        <div className="flex rounded-lg overflow-hidden border border-gray-600 bg-gray-800">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 p-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select 
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="p-3 bg-gray-700 text-white border-l border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
            <option value="ADA">ADA</option>
            <option value="LTC">LTC</option>
          </select>
        </div>
      </div>

      {/* To Currency - Dark theme */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-300">You Get</label>
        <div className="flex rounded-lg overflow-hidden border border-gray-600 bg-gray-800">
          <input
            type="text"
            readOnly
            value={loading ? 'Calculating...' : calculatedAmount}
            className="flex-1 p-3 bg-gray-800 text-white focus:outline-none"
          />
          <select 
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="p-3 bg-gray-700 text-white border-l border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USDT">USDT</option>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="ADA">ADA</option>
            <option value="LTC">LTC</option>
          </select>
        </div>
      </div>

      {/* Rate Type - FixedFloat jaisa design */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3 text-gray-300">Order Type</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setRateType('fixed')}
            className={`flex-1 p-3 rounded-lg font-medium transition-all border ${
              rateType === 'fixed' 
                ? 'bg-green-600 text-white border-green-500 shadow-lg' 
                : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
            }`}
          >
            Fixed Rate (1.0%)
          </button>
          <button
            type="button"
            onClick={() => setRateType('float')}
            className={`flex-1 p-3 rounded-lg font-medium transition-all border ${
              rateType === 'float' 
                ? 'bg-blue-600 text-white border-blue-500 shadow-lg' 
                : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
            }`}
          >
            Float Rate (0.5%)
          </button>
        </div>
      </div>

      {/* Exchange Now Button - FixedFloat jaisa prominent button */}
      <button 
        onClick={handleExchange}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transform hover:scale-105 duration-200"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          'Exchange Now'
        )}
      </button>

      {/* Additional Info - FixedFloat jaisa */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          By clicking Exchange Now, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}