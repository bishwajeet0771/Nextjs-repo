"use client";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";

type Props = {
  heroSlides: any;
  data: any;
};

export default function Banner({ heroSlides, data }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides?.length || 0);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides?.length]);
  const handleSlideChange = (index: number) => {
    if (data?.featured?.length) {
      setActiveSlide(index);
    }
  };

  const handlePrevSlide = () => {
    setActiveSlide(
      (activeSlide - 1 + (data?.featured?.length || 0)) %
        (data?.featured?.length || 1)
    );
  };

  const handleNextSlide = () => {
    setActiveSlide((activeSlide + 1) % (data?.featured?.length || 1));
  };
  return (
    <div>
      <section className="relative h-[90vh] w-full">
        {data?.featured?.map((slide: any, index: number) => (
          <div
            key={`featured_data_${index.toString()}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.coverUrl.split(",")[0]}
              alt={slide.name}
              fill
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background/90">
              <div className="container mx-auto h-full flex items-end pb-32 px-4">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md animate-fadeIn">
                    {slide.projName}
                  </h1>
                  <p className="text-lg md:text-2xl opacity-90 drop-shadow-md animate-slideUp">
                    {`${slide.locality}, ${slide.city}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {data?.featured?.map((_: any, index: number) => (
            <button
              key={`featured_data_2_${index.toString()}`}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeSlide ? "bg-primary w-6" : "bg-white/50"
              }`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
          onClick={handlePrevSlide}
        >
          <FaChevronLeft />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full"
          onClick={handleNextSlide}
        >
          <FaChevronRight />
        </button>
      </section>
    </div>
  );
}
