"use client";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import { Carousel } from "@mantine/carousel";
import React from "react";
import MainCard from "../Atoms/Card";

type Props = {};

export default function FeatureCarousel({}: Props) {
  return (
    <Carousel
      slideSize={{ base: "90%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: 0, sm: "md" }}
      // loop
      align="start"
      slidesToScroll={1}
      mt={20}
      nextControlIcon={<CarouseSelArrowIcon title="Click to Forword" />}
      previousControlIcon={<CarouseSelArrowIcon className="rotate-180" title="Click to Backword" />}
      controlsOffset={"-10px"}
    >
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
      <Carousel.Slide>
        <MainCard />
      </Carousel.Slide>
    </Carousel>
  );
}
