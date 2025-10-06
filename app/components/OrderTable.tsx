"use client";
import { useState, useEffect } from 'react';

interface Order {
  id: string;
  email: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  commission: {
    rate: number;
    amount: number;
  };
  status: string;
  createdAt: string;
}

export default function OrderTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Order ID</th>
            <th className="border border-gray-300 p-3 text-left">Email</th>
            <th className="border border-gray-300 p-3 text-left">From</th>
            <th className="border border-gray-300 p-3 text-left">To</th>
            <th className="border border-gray-300 p-3 text-left">Commission</th>
            <th className="border border-gray-300 p-3 text-left">Status</th>
            <th className="border border-gray-300 p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{order.id}</td>
              <td className="border border-gray-300 p-3">{order.email}</td>
              <td className="border border-gray-300 p-3">
                {order.fromAmount} {order.fromCurrency}
              </td>
              <td className="border border-gray-300 p-3">
                {order.toAmount} {order.toCurrency}
              </td>
              <td className="border border-gray-300 p-3">
                {order.commission.amount.toFixed(8)} {order.fromCurrency}
                <br />
                <span className="text-sm text-gray-500">
                  ({order.commission.rate * 100}%)
                </span>
              </td>
              <td className="border border-gray-300 p-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  order.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="border border-gray-300 p-3">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
}