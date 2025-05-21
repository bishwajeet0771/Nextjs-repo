/* eslint-disable react/no-array-index-key */
'use client'

import Image from 'next/image';
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface CarouselProps {
  totalSlides: number;
  slidesPerView: number;
}

const Carousel: React.FC<CarouselProps> = ({ totalSlides, slidesPerView }) => {
  const totalGroups = Math.ceil(totalSlides / slidesPerView)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const slideGroups = Array.from({ length: totalGroups }, (_, index) => index * slidesPerView)

  const handleNavClick = (newIndex: number) => {
    setCurrentIndex(newIndex)
    // Scroll to the new group
    const carouselElement = document.getElementById(`group-${newIndex}`)
    if (carouselElement) {
      carouselElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative" aria-label="Image Carousel">
        <div className="overflow-hidden">
          <div className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                id={`group-${Math.floor(index / slidesPerView)}`}
                className="snap-start flex-shrink-0 w-1/3 p-2"
              >
                <Image
                  src={`/placeholder.svg?height=300&width=400&text=Slide ${index + 1}`}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  width={237}
                  height={263}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
          <button
            onClick={() => handleNavClick(Math.max(0, currentIndex - 1))}
            className={`bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Previous slides"
            disabled={currentIndex === 0}
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleNavClick(Math.min(totalGroups - 1, currentIndex + 1))}
            className={`bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ${
              currentIndex >= totalGroups - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Next slides"
            disabled={currentIndex >= totalGroups - 1}
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {slideGroups.map((groupIndex, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index)}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ${
              currentIndex === index
                ? 'bg-gray-800'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel;
