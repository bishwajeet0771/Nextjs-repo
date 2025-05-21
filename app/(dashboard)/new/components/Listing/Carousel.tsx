/* eslint-disable react/no-array-index-key */
"use client";
import React from "react";
import ListingCard from "../Atoms/ListingCard";
import NewCarousel from "@/app/test/components/NewCarousel";
import { useMediaQuery } from "@mantine/hooks";
type Props = {
  data: any;
  shortIds: any;
  dataKey:string
  url:string
};

// eslint-disable-next-line no-unused-vars
export default function ListingCarousel({ shortIds, data ,dataKey,url}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
  //   <ReactWindowCarousel
  //   {...{ initialSlide, slidesList, slideWidth, slideHeight }}
  // />
  //   <HomePageVirtualCarousel
  //   items={data}
  //   itemCount={data.length}
  //   itemSize={500}
  //   height={480}
  //   gapSize={16}
  //   renderItem={(item:any, index) => (
  //     <ListingCard
  //       item={item}
  //       sl={
  //         shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
  //           ? "Y"
  //           : "N"
  //       }
  //     />
  //   )}
  // />
  //   <CustomCarousel
  //   slides={data}
  //   renderItem={(item:any, index) => (
  //            <ListingCard
  //         item={item}
  //         sl={
  //           shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
  //             ? "Y"
  //             : "N"
  //         }
  //       />
  //   )}
  //   dataKey={dataKey}
  //   slidesToShow={3}
  //   gap={16}


  // />
  <NewCarousel 
    slidesToShow={isMobile ? 1 : 4} 
    url={url} 
    data={data} 
    type="prop"
    renderItem={(item:any) => (
    <ListingCard
      item={item}
      sl={
        shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
          ? "Y"
          : "N"
      }
    />
  )} />
  //   <Carousel
  //   // slideSize="33.333333%"
  //   slideSize={{ base: "80%", sm: "50%", md: "29%" }}
  //   slideGap={{ base: "sm", sm: "md", xl: "md" }}
  //   // loop
  //   align="start"
  //   slidesToScroll={1}
  //   mt={20}
  //   nextControlIcon={<CarouseSelArrowIcon />}
  //   previousControlIcon={<CarouseSelArrowIcon className="rotate-180" />}
  //   controlsOffset={"-10px"}
  //   classNames={Css}
  // >
  //   {data?.map((item: any, index: number) => (
  //     <Carousel.Slide key={item.propIdEnc}>
  //       <ListingCard
  //         item={item}
  //         sl={
  //           shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
  //             ? "Y"
  //             : "N"
  //         }
  //       />
  //     </Carousel.Slide>
  //   ))}
  // </Carousel>
  )
}
{/* <div className="mt-4">
   {data && (
      <HomePageVirtualCarousel
        items={data}
        height={480}
        itemCount={data.length}
        itemSize={500}
        overscan={5}
        renderItem={(item: any, index) => {
          return (
            <ListingCard
              key={index}
              item={item}
              sl={
                shortIds?.propIds && shortIds?.propIds?.includes(item.propIdEnc)
                  ? "Y"
                  : "N"
              }
            />
          );
        }}
      />
    )}  </div>
  ); */}