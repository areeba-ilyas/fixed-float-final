"use client";
import { useState } from 'react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "How does Fixed Float work?",
      answer: "Fixed Float is an instant cryptocurrency exchange service. You select the currencies you want to exchange, enter the amount and recipient address, and we handle the rest. The process is automated and typically completes within 5-30 minutes."
    },
    {
      question: "What cryptocurrencies do you support?",
      answer: "We support 150+ cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Cardano (ADA), Polkadot (DOT), Solana (SOL), Binance Coin (BNB), Ripple (XRP), and many more."
    },
    {
      question: "What are your fees?",
      answer: "We charge a 2% service fee on all exchanges. There may be additional network fees depending on the blockchain congestion. All fees are clearly displayed before you confirm any transaction."
    },
    {
      question: "How long do exchanges take?",
      answer: "Most exchanges are completed within 5-30 minutes. The time can vary depending on network congestion and the specific cryptocurrencies being exchanged."
    },
    {
      question: "Is Fixed Float safe to use?",
      answer: "Yes, we implement industry-standard security measures including SSL encryption, cold storage for funds, and two-factor authentication. We never store your private keys."
    },
    {
      question: "Do I need to create an account?",
      answer: "No, you can make instant exchanges without registration. However, creating an account gives you access to additional features like order history, lower fees, and priority support."
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">FIXED FLOAT</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/signin" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Sign in</a>
              <a href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">Sign up</a>
            </div>
          </div>
        </div>
      </nav>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center">
          Find answers to common questions about our service
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <svg 
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Our support team is here to help you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/support" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Contact Support
              </a>
              <a 
                href="/contact" 
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}