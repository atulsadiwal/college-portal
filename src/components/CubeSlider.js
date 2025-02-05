'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCube } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-cube'

const CubeSlider = ({ slides, width = "w-96" }) => {
    return (
        <div>
            <div className="w-full mx-auto p-4">
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    loop={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectCube, Autoplay]}
                    className={`mySwiper ${width}`}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className={`w-full h-full ${slide.color} flex items-center justify-center`}>
                                <img src={slide.img} alt={slide.title} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default CubeSlider;
