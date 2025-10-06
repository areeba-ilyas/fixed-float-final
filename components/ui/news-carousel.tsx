"use client"

import React from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"

interface NewsItem {
  title: string
  desc: string
  img: string
  link: string
}

interface NewsCarouselProps {
  newsItems: NewsItem[]
}

export const NewsCarousel: React.FC<NewsCarouselProps> = ({ newsItems }) => {
 const css = `
  .swiper {
    width: 100%;
    padding-bottom: 60px;
    backgrounf-color: #0C0D16;
  }

  .swiper-slide {
    flex-shrink: 0;
    height: 30em;
    width: 50em;
    border-radius: 1em;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    opacity: 0.3;
    transform: scale(0.9);
    transition: transform 0.3s ease, opacity 0.3s ease;
    
  }

  .swiper-slide.swiper-slide-active {
    transform: scale(1);
    opacity: 1;
    z-index: 10;
  }

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
    color: white;
    pointer-events: none;
  }

  .swiper-slide-active .overlay {
    background: none;
  }

  .title {
    font-size: 2rem;
    font-weight: 400;
   margin-top: 2rem;
    line-height: 1.3;
    max-width: 70%;
    pointer-events: auto;
  }
   @media (max-width: 768px) {
  .title {
    max-width: 60%;
  }
}
  .desc {
    font-size: 1.2rem;
    line-height: 1.5;
   margin-top: -10rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 50%;
    pointer-events: auto;
    font-weight: 400;
  }

  .btn {
    align-self: flex-start;
    background-color: #0070f3;
    padding: 0.5rem 1.7rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    transition: background 0.3s ease;
    color: white;
  
    pointer-events: auto;
  }

  .btn:hover {
    background-color: #0051c3;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 9999px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .swiper-3d .swiper-slide-shadow-left,
  .swiper-3d .swiper-slide-shadow-right {
    display: none;
  }
`


  return (
    <section className="w-full flex flex-col items-center bg-[#0C0D16]">
      <style>{css}</style>

    <Swiper
  spaceBetween={15}
  slidesPerView='auto'
  grabCursor
  initialSlide={0}
  navigation={{
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }}
  loop={false}
  modules={[EffectCoverflow, Navigation]}
>
  {newsItems.map((item, index) => (
    <SwiperSlide
      key={index}
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="overlay">
              <h3 className="title">{item.title}</h3>
              <p className="desc">{item.desc}</p>
              <Link href={item.link} className="btn font-semibold">
                Read
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      
    </section>
  )
}
