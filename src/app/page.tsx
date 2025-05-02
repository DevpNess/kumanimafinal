'use client'
import React, { useState } from 'react';
import useBorder from "@/hook/useBorderLighting"
import MainNav from "@/components/main-nav"
import CardSerie from "@/components/cardSerie"
import PanelRight from "@/components/panelRight"
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Home() {
  const date = new Date("2024-08-18T14:00:00")
  const date2 = new Date("2024-08-18T10:00:00")
  const manga = {
    name:'Spy For Family',
    pathSerie:"/spy-for-family/",
    pathImage:"/spy-for-family/spy-for-family.webp",
    author:"Eros",
    primaryChapter:{
        chapter:'1',
        date:date,
        url:"/spy-for-family/cap-1",
    },
    secondaryChapter:{
      chapter:'2',
      date:date2,
      url:"/spy-for-family/cap-2",
    },
  }
  const [controlledSwiper, setControlledSwiper] = useState(null);
  useBorder()
  return (
    <div >
      <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0">
        <MainNav />
      </header>
      <main>
        <div>
          <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Controller ]}
            controller={{ control: controlledSwiper }} 
            spaceBetween={20}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}>

            <SwiperSlide style={{ padding: 10, width: 307 }} className="slick-slide slick-current slick-active" tabIndex={0} role="tabpanel" id="slick-slide00" aria-describedby="slick-slide-control00" data-slick-index="0" aria-hidden="false">
              <a href="#" tabIndex={0}>
                <img src="/media/banner/banner-img-1.png" alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide style={{ padding: 10, width: 307 }} className="slick-slide slick-active" tabIndex={0} role="tabpanel" id="slick-slide01" aria-describedby="slick-slide-control01" data-slick-index="1" aria-hidden="false">
              <a href="#" tabIndex={0}>
                <img src="/media/banner/banner-img-2.png" alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide style={{ padding: 10, width: 307 }} className="slick-slide slick-active" tabIndex={0} role="tabpanel" id="slick-slide02" aria-describedby="slick-slide-control02" data-slick-index="2" aria-hidden="false">
              <a href="#" tabIndex={0}>
                <img src="/media/banner/banner-img-3.png" alt="" />
              </a>
            </SwiperSlide>
                        <SwiperSlide style={{ padding: 10, width: 307 }} className="slick-slide slick-active" tabIndex={0} role="tabpanel" id="slick-slide02" aria-describedby="slick-slide-control02" data-slick-index="2" aria-hidden="false">
              <a href="#" tabIndex={0}>
                <img src="/media/banner/banner-img-3.png" alt="" />
              </a>
            </SwiperSlide>
                        <SwiperSlide style={{ padding: 10, width: 307 }} className="slick-slide slick-active" tabIndex={0} role="tabpanel" id="slick-slide02" aria-describedby="slick-slide-control02" data-slick-index="2" aria-hidden="false">
              <a href="#" tabIndex={0}>
                <img src="/media/banner/banner-img-3.png" alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide style={{ padding: 10, width: 307 }} className="slick-slide slick-active" tabIndex={0} role="tabpanel" id="slick-slide02" aria-describedby="slick-slide-control02" data-slick-index="2" aria-hidden="false">
              <a href="#" tabIndex={0}>
                <img src="/media/banner/banner-img-3.png" alt="" />
              </a>
            </SwiperSlide>

          </Swiper>
        </div>
        <div className="grid grid-cols-12 gap-4">

          <div className="gap-1 sm:col-span-12 md:col-span-8  lg:col-span-9 xl:col-span-9 col-span-12" >
            <div className="row" style={{ height: 80, marginBottom: 24, background: "linear-gradient(338deg, transparent, #420404)", display: 'flex', justifyContent: 'space-between' }}>
              <div className="col-6 heading style-1 titulo">Actualizaciones</div>
              <div className="col-6 v">
                <div className="vermas">Ver mas</div>
              </div>
            </div>
            <div className='CardContent'>
            <CardSerie manga={manga}/>
            <CardSerie manga={manga}/>
            <CardSerie manga={manga}/>
            <CardSerie manga={manga}/>
            <CardSerie manga={manga}/>
            <CardSerie manga={manga}/>
            <CardSerie manga={manga}/>
            </div>
          </div>

          <div className="flex gap-1 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 col-span-12 ">
            <PanelRight />
          </div>

        </div>

      </main>

    </div>
  )
}