/* eslint-disable react/no-array-index-key */
"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import Card from "./Card";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
import Css from "../../Style.module.css";
// import useOptimisticShortlistCompare from "../../hooks/useOptimisticShortlistCompare";
type Props = {
  data: any;
  shortIds: any;
};

export default function CardCarousel({ data, shortIds }: Props) {
  return (
    <Carousel
      slideSize={{ base: "80%", sm: "50%", md: "33.333333%" }}
      slideGap={{ base: "8px", sm: "12px", xl: "12px" }}
      align="start"
      slidesToScroll={1}
      mt={20}
      nextControlIcon={<CarouseSelArrowIcon title="Click to Forword" />}
      previousControlIcon={
        <CarouseSelArrowIcon className="rotate-180" title="Click to Backword" />
      }
      controlsOffset={"-10px"}
      classNames={Css}
    >
      {data?.map((item: any, index: number) => (
        <Carousel.Slide key={`home-project-data-${index}`}>
          <Card
            item={{
              ...item,
              shortListed:
                shortIds?.projIds && shortIds?.projIds?.includes(item.projIdEnc)
                  ? "Y"
                  : "N",
            }}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
