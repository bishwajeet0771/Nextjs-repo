"use client";
import React from "react";
import { getAllCitiesDetails } from "@/app/utils/stats_cities";
import RTK_CONFIG from "@/app/config/rtk";
import { useQuery } from "react-query";
import { emptyFilesIcon, strikeIconIcon } from "@/app/images/commonSvgs";
import { useAtom } from "jotai";
import { trendsFilterData } from "../data.ts/marketBlogalData";
import { usePathname } from "next/navigation";
import Loading from "@/app/components/atoms/Loader";
import Image from "next/image";
import Link from "next/link";

type Props = {
  text: string;
};

interface City {
  id: string;
  name?: string;
}

// 577, 714, 576, 580, 582, 585, 641
const cityIds = [9];

function MarketSections({ text }: Props) {
  const [{ inputSearch }] = useAtom(trendsFilterData);

  const {
    data: AllCities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery<City[], Error>({
    queryKey: ["all-cities"],
    queryFn: getAllCitiesDetails,
    ...RTK_CONFIG,
    enabled: true,
  });

  const currentCities = AllCities?.filter(
    (city: any) =>
      cityIds.includes(city?.id) &&
      (inputSearch === "" || city.name.toLowerCase().includes(inputSearch))
  );
  const path = usePathname();
  const bengalureImg = `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/News/Bengaluru.jpg`;

  if (citiesError)
    return (
      <div className="h-[30vh] flex justify-center items-center ">
        Something went wrong!
      </div>
    );
  if (citiesLoading)
    return (
      <div className="h-[30vh] flex justify-center items-center ">
        <Loading />
      </div>
    );

  return (
    <div className="w-[94%] md:w-[70%] pb-[30px] flex flex-col items-center  ">
      <h2 className="font-bold mb-[4px] md:mb-[10px] mr-auto text-[16px] md:text-[24px]  ">
        Select a City
      </h2>
      <p className="font-normal mr-auto text-[12px] md:text-[16px] mb-[16px] md:mb-[30px] ">
        To check property rates & price trends
      </p>

      <div className=" flex items-start justify-start flex-wrap gap-[20px]  ">
        {currentCities && currentCities?.length > 0 ? (
          currentCities?.map((eachCity: any) => {
            const pageUrl = !path.includes("news")
              ? `${path}/${eachCity?.name.toLowerCase()}?si=${
                  eachCity?.stateId
                }&ci=${eachCity?.id}`
              : `${path}/${eachCity?.name.toLowerCase()}`;
            return (
              <Link
                rel="noopener noreferrer"
                key={eachCity.name}
                href={pageUrl}
              >
                <div className=" cursor-pointer min-h-[140px] md:min-h-[218px] w-[100px] md:w-[180px] rounded-[10px] border-t-[1px] border-solid shadow-md flex flex-col justify-center items-center transition-all duration-[0.5s] ease-[ease-in-out] hover:-translate-y-2.5 hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] ">
                  <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-[50%] shadow-md border-t-[1px] border-solid ">
                    {/* city image */}
                    <Image
                      src={bengalureImg}
                      quality={80}
                      height={630}
                      width={1200}
                      alt="blog Image"
                      className="rounded-[50%] w-full h-full relative"
                    />
                    {/* <span className='!min-w-[60px] !min-h-[60px] !md:min-w-[100px] !md:min-h-[100px] '>{defaultCitySvg}</span> */}
                  </div>
                  <span className=" font-medium text-[12px] md:text-[16px] mt-[10px] md:mt-[16px] text-center ">
                    {text} {eachCity.name}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex w-full h-full justify-center items-center flex-col relative top-[-30px]">
            <span className="max-h-[400px] max-w-[400px] ">
              {emptyFilesIcon}
            </span>
            No Matching Results Found!
            <span className="relative left-[10%]">{strikeIconIcon}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketSections;
