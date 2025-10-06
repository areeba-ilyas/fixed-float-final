"use client";
import React from 'react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0B0E1A] py-8">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Blog</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              Welcome to our blog! Here you'll find the latest updates, news, and insights about cryptocurrency trading and our platform.
            </p>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              {/* Blog Post 1 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Understanding Cryptocurrency Exchange Commissions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Learn how exchange commissions work and why they're important for maintaining a sustainable trading platform.
                </p>
                <span className="text-sm text-blue-600 dark:text-blue-400">Read More →</span>
              </div>

              {/* Blog Post 2 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  The Future of Digital Asset Trading
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explore the latest trends and innovations shaping the future of cryptocurrency exchanges.
                </p>
                <span className="text-sm text-blue-600 dark:text-blue-400">Read More →</span>
              </div>

              {/* Blog Post 3 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  Security Best Practices for Crypto Traders
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Essential security tips to protect your digital assets while trading on various platforms.
                </p>
                <span className="text-sm text-blue-600 dark:text-blue-400">Read More →</span>
              </div>

              {/* Blog Post 4 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  How Our 2% Commission Benefits You
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Discover how our transparent commission structure helps us provide better services and maintain platform security.
                </p>
                <span className="text-sm text-blue-600 dark:text-blue-400">Read More →</span>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                More articles coming soon. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}