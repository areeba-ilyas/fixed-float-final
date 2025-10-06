"use client";
import { useState } from 'react';
import { Search, Clock, CheckCircle, XCircle, Truck, Copy } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const trackOrder = async () => {
    if (!orderId || !email) {
      setError('Please enter both Order ID and Email');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/orders/track?id=${orderId}&email=${email}`);
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.error || 'Order not found');
        setOrder(null);
      }
    } catch (error) {
      setError('Failed to track order');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const statusSteps = [
    { name: 'Order Created', status: 'created', icon: CheckCircle },
    { name: 'Awaiting Deposit', status: 'pending', icon: Clock },
    { name: 'Exchanging', status: 'exchanging', icon: Truck },
    { name: 'Completed', status: 'completed', icon: CheckCircle }
  ];

  const getCurrentStep = (status: string) => {
    switch (status) {
      case 'created': return 0;
      case 'pending': return 1;
      case 'exchanging': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const currentStep = order ? getCurrentStep(order.status) : -1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 py-8">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Track Your Order
        </h1>

        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Order ID</label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your Order ID"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <button
              onClick={trackOrder}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </div>
        </div>

        {/* Order Details */}
        {order && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold mb-3">Order Details</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                  <span className="font-mono flex items-center">
                    {order.id}
                    <button onClick={() => copyToClipboard(order.id)} className="ml-2 text-blue-600">
                      <Copy className="h-4 w-4" />
                    </button>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">From:</span>
                  <span className="font-semibold">{order.fromAmount} {order.fromCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">To:</span>
                  <span className="font-semibold">{order.toAmount} {order.toCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Commission:</span>
                  <span className="text-red-600">{order.commission.rate * 100}%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold mb-3">Status & Timeline</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created:</span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Destination:</span>
                  <span className="font-mono text-sm truncate max-w-[150px]">
                    {order.destinationAddress}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Exchange Progress</h3>
              <div className="relative">
                <div className="flex justify-between mb-4">
                  {statusSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isCompleted = index <= currentStep;
                    const isCurrent = index === currentStep;
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          isCompleted 
                            ? 'bg-green-500 border-green-500' 
                            : 'bg-gray-200 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                        } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}>
                          <StepIcon className={`h-6 w-6 ${
                            isCompleted ? 'text-white' : 'text-gray-400'
                          }`} />
                        </div>
                        <span className={`text-sm mt-2 text-center ${
                          isCompleted ? 'text-green-600 font-semibold' : 'text-gray-500'
                        }`}>
                          {step.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
                  <div 
                    className="h-1 bg-green-500 transition-all duration-500"
                    style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}