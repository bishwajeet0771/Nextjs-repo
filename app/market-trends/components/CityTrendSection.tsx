"use client";
import React, { useEffect, useState } from "react";
import { listingProps } from "@/app/data/projectDetails";
import {
  emptyFilesIcon,
  LikeIcon,
  strikeIconIcon,
  defaultCitySvg
} from "@/app/images/commonSvgs";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { formatCurrency } from "@/app/utils/numbers";
import { useAtom } from "jotai";
import { trendsFilterData } from "../data.ts/marketBlogalData";
import { formatNumberWithCommas } from "@/app/seo/sitemap/const";
import Loading from "@/app/components/atoms/Loader";
import Link from "next/link";

type Props = {
  cityName: string;
};

const localityCheckList = [
  { name: "Property" },
  { name: "Societies" },
  { name: "Transectin Price" },
  { name: "Ratings and Reviews" },
  { name: "All Insights" },
];

const filtersStaticData = {
  allZones: [
    { value: "", name: "All Zones" },
    { value: "1", name: "Bangalore South" },
    { value: "2", name: "Bangalore East" },
    { value: "3", name: "Bangalore North" },
    { value: "4", name: "Bangalore West" },
  ],
  duration: [
    { value: "1", name: "1 year" },
    { value: "3", name: "3 year" },
    { value: "4", name: "4 year" },
    { value: "max", name: "Max" },
  ],
  sigment: [
    { value: "", name: "All" },
    { value: "1", name: "Affordable" },
    { value: "2", name: "Mid" },
    { value: "3", name: "Premium" },
  ],
  category: [
    { value: "S", name: "Sale" },
    { value: "R", name: "Rent" },
  ],
};

const PriceCard = ({
  eachCity,
  cityId,
  filters,
}: {
  eachCity: any;
  cityId: any;
  filters: any;
}) => {
  const [popupData, setPopupData] = useState({
    isOpen: false,
    data: null,
    boxId: null,
  });
  const onSelectBox = (identifier: string, data: any) => {
    if (identifier === "OPEN") {
      setPopupData({ isOpen: true, data: data, boxId: data.propIdEnc });
    } else {
      setPopupData({ isOpen: false, data: null, boxId: null });
    }
  };
  // console.log(eachCity);
  return (
    <div
      key={eachCity.localityName}
      className="group px-[10px] md:px-[30px] w-full p-[10px] rounded-[10px] border-t-[1px] border-solid shadow-md hover:shadow-lg flex flex-col items-center justify-between transition-all duration-[0.5s]  "
    >
      {/* Top section */}
      <div
        onClick={() =>
          onSelectBox(!popupData.isOpen ? "OPEN" : "CLOSE", eachCity)
        }
        className="flex items-center justify-between cursor-pointer w-full md:min-h-[124px] gap-[10px] md:gap-[20px] "
      >
        <div className="flex items-center xl:flex-nowrap flex-wrap w-full gap-[20px]">
          <div className="flex items-center gap-[10px] mr-[100%] md:mr-[0%] mb-[10px] md:mb-0 md:min-w-[270px] ">
            <div className=" min-w-[44px] md:min-w-[44px] w-[44px] h-[44px] md:w-[64px] md:h-[64px] rounded-[50%] shadow-md border-t-[1px] border-solid ">
              {/* city image */}
              {eachCity.coverImage ? (
                <Image
                  className="w-[44px] h-[44px] md:w-[64px] md:h-[64px] rounded-[50%] shadow-md"
                  alt="Locality"
                  src={eachCity.coverImage}
                  width={64}
                  height={64}
                />
              ) : (
                defaultCitySvg
              )}
            </div>
            <div>
              <p className="font-bold text-[12px] md:text-[16px] text-nowrap ">
                {eachCity.localityName}
              </p>
              <p className=" text-gray-700 first-letter: capitalize text-[12px] md:text-[16px] p-0 m-0">
                {eachCity.cityName ? eachCity.cityName : ""}
              </p>
              <span className="text-[10px] text-white bg-gray-600 p-[2px] font-medium rounded-[4px] ">
                {eachCity.propTypeName === "Independent House/Building"
                  ? "Independent House"
                  : eachCity.propTypeName}
              </span>
            </div>
          </div>

          <div className="md:min-w-[210px]">
            <p className="text-gray-700 text-[12px] md:text-[16px] ">
              Rate on GetRightProperty
            </p>
            {filters.cg == "R" ? (
              <p className="font-bold text-[12px] md:text-[16px] ">
                {formatCurrency(Number(eachCity.price))}
              </p>
            ) : (
              <p className="font-bold text-[12px] md:text-[16px] ">
                {formatCurrency(Number(eachCity.sqftPrice))} / sq.ft
              </p>
            )}
          </div>

          {filters.propType !== "Plot" && (
            <div className="md:min-w-[160px]">
              <p className="text-gray-700 text-[12px] md:text-[16px] ">
                Super Buildup Area
              </p>
              <p className="font-bold text-[12px] md:text-[16px] ">
                {formatNumberWithCommas(eachCity.sba)} sq.ft
              </p>
            </div>
          )}

          {filters.propType === "Plot" && (
            <div className="md:min-w-[160px]">
              <p className="text-gray-700 text-[12px] md:text-[16px] ">
                Plot Area
              </p>
              <p className="font-bold text-[12px] md:text-[16px] ">
                {formatNumberWithCommas(eachCity.pa)} sq.ft
              </p>
            </div>
          )}

          {filters.cg == "R" && eachCity.rate && (
            <div>
              <p className="text-gray-700 text-[12px] md:text-[16px]">
                Rental Yield
              </p>
              <p className="font-bold text-[12px] md:text-[16px] ">
                {eachCity.rate}%
              </p>
            </div>
          )}
        </div>
        <div className="min-w-[30px] md:min-w-[40px] w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center cursor-pointer border-solid border-[1px] border-gray-300 rounded-full shadow-md ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            className={` rotate-[-90deg] w-[16px] h-[16px] md:w-[24px] md:h-[24px] relative right-[1px] top-[2px] transition-all duration-500 flex justify-center items-center ${
              popupData.boxId === eachCity.propIdEnc && popupData.isOpen
                ? "rotate-[90deg]"
                : ""
            } `}
          >
            <path
              d="M6.125 15.2305H23.625C23.8571 15.2305 24.0796 15.1383 24.2437 14.9742C24.4078 14.8101 24.5 14.5875 24.5 14.3555C24.5 14.1234 24.4078 13.9008 24.2437 13.7367C24.0796 13.5727 23.8571 13.4805 23.625 13.4805H6.125C5.89294 13.4805 5.67038 13.5727 5.50628 13.7367C5.34219 13.9008 5.25 14.1234 5.25 14.3555C5.25 14.5875 5.34219 14.8101 5.50628 14.9742C5.67038 15.1383 5.89294 15.2305 6.125 15.2305Z"
              fill="#666666"
            />
            <path
              d="M6.48686 14.3563L13.7441 7.10082C13.9084 6.93651 14.0007 6.71367 14.0007 6.48132C14.0007 6.24896 13.9084 6.02612 13.7441 5.86182C13.5798 5.69751 13.357 5.60521 13.1246 5.60521C12.8923 5.60521 12.6694 5.69751 12.5051 5.86182L4.63011 13.7368C4.54863 13.8181 4.48398 13.9147 4.43986 14.021C4.39575 14.1273 4.37305 14.2412 4.37305 14.3563C4.37305 14.4714 4.39575 14.5854 4.43986 14.6917C4.48398 14.798 4.54863 14.8945 4.63011 14.9758L12.5051 22.8508C12.6694 23.0151 12.8923 23.1074 13.1246 23.1074C13.357 23.1074 13.5798 23.0151 13.7441 22.8508C13.9084 22.6865 14.0007 22.4637 14.0007 22.2313C14.0007 21.999 13.9084 21.7761 13.7441 21.6118L6.48686 14.3563Z"
              fill="#666666"
            />
          </svg>
        </div>
      </div>

      {/* popup data */}
      <div
        className={`w-full opacity-0 transition-all duration-500 mt-[10px] md:mt-0 ${
          popupData.boxId === eachCity.propIdEnc && popupData.isOpen
            ? "opacity-100"
            : ""
        }`}
      >
        {popupData.boxId === eachCity.propIdEnc && popupData.isOpen && (
          <div className={`w-full`}>
            <p className="mb-[10px] font-semibold text-gray-700 text-[12px] md:text-[16px] ">
              Quick Links for {eachCity.localityName}
            </p>
            <div className=" flex flex-wrap gap-[10px] w-full ">
              {localityCheckList.map((each) => {
                return (
                  <Link
                    rel="noopener noreferrer"
                    key={each.name}
                    href={`/search?sf=city=${eachCity.cityName}%2B${cityId}-cg=${filters.cg}`}
                  >
                    <p
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white cursor-pointer border-[1px] flex items-center gap-[4px] border-solid border-gray rounded-[30px] h-[30px] text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize text-gray-600 p-[4px] px-[10px] hover:bg-gray-200 "
                    >
                      {/* /search?sf=city=Chennai%2B580-cg=S */}
                      {`${each.name} in ${eachCity.localityName}`}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 14 15"
                        fill="none"
                      >
                        <path
                          d="M9.5 4H13.5V8"
                          stroke="#4B77C1"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13.5 4L7.85 9.65C7.75654 9.74161 7.63088 9.79293 7.5 9.79293C7.36912 9.79293 7.24346 9.74161 7.15 9.65L4.85 7.35C4.75654 7.25839 4.63088 7.20707 4.5 7.20707C4.36912 7.20707 4.24346 7.25839 4.15 7.35L0.5 11"
                          stroke="#4B77C1"
                          strokeWidth="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </p>
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-between mt-[16px] flex-wrap  ">
              <div className="flex items-center gap-[6px] mb-[6px] md:mb-0 ">
                <span className=" text-[12px] text-nowrap ">
                  Is this helpful?
                </span>
                <button
                  className={`bg-white font-bold border-0 rounded-[30px] not-italic leading-[normal] capitalize text-[12px] text-gray-700 flex items-center gap-[2px] bg-transparent `}
                  onClick={() => ""}
                >
                  Yes <LikeIcon className="w-[18px] h-[18px] fill-gray-600 " />
                </button>

                <button
                  className={`bg-white font-bold border-0 rounded-[30px] not-italic leading-[normal] capitalize text-[12px] text-gray-700 flex items-center gap-[2px] bg-transparent`}
                  onClick={() => ""}
                >
                  No{" "}
                  <LikeIcon className="rotate-180 w-[18px] h-[18px] fill-gray-600 " />
                </button>
              </div>

              <p className=" leading-[normal] capitalize text-[12px] text-gray-700 text-nowrap">
                Last updated in Jan-2025
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const initialFilters = {
  trendType: "L",
  zone: "",
  propType: "Apartment",
  duration: "",
  sigment: "",
  cg: "S",
};

const TrendFilters = ({
  filters,
  onFilterChange,
}: {
  filters: any;
  onFilterChange: any;
}) => {
  return (
    <div className="flex flex-col md:min-w-[240px] md:max-w-[260px] xl:min-w-[260px] xl:max-w-[260px] shadow-md rounded-[10px]  md:!top-[70px] border-t-[2px] border-solid p-[10px] order-1 md:order-2 max-h-[300px] md:sticky top-[100px]  ">
      <h3 className="mb-[10px] text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize">
        Show Price Trends for
      </h3>
      {/* <div className="flex justify-start items-center gap-[10px] mb-[10px] md:mb-[16px] ">
        <button
          className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] h-[24px] md:h-[30px] text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7]  p-[4px] px-[8px] ${
            filters.trendType === "L"
              ? "!bg-[#99c7e7] !text-white !border-0"
              : ""
          } `}
          onClick={onFilterChange}
          name="trendType"
          value="L"
        >
          Localities
        </button>

        <button
          className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] h-[24px] md:h-[30px] text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[4px] px-[8px] ${
            filters.trendType === "S"
              ? "!bg-[#99c7e7] !text-white !border-0"
              : ""
          } `}
          onClick={onFilterChange}
          name="trendType"
          value="S"
        >
          Societies
        </button>
      </div> */}

      {/* <h3 className="mb-[10px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize">
        Select Zone
      </h3>
      <div className="mb-[12px] ">
        {filtersStaticData.allZones.map((eachZone) => {
          return (
            <div
              key={eachZone.name}
              className="flex items-center gap-[8px] mb-[4px] "
            >
              <input
                type="radio"
                name="zone"
                id={`zone-${eachZone.value}`}
                className=" w-[16px] h-[16px] cursor-pointer "
                value={eachZone.value}
                checked={filters.zone === eachZone.value}
                onClick={onFilterChange}
              />
              <label
                htmlFor={`zone-${eachZone.value}`}
                className="text-[12px] md:text-[14px]"
              >
                {eachZone.name}
              </label>
            </div>
          );
        })}
      </div> */}

      <h3 className="mb-[10px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize">
        Category
      </h3>
      <div className="flex flex-wrap gap-[10px] mb-[10px] md:mb-[16px] ">
        {filtersStaticData.category.map((eachZone) => {
          return (
            <button
              key={eachZone.name}
              className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] md:h-[30px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[2px] px-[6px] md:p-[4px] md:px-[8px] ${
                filters.cg === eachZone.value
                  ? "!bg-[#99c7e7] !text-white !border-0"
                  : ""
              } `}
              onClick={onFilterChange}
              name="cg"
              value={eachZone.value}
            >
              {eachZone.name}
            </button>
          );
        })}
      </div>

      <h3 className="mb-[10px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize">
        Property Type
      </h3>
      <div className="flex flex-wrap gap-[10px] mb-[10px] md:mb-[16px] ">
        {Object.keys(listingProps).map((eachProp) => {
          return (
            <button
              key={eachProp}
              className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] md:h-[30px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[2px] px-[6px] md:p-[4px] md:px-[8px] ${
                filters.propType === eachProp
                  ? "!bg-[#99c7e7] !text-white !border-0"
                  : ""
              } `}
              onClick={onFilterChange}
              name="propType"
              value={eachProp}
            >
              {eachProp === "Independent House/Building"
                ? "Independent"
                : eachProp}
            </button>
          );
        })}
      </div>

      {/* <h3 className="mb-[10px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize">
        Duration
      </h3>
      <div className="flex flex-wrap gap-[10px] mb-[10px] md:mb-[16px] ">
        {filtersStaticData.duration.map((eachZone) => {
          return (
            <button
              key={eachZone.name}
              className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] md:h-[30px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[2px] px-[6px] md:p-[4px] md:px-[8px] ${
                filters.duration === eachZone.value
                  ? "!bg-[#99c7e7] !text-white !border-0"
                  : ""
              } `}
              onClick={onFilterChange}
              name="duration"
              value={eachZone.value}
            >
              {eachZone.name}
            </button>
          );
        })}
      </div> */}

      {/* <h3 className="mb-[10px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize">
        Price Segment
      </h3>
      <div className="flex flex-wrap gap-[10px] mb-[10px] md:mb-[16px] ">
        {filtersStaticData.sigment.map((eachZone) => {
          return (
            <button
              key={eachZone.name}
              className={`bg-white border-[1px] border-solid border-[#47a5e9] rounded-[30px] md:h-[30px]  text-[12px] md:text-[14px] not-italic font-semibold leading-[normal] capitalize text-[#37a7f7] p-[2px] px-[6px] md:p-[4px] md:px-[8px] ${
                filters.sigment === eachZone.value
                  ? "!bg-[#99c7e7] !text-white !border-0"
                  : ""
              } `}
              onClick={onFilterChange}
              name="sigment"
              value={eachZone.value}
            >
              {eachZone.name}
            </button>
          );
        })}
      </div> */}
    </div>
  );
};

// interface Locality {
//   id: string;
//   name: string;
// }

// interface City {
//   id: string;
//   name: string;
// }

function CityTrendSection({ cityName }: Props) {
  const [filters, setFilters] = useState(initialFilters);
  const [AllLocalities, setAllLocalities] = useState({
    data: [],
    isLoading: true,
  });

  const [{ inputSearch }] = useAtom(trendsFilterData);

  const onFilterChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const getParams = useSearchParams();
  const cityId = getParams.get("ci");

  // const {  data: AllLocalities } = useQuery<Locality[], Error>({
  //   queryKey: ["all-localities"],
  //   queryFn: () => getFilteredSearchData(cityId, null, filters.cg),
  //   ...RTK_CONFIG,
  //   enabled: true,
  // });

  type PropertyType =
    | "Apartment"
    | "Villa"
    | "Plot"
    | "Row House"
    | "Villament"
    | "Independent House/Building";

  useEffect(() => {
    setAllLocalities((prev) => ({ ...prev, isLoading: true }));
    const propertyType: PropertyType = filters.propType as PropertyType;
    const fetchData = async () => {
      try {
        const data: any = await getFilteredSearchData(
          cityId,
          null,
          filters.cg,
          `cg=${filters.cg}&propType=${listingProps[propertyType]}`
        );
        setAllLocalities({ data: data, isLoading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        setAllLocalities((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, [cityId, filters.cg, filters.propType]);

  const filteredLocalities = AllLocalities?.data?.filter(
    (city: any) =>
      inputSearch === "" ||
      city.localityName.toLowerCase().includes(inputSearch)
  );

  if (AllLocalities.isLoading)
    return (
      <div className="h-[30vh] flex justify-center items-center ">
        <Loading />
      </div>
    );

  return (
    <div className="w-[96%] md:w-[90%] xl:w-[70%] pb-[30px] gap-[20px] flex flex-col items-start justify-between overflow-y-auto relative px-[6px] max-w-[1200px]">
      <div className=" flex flex-col ">
        <h2 className="font-bold mb-[4px] mr-auto text-[18px] ">
          Property Rates in {cityName}
        </h2>
        <p className="font-medium mr-auto text-[14px] text-gray-500  ">
          {filteredLocalities && filteredLocalities?.length
            ? filteredLocalities?.length
            : 0}{" "}
          Localities in {cityName}
        </p>
      </div>

      <div className="flex justify-between w-full gap-[20px] flex-col md:flex-row relative ">
        <div className="flex flex-col items-center order-2 md:order-1 ">
          {filteredLocalities && filteredLocalities?.length > 0 ? (
            <div className=" flex items-start justify-start flex-wrap gap-[20px] w-full relative">
              {filteredLocalities?.map((eachCity: any) => {
                return (
                  <PriceCard
                    key={eachCity?.propIdEnc}
                    eachCity={eachCity}
                    cityId={cityId}
                    filters={filters}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex w-full h-full justify-center items-center flex-col relative top-[-30px]">
              <div className="flex justify-center items-center flex-col">
                <span className="max-h-[400px] max-w-[400px]">
                  {emptyFilesIcon}
                </span>
                No Matching Results Found!
                <span className="relative left-[10%]">{strikeIconIcon}</span>
              </div>
            </div>
          )}
        </div>
        <TrendFilters filters={filters} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
}

export default CityTrendSection;

const getFilteredSearchData = async (
  city: number | string | null,
  locality: number | string | null,
  cg: number | string | null,
  filters?: string
) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/srp/prop-search?page=0&city=${city}`;
    const url = `${baseUrl}${filters ? `&${filters}` : ""}`;
    const res = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
