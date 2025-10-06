"use client";
import { useState, useEffect } from 'react';

export default function ExchangePage() {
  const [fromAmount, setFromAmount] = useState('1.0');
  const [toAmount, setToAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('ETH');
  const [destination, setDestination] = useState('');
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [commission, setCommission] = useState(0);
  const [networkFee, setNetworkFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const exchangeRates: Record<string, { rate: number, fee: number }> = {
    'BTC-ETH': { rate: 15.5, fee: 0.0005 },
    'ETH-BTC': { rate: 0.0645, fee: 0.005 },
    'BTC-USDT': { rate: 45000, fee: 0.0001 },
    'USDT-BTC': { rate: 0.000022, fee: 1 },
    'ETH-USDT': { rate: 3000, fee: 0.003 },
    'USDT-ETH': { rate: 0.000333, fee: 0.8 },
    'BTC-ADA': { rate: 50000, fee: 0.0008 },
    'ADA-BTC': { rate: 0.00002, fee: 2 },
    'ETH-ADA': { rate: 3200, fee: 0.008 },
    'ADA-ETH': { rate: 0.000312, fee: 1.5 },
    'BTC-DOT': { rate: 30000, fee: 0.0006 },
    'DOT-BTC': { rate: 0.000033, fee: 0.5 },
    'BTC-SOL': { rate: 25000, fee: 0.0007 },
    'SOL-BTC': { rate: 0.00004, fee: 0.3 },
    'BTC-BNB': { rate: 20000, fee: 0.0004 },
    'BNB-BTC': { rate: 0.00005, fee: 0.1 },
    'BTC-XRP': { rate: 40000, fee: 0.0009 },
    'XRP-BTC': { rate: 0.000025, fee: 0.8 },
  };

  const calculateExchange = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      setToAmount('');
      setRate(0);
      setCommission(0);
      setNetworkFee(0);
      setFinalAmount(0);
      return;
    }

    const rateKey = `${fromCurrency}-${toCurrency}`;
    const exchangeData = exchangeRates[rateKey];
    
    if (exchangeData) {
      const amount = parseFloat(fromAmount);
      const serviceCommission = amount * 0.02;
      const networkFeeAmount = exchangeData.fee;
      const amountAfterFees = amount - serviceCommission;
      const convertedAmount = amountAfterFees * exchangeData.rate;
      const finalReceiveAmount = Math.max(0, convertedAmount - networkFeeAmount);

      setRate(exchangeData.rate);
      setCommission(serviceCommission);
      setNetworkFee(networkFeeAmount);
      setFinalAmount(finalReceiveAmount);
      setToAmount(finalReceiveAmount > 0 ? finalReceiveAmount.toFixed(6) : '0');
    } else {
      setToAmount('');
      setRate(0);
    }
  };

  useEffect(() => {
    calculateExchange();
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleExchange = async () => {
    if (!destination.trim()) {
      alert('Please enter destination address');
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter valid amount');
      return;
    }

    if (!toAmount || parseFloat(toAmount) <= 0) {
      alert('Please check exchange rate');
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const orderId = 'FF' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
      
      alert(`🚀 Exchange Started!\n\n📋 Order ID: ${orderId}\n💸 You send: ${fromAmount} ${fromCurrency}\n🎯 You receive: ${toAmount} ${toCurrency}\n📫 To: ${destination}\n\nTrack your order in "My Orders" section.`);
      
      setFromAmount('1.0');
      setDestination('');
      setToAmount('');
      
    } catch (error) {
      alert('❌ Exchange failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const popularCurrencies = ['BTC', 'ETH', 'USDT', 'ADA', 'DOT', 'SOL', 'BNB', 'XRP'];

  const generateTestAddress = () => {
    const prefixes: Record<string, string> = {
      'BTC': '1', 'ETH': '0x', 'USDT': '0x', 'ADA': 'addr1', 
      'DOT': '1', 'SOL': 'So1', 'BNB': 'bnb', 'XRP': 'r'
    };
    
    const prefix = prefixes[toCurrency] || '0x';
    const chars = '0123456789ABCDEFabcdef';
    let address = prefix;
    
    for (let i = 0; i < (prefix === '0x' ? 40 : 32); i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    
    setDestination(address);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount || '1.0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            💱 Fast Exchange
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Instant cryptocurrency exchange with best rates
          </p>
        </div>

        {/* Exchange Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          {/* Send Section */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                You send
              </label>
              <span className="text-xs text-gray-500">Balance: 0.00</span>
            </div>
            <div className="flex gap-3">
              <input 
                type="number" 
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="flex-1 p-3 border-0 bg-transparent text-gray-900 dark:text-white text-xl font-semibold focus:outline-none"
                placeholder="0.0"
                min="0"
                step="0.000001"
              />
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="p-3 border-0 bg-transparent text-gray-900 dark:text-white font-semibold focus:outline-none"
              >
                {popularCurrencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-2">
            <button 
              onClick={swapCurrencies}
              className="bg-blue-500 hover:bg-blue-600 rounded-full p-2 transition duration-200"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* Receive Section */}
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                You receive
              </label>
              <span className="text-xs text-gray-500">≈ ${(parseFloat(toAmount || '0') * 3000).toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={toAmount}
                readOnly
                className="flex-1 p-3 border-0 bg-transparent text-gray-900 dark:text-white text-xl font-semibold focus:outline-none"
                placeholder="0.0"
              />
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="p-3 border-0 bg-transparent text-gray-900 dark:text-white font-semibold focus:outline-none"
              >
                {popularCurrencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Exchange Rate */}
          {rate > 0 && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Exchange rate</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  1 {fromCurrency} = {rate.toFixed(6)} {toCurrency}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">Service fee (2%)</span>
                <span className="text-red-500">-{commission.toFixed(6)} {fromCurrency}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">Network fee</span>
                <span className="text-red-500">-{networkFee.toFixed(6)} {toCurrency}</span>
              </div>
            </div>
          )}

          {/* Destination Address */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Destination Address
              </label>
              <button 
                type="button"
                onClick={generateTestAddress}
                className="text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 px-2 py-1 rounded text-green-600 dark:text-green-400"
              >
                Generate Test
              </button>
            </div>
            <input 
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={`Your ${toCurrency} address`}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Exchange Button */}
          <button 
            onClick={handleExchange}
            disabled={loading || !destination || !toAmount || parseFloat(toAmount) <= 0}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition duration-200 flex items-center justify-center shadow-lg"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Exchange...
              </>
            ) : (
              'Exchange Now'
            )}
          </button>

          {/* Features */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-1">
                <span>⚡</span>
              </div>
              <span>Fast</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-1">
                <span>🔒</span>
              </div>
              <span>Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-1">
                <span>💎</span>
              </div>
              <span>Best Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}