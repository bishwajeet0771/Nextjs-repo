/* eslint-disable no-unused-vars */
"use client";
import React from "react";
import { ReraIcon } from "@/app/images/commonSvgs";

import { getImageUrls } from "@/app/utils/image";
// import { currentBlockAtom, isScrollingAtom, stickyAtom } from "./navigation";
import { useSetAtom } from "jotai";
// import { useQuery } from "react-query";
// import { generateBuilderUrl } from "@/app/utils/linkRouters/Builder";
import FirstImagesBlock from "@/common/components/FirstImagesBlock";
import { galleryStateAtom } from "@/app/store/project/gallery";
import { usePathname } from "next/navigation";

type Props = {
  projectDetails: any | null;
  companyName: string;
  builderId: number;
  hasReraStatus: boolean;
  scrollId?: string;
};

const FirstBlock: React.FC<Props> = ({
  projectDetails,
  // companyName,
  builderId,
  hasReraStatus,
  // scrollId,
}) => {
  const images = getImageUrls(projectDetails?.media as any);
  // let urlBuilder = "/";
  // const setIsScrolling = useSetAtom(isScrollingAtom);
  // const setSticky = useSetAtom(stickyAtom);
  // const setC = useSetAtom(currentBlockAtom);
  const path = usePathname();
  // const { data, isLoading, status } = useQuery<any>({
  //   queryKey: [`builder/${builderId}&isBuilderPage=Nproj`],
  //   enabled: false,
  //   onSuccess(data) {
  //     urlBuilder = generateBuilderUrl({
  //       slug: data?.data?.userName,
  //       city: data.data?.cityName,
  //     });
  //   },
  // });
  // function scrollToTopic(id: string): void {
  //   setIsScrolling(true);
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //       inline: "center",
  //     });
  //     setSticky(true);
  //   }
  //   setC("floorPlans");
  //   setTimeout(() => setIsScrolling(false), 3000);
  // }

  const dispatch = useSetAtom(galleryStateAtom);

  const onSelect = () => {
    dispatch({
      type: "OPEN",
      payload: {
        items: images,
        mediaType: "image",
        title: "Project Gallery",
        activeIndex: images.indexOf(images[0]),
      },
    });
  };

  return (
    <div
      className={`relative rounded-[10px] w-full m-auto bg-gray-50 bg-cover flex justify-between items-start flex-col shadow-md break-words p-[10px] `}
    >
      {projectDetails && (
        <>
          {hasReraStatus && (
            <p className="flex items-center pl-[8px] text-center text-[12px] sm:text-[16px]  xl:text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] /0   z-10 left-0 absolute">
              <ReraIcon className="h-[14px] w-[14px] sm:h-[16px] sm:w-[16px] xl:h-[24px] xl:w-[24px]" />
              RERA
            </p>
          )}

          <div className="relative w-full aspect-auto mx-auto sm:!rounded-[10px] h-full flex justify-center items-center ">
            {/* <Carousel
              classNames={styles}
              slideGap={{ base: 0, sm: "md" }}
              withIndicators
              slidesToScroll={1}
              align="start"
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              nextControlIcon={<DarkNextCarouselButton />}
              previousControlIcon={<DarkCarouseIcon />}
            >
              {images.map((imageUrl, index) => (
                <Carousel.Slide
                  key={imageUrl ?? imageUrl} 
                  className="relative"
                  w={"auto"}
                >
                  <picture>
                    <source
                      media="(max-width: 460px)"
                      srcSet={imageUrl.split(",")[1]} 
                    />
                    <source
                      media="(max-width: 768px)"
                      srcSet={imageUrl.split(",")[2]}
                    />
                    <source
                      media="(min-width: 1200px)"
                      srcSet={imageUrl.split(",")[3]}
                    />
                    <Image
                      alt={projectDetails?.projectName}
                      title={projectDetails?.projectName}
                      src={imageUrl.split(",")[3]}
                      fill
                      className={`bg-gray-${index + 1} `}
                      unoptimized
                    />
                  </picture>
                </Carousel.Slide>
              ))}
            </Carousel> */}

            {/* <CustomCarousal
              images={images}
              containerClass="min-h-[300px] sm:min-h-[545px] !xl:min-h-[750px] xl:min-h-[750px]"
              projName={projectDetails?.projectName}
            /> */}

            <FirstImagesBlock
              onSelect={onSelect}
              data={{
                type: "proj",
                url: path,
                images: images,
                projectStatus: projectDetails?.projectStatus,
                projName: projectDetails?.projectName,
              }}
            />
          </div>
          {/* <div className="absolute bottom-0 sm:m-[1%] sm:mb-[4%] xl:mb-[2%] xl:m-[2%] z-10 sm:w-[95%] self-center justify-between items-start flex-col md:flex-row border-solid border-white-500 sm:rounded-[10px] bg-gradient-to-r from-[#EFEFEF] /20 to-[#c3c3c3bd]/80 shadow-md sm:flex break-words sm:px-6 sm:py-2">

            <div className="w-full md:w-[60%]">
              <div className={`ml-[2%] mt-1 sm:mt-[6px] xl:mt-[1%] mb-[7px]`}>
                <div className="flex justify-between items-start">
                  <h1 className="text-[22px] sm:text-[22px] xl:text-[28px] font-bold text-[#001F35] break-words text-wrap w-full">
                    {projectDetails.projectName}
                  </h1>
                  <SharePopup className="text-sm p-[2px] mr-2 mt-[2px] sm:hidden " />
                </div>
                <p className="text-[#242424] text-sm sm:text-[18px] xl:text-[22px] not-italic font-semibold leading-[normal] w-[100%] tracking-[0.32px] capitalize sm:mt-[8px] xl:mt-[14px] ">
                  address:{" "}
                  {`${projectDetails.address}, ${projectDetails.localityName}, ${projectDetails.cityName}, ${projectDetails.state}, ${projectDetails.pinCode}`}
                </p>

                <p className="text-sm sm:text-[16px] mt-[10px] xl:mt-[14px] xl:text-[22px] font-[600] text-[#242424]">
                  Start - End Date:
                  <span className="font-[600] text-[#242424]">
                    {" "}
                    {formatDate(projectDetails.startDate)} -{" "}
                    {formatDate(projectDetails.endDate)}
                  </span>
                </p>

                <p className="text-[#242424] sm:text-[16px] xl:text-2xl not-italic font-semibold leading-[normal] mt-[14px]">
                  Builder:{" "}
                  <Link
                    prefetch={false}
                    href={generateBuilderUrl({
                      slug: data?.data?.userName,
                      city: data?.data?.cityName,
                    })}
                    rel="noopener noreferrer"
                    className="text-btnPrimary sm:text-[16px] xl:text-2xl  font-bold leading-[normal] underline"
                    aria-label={isLoading ? "Builder" : data?.data?.userName ? data?.data?.userName : "Builder"}
                  >
                    {isLoading ? "Builder" : data?.data?.userName ? data?.data?.userName : "Builder"}
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full md:w-[40%] flex justify-between md:items-end flex-col p-[2%] pt-[1%]">
              <h2 className="inline-flex sm:text-[22px] xl:text-[32px] font-semibold sm:font-[700] text-[#001F35]">
                <span className=" mr-1 sm:hidden">Price range: </span>
                {"  "}
                {formatCurrency(projectDetails.minPrice)} -{" "}
                {formatCurrency(projectDetails.maxPrice)}
              </h2>
              <p className=" md:text-right sm:text-[14px] xl:text-[24px] sm:font-[600] mb-[10px] md:mb-[20px] text-[#001F35] ">
                <span className="text-[#001F35]  sm:text-[14px] xl:text-[24px] sm:font-[600] text-wrap not-italic font-medium leading-[normal]">
                  ₹ {formatNumberWithSuffix(projectDetails.basePrice)} Base
                  Price/sq.ft onwards
                </span>
              </p>

              <p
                className=" sm:text-[16px] xl:text-[20px] font-[600] mr-auto md:mr-0 text-[#0073C6] bg-[#FFF] rounded-[10px] shadow-md p-[8px] flex items-center gap-2 cursor-pointer  sm:mt-[5%] xl:mt-[3%] mt-auto"
                onClick={() => scrollToTopic("floorPlansdiv")}
              >
                <Image
                  width={100}
                  height={100}
                  src={"/abc/floorplan.png"}
                  alt="no of floors"
                  className=" xl:h-[24px] xl:w-[24px] w-[16px] h-[16px]  sm:h-[16px] sm:w-[16px] "
                />
                {formatNumberWithSuffix(
                  projectDetails?.floorPlanCount,
                  false
                ) || 0}{" "}
                Floor Plans
              </p>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default FirstBlock;
