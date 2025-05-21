/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
'use client'

import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

interface Slide {
  content: React.ReactNode;
}

interface CarouselProps {
  slides: Slide[];
  renderItem: (slide: Slide, index: number) => React.ReactNode;
  slidesToShow?: number;
  gap?: number;
  dataKey?:string
}

const CustomCarousel = ({
  slides,
  renderItem,
  slidesToShow = 1,
  gap = 0,
  dataKey
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;
  const isMobile = useMediaQuery('(max-width: 768px)');

  const moveToSlide = (index: number) => {
    const maxIndex = Math.max(0, totalSlides - slidesToShow);
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
    const targetSlide = document.getElementById(`${dataKey}-slide-${newIndex}`);
    if (targetSlide) {
      targetSlide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  const handlePrev = () => moveToSlide(currentIndex - 1);
  const handleNext = () => moveToSlide(currentIndex + 1);

  const showNavigation = totalSlides > slidesToShow;

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x">
        {slides.map((slide, index) => (
          <div
            id={`${dataKey}-slide-${index}`}
            key={index}
            className="flex-shrink-0 snap-center"
            style={{ marginRight: `${index < totalSlides - 1 ? gap : 0}px` }}
          >
            {renderItem(slide, index)}
          </div>
        ))}
      </div>

      {showNavigation && !isMobile && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={handlePrev}
            className={`transition-opacity duration-300 bg-white/80 rounded-full p-2 shadow-md hover:bg-white ${
              currentIndex <= 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            disabled={currentIndex <= 0}
            aria-label="Previous slide"
          >
            <FaChevronCircleLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className={`transition-opacity duration-300 bg-white/80 rounded-full p-2 shadow-md hover:bg-white ${
              currentIndex >= totalSlides - slidesToShow ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            disabled={currentIndex >= totalSlides - slidesToShow}
            aria-label="Next slide"
          >
            <FaChevronCircleRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomCarousel;

