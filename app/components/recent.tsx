"use client";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaArrowRightLong, FaPlus, FaRegClock } from "react-icons/fa6";

const transactions = [
  {
    time: "a few seconds ago",
    from: "40 USDT",
    fromIcon: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
    to: "LTC",
    toIcon: "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png",
    duration: "4 sec",
  },
  {
    time: "a few seconds ago",
    from: "2527 USDT",
    fromIcon: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
    to: "USDC",
    toIcon: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png",
    duration: "4 sec",
  },
  {
    time: "a minute ago",
    from: "3.9 BNB",
    fromIcon: "https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970",
    to: "ETH",
    toIcon: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
    duration: "5 sec",
  },
  {
    time: "a minute ago",
    from: "242.083 USDT",
    fromIcon: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
    to: "BTC",
    toIcon: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
    duration: "38 sec",
  },
  {
    time: "a minute ago",
    from: "0.15 SOL",
    fromIcon: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
    to: "ETH",
    toIcon: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
    duration: "4 sec",
  },
  {
    time: "a minute ago",
    from: "0.05 LTC",
    fromIcon: "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png",
    to: "TRX",
    toIcon: "https://assets.coingecko.com/coins/images/1094/thumb/tron-logo.png",
    duration: "25 sec",
  },
  {
    time: "a minute ago",
    from: "1.05190 LTC",
    fromIcon: "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png",
    to: "BTC",
    toIcon: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
    duration: "25 sec",
  },
  {
    time: "a minute ago",
    from: "1746 USDT",
    fromIcon: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
    to: "USDC",
    toIcon: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png",
    duration: "2 sec",
  },
  {
    time: "2 minutes ago",
    from: "1.25758 LTC",
    fromIcon: "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png",
    to: "USDT",
    toIcon: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
    duration: "4 sec",
  },
  {
    time: "2 minutes ago",
    from: "3.75 LTC",
    fromIcon: "https://assets.coingecko.com/coins/images/2/thumb/litecoin.png",
    to: "USDT",
    toIcon: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png",
    duration: "8 sec",
  },
];

const faqs = [
  {
    question: "How can I track my order?",
    answer: "You can track your order using the unique order ID provided after creating your swap. Just visit our Order Status page and enter the ID to see real-time progress.",
  },
  {
    question: "Why can I trust you?",
    answer:
      "No registration and no need to share your personal details. We don't hold your funds, all exchanges take place instantly in fully automatic mode.",
  },
  {
    question: "Do you have hidden fees?",
    answer:
      "Honesty is our main priority, so we commit to full transparency and make all the fees clear:\n\n• 1% if you opt for a fixed rate\n• 0.5% if you opt for a floating rate",
  },
];

export default function RecentTransactions() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative py-50 bg-[#0C0D16] overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/images/background/recent.svg"
        alt="Background"
        fill
        className="object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Transactions Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-[#D6ECFF] mb-8">
          Recent transactions
        </h2>

        <div className="space-y-2 mb-16">
         {transactions.map((tx, i) => (
  <div key={i} className="bg-[#21284B] rounded-xl text-white">
    {/* --- Mobile (< md) EXACT LIKE IMAGE --- */}
    <div className="md:hidden px-4 py-3">
      {/* row 1: time (left) + duration (right) */}
      <div className="flex items-center justify-between text-sm leading-none text-[#D6ECFF]/80">
        <span>{tx.time}</span>
        <span className="inline-flex items-center gap-1">
          <FaRegClock className="text-base" />
          {tx.duration}
        </span>
      </div>

      {/* thin divider */}
      <div className="h-px bg-[#2A335C] my-3" />

      {/* row 2: centered transfer */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <img src={tx.fromIcon} alt={tx.from} className="w-5 h-5 rounded-full" />
          <span className="text-base">{tx.from}</span>
        </div>
        <FaArrowRightLong className="text-white text-sm font-bold" />
        <div className="flex items-center gap-2">
          <img src={tx.toIcon} alt={tx.to} className="w-5 h-5 rounded-full" />
          <span className="text-base">{tx.to}</span>
        </div>
      </div>
    </div>

    {/* --- Desktop (md+) keep your 3-column layout --- */}
    <div className="hidden md:flex justify-between items-center px-4 py-3">
      <div className="w-[30%] text-left text-base text-[#D6ECFF]/80">
        {tx.time}
      </div>

      <div className="w-[40%] flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <img src={tx.fromIcon} alt={tx.from} className="w-5 h-5 rounded-full" />
          <span>{tx.from}</span>
        </div>
        <FaArrowRightLong className="text-white text-sm font-bold" />
        <div className="flex items-center gap-2">
          <img src={tx.toIcon} alt={tx.to} className="w-5 h-5 rounded-full" />
          <span>{tx.to}</span>
        </div>
      </div>

      <div className="w-[30%] flex items-center justify-end gap-1">
        <FaRegClock className="text-white text-lg" />
        <span>{tx.duration}</span>
      </div>
    </div>
  </div>
))}

        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-28">
        <div className="text-white space-y-6">
          <h2 className="text-[#D6ECFF] text-4xl md:text-6xl font-bold">FAQ</h2>

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-gray-700 pt-6 cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <span className="text-5xl font-light text-white">{index + 1}</span>
                  <span className="text-xl md:text-2xl">{faq.question}</span>
                </div>
                <div className="bg-[#0E446C] rounded-full w-10 h-10 flex items-center justify-center">
                  <FaPlus
                    className={`text-white text-lg transition-transform duration-300 ${
                      activeFaq === index ? "rotate-45" : ""
                    }`}
                  />
                </div>
              </div>

              <div
  className={`ml-20 overflow-hidden transition-all duration-500 ease-in-out ${
    activeFaq === index ? "max-h-[500px] mt-4 opacity-100" : "max-h-0 opacity-0"
  }`}
>
  <div className="text-gray-300 whitespace-pre-line text-base md:text-lg">
    {faq.answer}
  </div>
</div>

            </div>
          ))}

          {/* Bottom link */}
          <div className="flex justify-end pt-8">
            <a
              href="/faq"
              className="flex items-center gap-2 text-[#00A3FF] hover:underline text-lg"
            >
              Go to page FAQ
              <div className="bg-[#0E446C] rounded-full w-10 h-10 flex items-center justify-center">
                <FaArrowRight className="text-white" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
