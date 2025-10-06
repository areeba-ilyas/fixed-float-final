"use client";
import { useState, useEffect } from 'react';

interface Stats {
  totalOrders: number;
  totalCommission: number;
}

export default function StatsCards() {
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, totalCommission: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Orders</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-lg border">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Commission</h3>
        <p className="text-3xl font-bold text-green-600">
          {stats.totalCommission.toFixed(8)} ETH
        </p>
      </div>
    </div>
  );
}