"use client"

import { useEffect, useState } from "react"

interface RateItem {
  from: string
  to: string
  in: string
  out: string
  amount: string
  tofee: string
  minamount: string
  maxamount: string
}

export default function RatesPage() {
  const [rates, setRates] = useState<RateItem[]>([])

  useEffect(() => {
    fetch("/api/fixedfloat/coin-rate")
      .then((res) => res.json())
      .then((data) => {
        if (data?.rates?.item) {
          const items = Array.isArray(data.rates.item) ? data.rates.item : [data.rates.item]
          setRates(items)
        }
      })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">FixedFloat Exchange Rates</h1>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">From</th>
            <th className="p-2">To</th>
            <th className="p-2">Rate (Out)</th>
            <th className="p-2">Reserve</th>
            <th className="p-2">Min</th>
            <th className="p-2">Max</th>
            <th className="p-2">Fee</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{item.from}</td>
              <td className="p-2">{item.to}</td>
              <td className="p-2">{item.out}</td>
              <td className="p-2">{item.amount}</td>
              <td className="p-2">{item.minamount}</td>
              <td className="p-2">{item.maxamount}</td>
              <td className="p-2">{item.tofee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
