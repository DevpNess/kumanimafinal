'use client'
import { Navigation, Pagination, Scrollbar, A11y, Controller } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from 'react';

export default function SwiperHome() {
    const [controlledSwiper, setControlledSwiper] = useState(null);
    return (
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
    )
}