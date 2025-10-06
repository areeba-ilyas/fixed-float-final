"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"

interface Article {
  title: string
  desc: string
  date: string
  img: string
}
interface ArticleCarouselProps {
  articles: Article[]
}

export const ArticleCarousel: React.FC<ArticleCarouselProps> = ({ articles }) => {
  const css = `
  .ppp-swiper { width: 100%; padding-left: 3rem; }
  .ppp-swiper-wrapper { padding-right: 0px !important; }
  .ppp-swiper-slide { width: 400px !important; }

  .ppp-card {
    background-color: #141522;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .ppp-card-img { height: 240px; position: relative; }
  .ppp-card-content {
    padding: 1.5rem;
    display: flex; flex-direction: column; justify-content: space-between; height: 100%;
  }
  .ppp-card-title { font-size: 1.2rem; font-weight: 600; color: white; margin-bottom: 0.5rem; }
  .ppp-card-desc { font-size: 1rem; color: rgba(255,255,255,0.75); margin-bottom: 1rem; line-height: 1.6; }
  .ppp-card-date { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: auto; }

  .ppp-swiper-button-prev, .ppp-swiper-button-next { color: white; }

  /* ---------- Mobile tweaks ---------- */
  @media (max-width: 768px) {
    .ppp-swiper { padding-left: 1rem; }
    .ppp-swiper-slide { width: 86vw !important; }           /* full-ish width card */
    .ppp-card-img { height: 180px; }                        /* shorter image */
    .ppp-swiper-button-prev, .ppp-swiper-button-next { display: none; } /* swipe only */
  }

  /* tablets small */
  @media (min-width: 769px) and (max-width: 1024px) {
    .ppp-swiper { padding-left: 2rem; }
    .ppp-swiper-slide { width: 340px !important; }
    .ppp-card-img { height: 200px; }
  }
  `

  return (
    <section className="w-full bg-[#0C0D16] px-0 py-10">
      <style>{css}</style>

      {/* Title: smaller on mobile, large on md+; avoid huge left margin on phones */}
      <h2 className="text-4xl md:text-6xl font-bold text-[#CDE7FF] mb-6 pl-4 md:pl-16">
        Guides and tutorials
      </h2>

      <Swiper
        spaceBetween={24}
        slidesPerView={"auto"}
        navigation={{
          nextEl: ".ppp-swiper-button-next",
          prevEl: ".ppp-swiper-button-prev",
        }}
        modules={[Navigation]}
        className="ppp-swiper"
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index} className="ppp-swiper-slide">
            <div className="ppp-card">
              <div className="ppp-card-img">
                <Image src={article.img} alt={article.title} fill className="object-cover" />
              </div>
              <div className="ppp-card-content">
                <h3 className="ppp-card-title">{article.title}</h3>
                <p className="ppp-card-desc">{article.desc}</p>
                <span className="ppp-card-date">{article.date}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation buttons (hidden on mobile by CSS) */}
        <div className="ppp-swiper-button-prev"></div>
        <div className="ppp-swiper-button-next"></div>
      </Swiper>
    </section>
  )
}
