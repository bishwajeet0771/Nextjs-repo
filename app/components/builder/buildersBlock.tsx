"use client";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { OtherBuilder } from "@/app/validations/types/builder";
// import { BackgroundImage } from "@mantine/core";
import {
  NextCarouselButton,
  PrevCarouselButton,
} from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";

export default function BuildersBlock({
  data,
  name,
}: {
  data: OtherBuilder[];
  name: string;
}) {
  const isMobile = useMediaQuery("(max-width: 750px)");
  return (
    <div className=" py-12 w-full flex  items-center ">
      <div className="max-w-[1920px]  ">
        <h2 className="text-black text-[32px] not-italic font-bold leading-[normal] uppercase">
          Builder’s in{" "}
          <span className="text-[#148B16] text-[32px] not-italic font-bold leading-[normal] uppercase">
            Bengaluru
          </span>
        </h2>
        <p className=" mt-2 text-[#4D6677] text-2xl italic font-medium leading-[normal] tracking-[0.96px]">
          Check out some other builders in Bengaluru
        </p>
        <div className="mt-8 relative  ">
          <Carousel
            //mih={"200px"}
            // slideGap={"72px"}
            // align="start"
            // slideSize="15%"
            // withIndicators
            className=" flex justify-start items-center "
            slidesToScroll={1}
            nextControlIcon={<NextCarouselButton />}
            previousControlIcon={<PrevCarouselButton />}
            height={"auto"}
            slideSize={{ base: "40%", sm: "50%", md: "25%" }}
            slideGap={{ sm: "md", md: "72px" }}
            align={"start"}
            px={isMobile ? 0 : 100}
            withControls={
              data?.filter((builder) => builder.name !== name).length > 5
                ? true
                : false
            }
          >
            {data
              ?.filter((builder) => builder.name !== name)
              .map((builder) => {
                const logo =
                  builder.logo === "null"
                    ? `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/builderpage/builder-noimage.png`
                    : builder.logo;
                return (
                  <Carousel.Slide key={`builderBlock_${builder.name}`}>
                    <div
                      className=" w-[107px] h-[105px] md:w-[140px] md:h-[136px] lg:w-[209px] lg:h-[203px]  bg-gray-300 shadow-[0px_4px_15px_0px_rgba(0,0,0,0.10)] rounded-[10px]"
                      style={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <p className="text-[#202020] text-xl not-italic font-semibold leading-[normal] text-center mt-4 w-[107px] md:w-[209px]">
                      {builder.name}
                    </p>
                  </Carousel.Slide>
                );
              })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
