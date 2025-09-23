"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import Image from 'next/image';
import { normalizeImageUrl, shouldOptimizeImage } from '@/utils/imageUtils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
}

interface PropertyImageCarouselProps {
  images: PropertyImage[];
  title: string;
  description?: string;
}

export default function PropertyImageCarousel({ images, title, description }: PropertyImageCarouselProps) {
  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="h-[580px] max-w-5xl mx-auto w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/images/not-found/no-results.png"
            alt="No images available"
            width={200}
            height={200}
            className="mx-auto opacity-50"
          />
          <p className="mt-4 text-gray-500 dark:text-gray-400">No images available for this property</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[580px] max-w-5xl mx-auto w-full relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          el: '.swiper-pagination-custom',
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        loop={images.length > 1}
        className="h-full w-full rounded-lg overflow-hidden"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {images.map((image, index) => {
          const normalizedUrl = normalizeImageUrl(image.url);
          const shouldOptimize = shouldOptimizeImage(normalizedUrl);
          
          return (
            <SwiperSlide key={image.id || index}>
              <div className="relative h-full w-full">
                <Image
                  src={normalizedUrl}
                  alt={`${title} - Image ${index + 1}${description ? `: ${description}` : ''}`}
                  fill
                  className="object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  unoptimized={!shouldOptimize}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Custom Pagination */}
      {images.length > 1 && (
        <div className="swiper-pagination-custom absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"></div>
      )}
    </div>
  );
}