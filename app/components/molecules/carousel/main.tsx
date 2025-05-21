"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import styles from "@/app/styles/Carousel.module.css";
import "@mantine/carousel/styles.css";
import {
  DarkCarouseIcon,
  DarkNextCarouselButton,
  // NextCarouselButton,
  // PrevCarouselButton,
} from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";

const MainCarousel = ({
  children,
  paddings = { mobile: 10, tab: 65, desktop: 100 },
}: {
  children: React.ReactNode;
  paddings?: {
    tab: number;
    mobile: number;
    desktop: number;
  };
}) => {
  const isMobile = useMediaQuery("(max-width: 750px)");
  const isTab = useMediaQuery("(max-width: 1600px)");
  return (
    <Carousel
      classNames={styles}
      nextControlIcon={<DarkNextCarouselButton />}
      previousControlIcon={<DarkCarouseIcon />}
      mt={isMobile ? 16 : 30}
      height={"auto"}
      slideSize={{ base: "100%", sm: "400px", md: "31%" }}
      slideGap={{ base: "lg", sm: "md", md: "40px" }}
      align={"start"}
      pb={isTab ? 20 : 0}
      px={isMobile ? paddings.mobile : isTab ? paddings.tab : paddings.desktop}
    >
      {children}
    </Carousel>
  );
};

export default MainCarousel;
