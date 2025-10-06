import { section } from "framer-motion/client"
import { NewsCarousel } from "../../components/ui/news-carousel"

const newsItems = [
  {
    title: "News of cryptocurrencies of the 5 week of July 2025",
    desc: "Ethereum Community Celebrates 10 Years, Polygon Network Outage, BNB Surges $852.",
    img: "/assets/images/thumb/thumb1.jpg",
    link: "/blog/news/weekly-2025-08-02",
  },
  {
    title: "News of cryptocurrencies of the 4th week of July 2025",
    desc: "Dogecoin up 40% in a week, BNB tops $804 for the first time, Solana increases block limit by 20%.",
    img: "/assets/images/thumb/thumb2.jpg",
    link: "/blog/news/weekly-2025-07-26",
  },
  {
    title: "News of cryptocurrencies of the 3rd week of July 2025",
    desc: "New BTC All-Time High – $123,000, ETH Reaches $3,400, BNB Chain Publishes Roadmap Until 2026.",
    img: "/assets/images/thumb/thumb3.jpg",
    link: "/blog/news/weekly-2025-07-19",
  },
  {
    title: "News of cryptocurrencies of the 2nd week of July 2025",
    desc: "Bitcoin volatility and activity fall, Ethereum plans to switch to ZK, POL rate rises by 8%.",
    img: "/assets/images/thumb/thumb4.jpg",
    link: "/blog/news/weekly-2025-07-12",
  },
  {
    title: "News of cryptocurrencies of the 1st week of July 2025",
    desc: "BNB Chain hard fork, Tether launches BTC mining in Brazil, Ethereum Community Foundation created.",
    img: "/assets/images/thumb/thumb5.jpg",
    link: "/blog/news/weekly-2025-07-05",
  },
]

export default function NewsSection() {
  return (
    <section className="w-full max-w-screen-2xl bg-[#0C0D16] mx-auto flex flex-col ">
      <h2 className="text-[#CDE7FF] text-6xl mx-28  font-bold mb-8">News</h2>
      <NewsCarousel newsItems={newsItems} />
    </section>
  )
  
 
}
