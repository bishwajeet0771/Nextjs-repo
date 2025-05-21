"use client";
import React from "react";
import { Main } from "@/app/validations/property/index";
import { getImageUrls } from "@/app/utils/image";
import { useSetAtom } from "jotai";
// import { currentBlockAtom, isScrollingAtom, stickyAtom } from "./Navigation";
import BrokerContactTag from "./BrokersFreindly";
// import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
// import { useQuery } from "react-query";

import FirstImagesBlock from "@/common/components/FirstImagesBlock";
import { galleryStateAtom } from "@/app/store/project/gallery";
import { usePathname } from "next/navigation";

type Props = {
  projectDetails: Main | null;
  projName: string;
  totalPrice: number;
  isOkWithBrokerContact: boolean;
  isUsed?: string;
};

const PropertyFirstBlock: React.FC<Props> = ({
  projectDetails,
  projName,
  // totalPrice,
  isOkWithBrokerContact,
  isUsed,
}) => {
  const images = getImageUrls(projectDetails?.projMedia as any);
  const path = usePathname();
  // const setIsScrolling = useSetAtom(isScrollingAtom);
  // const setSticky = useSetAtom(stickyAtom);
  // const setC = useSetAtom(currentBlockAtom);

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
  // const { data } = useQuery<any>({
  //   queryKey: [`builder/${projectDetails?.postedById}&isBuilderPage=Nproj`],
  //   enabled: false,
  // });

  // const projectUrl = createProjectLinkUrl({
  //   city: projectDetails?.ctName as string,
  //   locality: projectDetails?.ltName as string,
  //   slug: projName as string,
  //   projIdEnc: projectDetails?.projIdEnc as string,
  // });

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
    // <div
    //   className={`relative rounded-[10px] w-full m-auto bg-gray-300 bg-cover flex justify-between items-start flex-col shadow-md break-words mb-[1rem] `}
    // >
    <div className="relative rounded-[10px] w-full m-auto bg-gray-800 text-white bg-cover flex justify-between items-start flex-col shadow-md break-words mb-[1rem]">
      {projectDetails && (
        <>
          {isOkWithBrokerContact ? (
            <BrokerContactTag
              isBrokerAllowed
              className="absolute right-0 sm:right-auto sm:bottom-auto sm:top-0 z-[1] left-[10px] bottom-3 "
              isUsed={isUsed}
            />
          ) : null}

          <div className="flex justify-center items-center relative w-full aspect-auto mx-auto sm:!rounded-[10px] p-[10px]">
            <FirstImagesBlock
              onSelect={onSelect}
              data={{
                type: "prop",
                url: path,
                images: images,
                projectStatus:
                  projectDetails.availablityStatus === "U"
                    ? "Under Construction"
                    : "Ready to Move",
                projName: projName,
              }}
            />
          </div>
          {/* overview card removed from here and commented bottom of the component */}
        </>
      )}
    </div>
  );
};

export default PropertyFirstBlock;

// <Carousel
//               classNames={styles}
//               slideGap={{ base: 0, sm: "md" }}
//               withIndicators
//               slidesToScroll={1}
//               align="start"
//               dragFree
//               plugins={[autoplay.current]}
//               onMouseEnter={autoplay.current.stop}
//               onMouseLeave={autoplay.current.reset}
//               nextControlIcon={<DarkNextCarouselButton />}
//               previousControlIcon={<DarkCarouseIcon />}
//             >
//               {images.map((imageUrl, index) => (
//                 <Carousel.Slide
//                   key={`Listing_Carousel_${index}`}
//                   className="relative"
//                   w={"auto"}
//                 >
//                   <picture>
//                     <source
//                       media="(max-width: 460px)"
//                       srcSet={imageUrl.split(",")[1] ?imageUrl.split(",")[1].includes("+")
//                         ? imageUrl.split(",")[1].replace(/\+/g, "%2B")
//                         : imageUrl.split(",")[1] : imageUrl.split(",")[1]
//                     }
//                                         />
//                     <source
//                       media="(max-width: 768px)"
//                       srcSet={imageUrl.split(",")[2] ?imageUrl.split(",")[2].includes("+")
//                         ? imageUrl.split(",")[2].replace(/\+/g, "%2B")
//                         : imageUrl.split(",")[2] : imageUrl.split(",")[2]
//                     }
//                     />
//                     <source
//                       media="(min-width: 1200px)"
//                       srcSet={imageUrl.split(",")[3] ?imageUrl.split(",")[3].includes("+")
//                         ? imageUrl.split(",")[3].replace(/\+/g, "%2B")
//                         : imageUrl.split(",")[3] : imageUrl.split(",")[3]
//                     }
//                       //srcSet={imageUrl.split(",")[3]}
//                     />
//                     <Image
//                       alt={projName}
//                       title={projName}
//                       // src={imageUrl.split(",")[3]}
//                       src={imageUrl.split(",")[3] ?imageUrl.split(",")[3].includes("+")
//                         ? imageUrl.split(",")[3].replace(/\+/g, "%2B")
//                         : imageUrl.split(",")[3] : imageUrl.split(",")[3]
//                       }
//                       // height={630}
//                       // width={1200}
//                       fill
//                    /*    className={`!w-full sm:!rounded-[10px]  h-[330px] sm:max-h-[549px] !xl:h-[750px] xl:max-h-[750px] bg-gray-${
//                         index + 1
//                       }`} */
//                        className={`bg-gray-${index + 1} `}

//                       unoptimized
//                     />
//                   </picture>
//                 </Carousel.Slide>
//               ))}
//             </Carousel>

//  <div className="sm:absolute bottom-0 sm:m-[1%] sm:mb-[4%]   xl:mb-[2%] xl:m-[2%] z-10 sm:w-[95%] self-center justify-between items-start flex-col md:flex-row border-solid border-white-500 sm:rounded-[10px] bg-gradient-to-r from-[#EFEFEF] /20 to-[#c3c3c3bd]/80 shadow-md  sm:flex break-words sm:px-6 sm:py-2">
//           <div className=" w-full md:w-[60%]">
//             <div className={`ml-[2%] mt-1 sm:mt-[6px] xl:mt-[1%] mb-[7px]`}>
//               <div className="flex justify-between items-start">
//                 <h1 className="text-[18px] sm:text-[22px] xl:text-[28px] font-[700] text-[#001F35] break-words text-wrap w-full">
//                   <span className="lowercase">
//                     {projectDetails.propTypeName === "Plot"
//                       ? formatNumberWithSuffix(
//                           projectDetails.plotArea,
//                           false
//                         ) + " sq.ft"
//                       : ""}
//                   </span>{" "}
//                   {projectDetails.bhkName} {projectDetails.propTypeName} For{" "}
//                   {projectDetails.cg === "S" ? " Sale" : " Rent"} In{" "}
//                   {projectDetails.ltName}{" "}
//                 </h1>
//                 <SharePopup className="text-sm p-[2px] mr-2 mt-[2px] sm:hidden " />
//               </div>
//               {projectDetails.projIdEnc ? (
//                 <Link
//                   prefetch={false}
//                   href={projectUrl}
//                   rel="noopener noreferrer"
//                   className={`text-[#001F35] sm:text-[18px] xl:text-2xl not-italic font-semibold mt-1 capitalize ${
//                     projectDetails.projIdEnc ? "underline text-blue-600" : ""
//                   } `}
//                 >
//                   {projName}
//                 </Link>
//               ) : (
//                 <span className="text-[#001F35] sm:text-[18px] xl:text-2xl not-italic font-semibold mt-1 capitalize">
//                   {projName}
//                 </span>
//               )}
//               <p className="text-[#242424]  text-sm sm:text-[18px] xl:text-[22px] not-italic font-semibold leading-[normal] w-[100%] tracking-[0.32px] capitalize sm:mt-[8px] xl:mt-[14px] ">
//                 {`${projectDetails.address}, ${projectDetails.ltName}, ${projectDetails.ctName}, ${projectDetails?.stateName}, ${projectDetails.pinCode}`}
//               </p>

//               <p className=" text-sm sm:text-[16px] mt-[10px] xl:mt-[14px] xl:text-[22px] font-[600] text-[#242424]">
//                 Available From:
//                 <span className="font-[600] text-[#202020]">
//                   {" "}
//                   {formatDate(projectDetails.availableFrom)}
//                 </span>
//               </p>
//             </div>
//           </div>
//           <div className="w-full md:w-[40%] flex justify-between md:items-end flex-col p-[2%] sm:p-[0%] max-h-full">
//             <h2 className="iinline-flex sm:text-[22px] xl:text-[32px] font-semibold sm:font-[700] text-[#001F35]">
//               {`${
//                 projectDetails.cg === "R"
//                   ? formatCurrency(projectDetails.price)
//                   : formatCurrency(projectDetails.price)
//               }${projectDetails.cg === "R" ? " / Month" : ""}`}{" "}
//             </h2>
//             {projectDetails.cg === "S" && (
//               <p className="text-[16px] md:text-right sm:text-[14px] xl:text-[24px] font-[600]   text-[#00487C] ">
//                 <span className="text-[#001F35] sm:text-[14px] xl:text-[24px] sm:font-[600] text-wrap not-italic font-medium leading-[normal]">
//                   ₹{" "}
//                   <NumberFormatter
//                     thousandSeparator
//                     value={calculatePerSqPrice(
//                       projectDetails.price,
//                       projectDetails.propTypeName === "Plot"
//                         ? projectDetails.plotArea
//                         : projectDetails.sba
//                     )}
//                     thousandsGroupStyle="lakh"
//                   />{" "}
//                   Base Price/sq.ft onwards
//                 </span>
//               </p>
//             )}
//             {totalPrice ? (
//               <p className=" mb-1 xl:mb-[13px]  text-[12px]  text-[#001F35] font-semibold md:font-bold ">
//                 Other Charges Applicable
//               </p>
//             ) : (
//               ""
//             )}

//             {/* {isBuilder ? (
//               <a
//                 target="_blank"
//                 href={builderUrl}
//                 className="text-[#001F35] sm:text-[18px] xl:text-2xl not-italic font-semibold  capitalize sm:mt-1 xl:mt-[8px]"
//               >
//                 Posted By:{" "}
//                 <span className="underline text-blue-600 cursor-pointer">
//                   {projectDetails.postedByName}
//                 </span>
//               </a>
//             ) : ( */}
//             <p className="text-[#001F35] sm:text-[18px] xl:text-2xl not-italic font-semibold  capitalize sm:mt-1 xl:mt-[8px] mb-auto">
//               {get_posted_by(projectDetails.postedByType)}:{" "}
//               <span className="">{projectDetails.postedByName}</span>
//             </p>
//             <p
//               className="sm:text-[16px] xl:text-[20px] font-[600] mr-auto md:mr-0 text-[#0073C6] bg-[#FFF] rounded-[10px] shadow-md p-[8px] flex items-center gap-2 cursor-pointer mt-auto self-end"
//               onClick={() => scrollToTopic("floorPlans")}
//             >
//               <Image
//                 width={100}
//                 height={100}
//                 src={"/abc/floorplan.png"}
//                 alt="no of floors"
//                 className="xl:h-[24px] xl:w-[24px] w-[16px] h-[16px] sm:h-[16px] sm:w-[16px] !mt-auto "
//               />
//               Floor Plan
//             </p>
//           </div>
//         </div>
