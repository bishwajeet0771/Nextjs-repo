"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Styles from "@/app/styles/embla/Main.module.css";
export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel();
  console.log(emblaRef);
  return (
    <div className={Styles.embla} ref={emblaRef}>
      <div className={Styles.embla__container}>
        <div className={Styles.embla__slide}>Slide 1</div>
        <div className={Styles.embla__slide}>Slide 2</div>
        <div className={Styles.embla__slide}>Slide 3</div>
      </div>
    </div>
  );
}
