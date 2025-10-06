import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatCrypto(amount: number, decimals: number = 6): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(amount)
}

export function generateOrderId(): string {
  return 'FF' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validateCryptoAddress(address: string, currency: string): boolean {
  if (!address || address.length < 10) return false
  
  switch (currency) {
    case 'BTC':
      return address.startsWith('1') || address.startsWith('3') || address.startsWith('bc1')
    case 'ETH':
    case 'USDT':
      return address.startsWith('0x') && address.length === 42
    case 'ADA':
      return address.startsWith('addr1')
    case 'DOT':
      return address.startsWith('1')
    case 'SOL':
      return address.startsWith('So1') || address.startsWith('So2')
    case 'BNB':
      return address.startsWith('bnb')
    case 'XRP':
      return address.startsWith('r')
    default:
      return address.length >= 10
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function calculateExchange(
  fromAmount: number, 
  fromCurrency: string, 
  toCurrency: string
): { rate: number; toAmount: number; commission: number; networkFee: number } {
  const rates: Record<string, number> = {
    'BTC-ETH': 15.5, 'ETH-BTC': 0.0645, 'BTC-USDT': 45000, 'USDT-BTC': 0.000022,
    'ETH-USDT': 3000, 'USDT-ETH': 0.000333, 'BTC-ADA': 50000, 'ADA-BTC': 0.00002,
    'ETH-ADA': 3200, 'ADA-ETH': 0.000312, 'BTC-DOT': 30000, 'DOT-BTC': 0.000033,
    'BTC-SOL': 25000, 'SOL-BTC': 0.00004, 'BTC-BNB': 20000, 'BNB-BTC': 0.00005,
    'BTC-XRP': 40000, 'XRP-BTC': 0.000025, 'ETH-DOT': 2000, 'DOT-ETH': 0.0005,
    'ETH-SOL': 1800, 'SOL-ETH': 0.00055, 'ETH-BNB': 1500, 'BNB-ETH': 0.00066,
    'ETH-XRP': 3500, 'XRP-ETH': 0.000285, 'USDT-ADA': 0.4, 'ADA-USDT': 2.5,
    'USDT-DOT': 0.3, 'DOT-USDT': 3.33, 'USDT-SOL': 0.25, 'SOL-USDT': 4.0,
    'USDT-BNB': 0.2, 'BNB-USDT': 5.0, 'USDT-XRP': 0.35, 'XRP-USDT': 2.85,
  }

  const fees: Record<string, number> = {
    'BTC-ETH': 0.0005, 'ETH-BTC': 0.005, 'BTC-USDT': 0.0001, 'USDT-BTC': 1,
    'ETH-USDT': 0.003, 'USDT-ETH': 0.8, 'BTC-ADA': 0.0008, 'ADA-BTC': 2,
    'ETH-ADA': 0.008, 'ADA-ETH': 1.5, 'BTC-DOT': 0.0006, 'DOT-BTC': 0.5,
    'BTC-SOL': 0.0007, 'SOL-BTC': 0.3, 'BTC-BNB': 0.0004, 'BNB-BTC': 0.1,
    'BTC-XRP': 0.0009, 'XRP-BTC': 0.8, 'ETH-DOT': 0.006, 'DOT-ETH': 0.4,
    'ETH-SOL': 0.007, 'SOL-ETH': 0.25, 'ETH-BNB': 0.004, 'BNB-ETH': 0.08,
    'ETH-XRP': 0.009, 'XRP-ETH': 0.7, 'USDT-ADA': 0.5, 'ADA-USDT': 1,
    'USDT-DOT': 0.4, 'DOT-USDT': 0.3, 'USDT-SOL': 0.3, 'SOL-USDT': 0.2,
    'USDT-BNB': 0.2, 'BNB-USDT': 0.05, 'USDT-XRP': 0.6, 'XRP-USDT': 0.6,
  }

  const rateKey = `${fromCurrency}-${toCurrency}`
  const rate = rates[rateKey] || 0
  const networkFee = fees[rateKey] || 0
  const commission = fromAmount * 0.02 // 2% commission
  const amountAfterCommission = fromAmount - commission
  const convertedAmount = amountAfterCommission * rate
  const toAmount = Math.max(0, convertedAmount - networkFee)

  return {
    rate,
    toAmount,
    commission,
    networkFee
  }
}