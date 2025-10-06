// components/FixedFloatExchange.tsx
'use client';
import { useState } from 'react';

export default function FixedFloatExchange() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('ETH');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-6">
        
        {/* From Currency */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-3">You send</label>
          <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-all">
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="w-full text-2xl font-bold border-none outline-none"
            />
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="mt-2 p-2 border rounded-lg"
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="mt-8">
          <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200">
            🔄
          </button>
        </div>

        {/* To Currency */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-3">You get</label>
          <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-500 transition-all">
            <input
              type="text"
              value={toAmount}
              readOnly
              placeholder="0.00"
              className="w-full text-2xl font-bold border-none outline-none bg-transparent"
            />
            <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="mt-2 p-2 border rounded-lg"
            >
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
        </div>

      </div>

      {/* Exchange Button */}
      <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg mt-6 hover:bg-blue-700">
        Exchange
      </button>
    </div>
  );
}