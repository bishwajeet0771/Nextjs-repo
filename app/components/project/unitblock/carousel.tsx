import { ImgCarouselIcon, PrevCarouselIcon } from "@/app/images/commonSvgs";
import { selectedFloorAtom } from "@/app/store/floor";
import { Carousel } from "@mantine/carousel";
import clsx from "clsx";
import { useAtom } from "jotai";
import React from "react";
import styles from "@/app/styles/Carousel.module.css";
import Image from "next/image";
import { ImgNotAvail } from "@/app/data/project";
import { unitFloorsAtom } from "../byunitblock";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";

export default function CarouselSuggestion({
  propCgId,
  form: { setValues },
}: {
  propCgId: number;
  form: any;
}) {
  const [floorsArray, setFloorArray] = useAtom(unitFloorsAtom);
  const [selectedFloor, setSelectedFloor] = useAtom(selectedFloorAtom);
  const selectImg = (index: number) => {
    setSelectedFloor({
      // @ts-ignore
      ...floorsArray[index],
      // @ts-ignore
      floorPlanUrl: floorsArray[index]?.floorPlanUrl ?? ImgNotAvail,
    });
    setValues(setPropertyValues(floorsArray[index], propCgId));
    handleSearch(index);
  };
  const handleSearch = (index: number): void => {
    const filteredFloors = floorsArray?.filter(
      // @ts-ignore
      (floor: any) => floor.unitNumber === floorsArray[index].unitNumber
    );
    // @ts-ignore
    setFloorArray(filteredFloors);
  };
  return (
    floorsArray != undefined &&
    floorsArray != null &&
    floorsArray.length > 0 && (
      <div className="flex  mt-4 w-full justify-center items-center">
        <Carousel
          classNames={styles}
          maw={690}
          slideSize={{ base: "100%", sm: "15%" }}
          slideGap={{ base: "24px", sm: 2 }}
          align="start"
          px={50}
          nextControlIcon={<ImgCarouselIcon />}
          previousControlIcon={<PrevCarouselIcon />}
          withControls={floorsArray.length > 4}
        >
          {floorsArray?.map((eachObj: any, ind: number) => {
            return (
              <Carousel.Slide
                w={70}
                mr={floorsArray.length > 4 ? 6 : 24}
                key={`floorPlanCarouselUrl_${eachObj?.floorPlanUrl[ind]}`}
              >
                <div
                  key={`floorPlanUrl_${eachObj?.floorPlanUrl[ind]}`}
                  className={clsx(
                    " h-[50px] w-[70px] flex justify-center items-center shadow-md  scrollbar-hide rounded-[5px] border-[0.5px] border-solid border-[#92B2C8]",
                    selectedFloor?.floorPlanUrl == eachObj?.floorPlanUrl &&
                      "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] border-2 border-solid border-[#59A1D6]"
                  )}
                >
                  <Image
                    // @ts-ignore
                    src={
                      eachObj?.floorPlanUrl
                        ? `${eachObj?.floorPlanUrl}`
                        : ImgNotAvail
                    }
                    alt="Floor Plan"
                    width={57}
                    height={37}
                    className="w-[88px] h-[58px]   cursor-pointer "
                    style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                    onClick={() => selectImg(ind)}
                  />
                </div>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </div>
    )
  );
}
