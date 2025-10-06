"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  FaTwitter,
  FaInstagram,
  FaTelegramPlane,
  FaRedditAlien,
  FaMedium,
  FaStar,
} from "react-icons/fa"
import { PiSquaresFourFill } from "react-icons/pi" // for bc icon

export const Footer = () => {
  return (
    <footer className="bg-[#0C0D16] text-white pt-10 pb-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 border-b border-gray-700 pb-8">
          {/* Logo + Icons */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-white text-2xl font-bold">
              <span className="text-white">FIXED</span>
              <span className="text-orange-500">FLOAT</span>
            </div>
            <div className="flex gap-4 text-xl text-white/80">
              <FaTwitter />
              <FaInstagram />
              <FaTelegramPlane />
              <PiSquaresFourFill />
              <FaRedditAlien />
              <FaMedium />
              <FaStar />
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-23 w-full lg:w-auto">
            {/* Column 1 */}
            <div>
              <h4 className="text-gray-400 font-medium mb-3">FixedFloat</h4>
              <ul className="space-y-2 text-lg">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Our brand</Link></li>
                <li><Link href="#" className="hover:text-white">Affiliate program</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Affiliate Program Terms</Link></li>
                <li><Link href="#" className="hover:text-white">API Terms of Use</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-gray-400 font-medium mb-3">Popular</h4>
              <ul className="space-y-2 text-lg">
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">XMR to BTC</Link></li>
                <li><Link href="#" className="hover:text-white">BTC to XMR</Link></li>
                <li><Link href="#" className="hover:text-white">ETH to XMR</Link></li>
                <li><Link href="#" className="hover:text-white">ETH to BTC</Link></li>
                <li><Link href="#" className="hover:text-white">USDT(TRX) to USDT(ETH)</Link></li>
                <li><Link href="#" className="hover:text-white">USDT(ETH) to USDT(TRX)</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-gray-400 font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-lg">
                <li><Link href="#" className="hover:text-white">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white">Support</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-6 text-center text-sm text-gray-400">
          © 2018–2025 FixedFloat. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
