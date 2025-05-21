"use client";
import React from "react";
import { useAtom } from "jotai";
import { searchPageMapToggle } from "../../../../store/newListingStore";
import Image from "next/image";
import ListingSearchRightSection from "../../components/listingSearchTabs/listingSearchRightSection";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  serverData?: any;
};

function ListingSearchMapSection({ serverData }: Props) {
  const [isMapLoaded, setIsMapLoaded] = useAtom(searchPageMapToggle);
  const isMobile = useMediaQuery("(max-width: 601px)");
  return !isMapLoaded && !isMobile ? (
    <div
      className={`relative w-full max-h-[70vh] sm:fixed right-0 flex justify-center items-center md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 border-[2px] border-black-500 border-solid h-[calc(100vh-65vh)] md:h-[calc(100vh-255px)] max-w-full`}
    >
      {!isMobile  && (
          <>
            <link
              rel="preconnect"
              href="https://media.getrightproperty.com"
              crossOrigin="anonymous"
            />

            {/* Preload image with srcSet and sizes */}
         
              <link
                rel="preload"
                as="image"
                href={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
              />
           
          </>
        )}
      <Image
        priority
        height={630}
        width={1200}
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
        alt="Search Page Map for Real Estate Properties | Projects in India"
        className="h-full w-full"
        quality={80}
      />

      <button
        onClick={() => setIsMapLoaded(true)}
        className="absolute z-8 px-[10px] py-[4px] md:px-6 md:py-3 text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors "
      >
        <span className="text-[16px] md:text-lg font-semibold">
          Click to View Location Details
        </span>
      </button>
    </div>
  ) : (
    <ListingSearchRightSection
      serverData={serverData}
      key="projListingSearchRightSection2"
    />
  );
  // return isMapLoaded || isMobile ? (
  //   <ListingSearchRightSection
  //     serverData={serverData}
  //     key="projListingSearchRightSection2"
  //   />
  // ) : (
  //   (isMobile !== undefined || isMobile === false) && (
  //     <div
  //       className={`relative w-full max-h-[70vh] sm:fixed right-0 flex justify-center items-center md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 border-[2px] border-black-500 border-solid h-[calc(100vh-65vh)] md:h-[calc(100vh-255px)] max-w-full`}
  //     >
  //       <Image
  //         priority={true}
  //         height={630}
  //         width={1200}
  //         src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/search-page/default-search-page-map.webp`}
  //         alt="search page map Image"
  //         className="h-full w-full"
  //         quality={80}
  //       />

  //       <button
  //         onClick={() => setIsMapLoaded(true)}
  //         className="absolute z-8 px-[10px] py-[4px] md:px-6 md:py-3 text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors "
  //       >
  //         <span className="text-[16px] md:text-lg font-semibold">
  //           Click to View Location Details
  //         </span>
  //       </button>
  //     </div>
  //   )
  // );
}

export default ListingSearchMapSection;
