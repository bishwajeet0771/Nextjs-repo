/* eslint-disable no-unused-vars */
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
} from "@/app/images/commonSvgs";
import React from "react";
import { Carousel } from "@mantine/carousel";
import Style from "./Carouse.module.css";
import { useAtom, useAtomValue } from "jotai";
import { selectedPartialUnitAtom } from "@/app/store/partialsUnits";
import Image from "next/image";
import {
  FloorPlanNotAvail,
  // ImgNotAvail
} from "@/app/data/project";
import clsx from "clsx";
export default function CarouselModal({
  active,
  setActive,
}: {
  active: number;
  setActive: (number: number) => void;
}) {
  const isData = useAtomValue(selectedPartialUnitAtom);
  const handleImageClick = (index: number) => {
    if (active === index) return;
    setActive(index);
  };
  return (
    <Carousel
      classNames={Style}
      slideSize="20.333333%"
      w={"full"}
      slideGap="md"
      withControls
      align={isData.others.length > 5 ? "start" : "center"}
      slidesToScroll={3}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mih={60}
    >
      {isData.others.map((item: any, index: number) => (
        <Carousel.Slide
          key={item.image}
          mih={70}
          mt={20}
          onClick={() => handleImageClick(index)}
          className="cursor-pointer"
        >
          <Image
            src={item?.floorPlan?.split(",")[0] ?? FloorPlanNotAvail}
            alt={item.image}
            width={300}
            height={300}
            className={clsx(
              "max-h-[40px] min-h-[40px]  sm:max-h-[60px] xl:max-h-[100px]  object-cover shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  ",
              active === index && "border-[3px] border-btnPrimary border-solid "
            )}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
