'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-cards';

interface ImageCardSwiperProps {
  images: string[];
}

const ImageCardSwiper = ({ images }: ImageCardSwiperProps) => {
  return (
    <div className="w-full max-w-md">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[400px] relative">
              <Image
                src={image}
                alt={`Foto ${index + 1}`}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCardSwiper;
