"use client";
import { Carousel } from "@mantine/carousel";
import React from "react";
import "@mantine/carousel/styles.css";
import { CarouseSelArrowIcon } from "@/app/images/HomePageIcons";
type Props = { data: any; active: number; shortIds: any };
import Css from "../../../Style.module.css";
import Card from "../../newly-added-projects/Card";
export default function CardCarousel({ data, shortIds, active }: Props) {
  return (
    <Carousel
      slideSize={{ base: "50%", sm: "36%", md: "28%" }}
      slideGap={{ base: "8px", sm: "12px", xl: "12px" }}
      align="start"
      slidesToScroll={1}
      mt={0}
      nextControlIcon={<CarouseSelArrowIcon title="Click to Forword" />}
      previousControlIcon={
        <CarouseSelArrowIcon className="rotate-180" title="Click to Backword" />
      }
      controlsOffset={"-10px"}
      classNames={Css}
      key={active}
    >
      {data?.map((item: any) => (
        <Carousel.Slide key={item.projIdEnc}>
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
