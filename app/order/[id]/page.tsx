"use client";
import { useParams } from 'next/navigation';

export default function OrderPage() {
  const params = useParams();
  const orderId = params.id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Order Created Successfully! 🎉
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Order Created
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your exchange order has been created successfully.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">Order ID:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white">{orderId}</p>
            </div>
            <div className="flex space-x-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                View Order Details
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-medium"
              >
                New Exchange
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}