/* eslint-disable jsx-a11y/no-static-element-interactions */
import selectedSearchAtom, {
  modalPopup,
  selectedNearByAtom,
} from "@/app/store/search/map";
import { useAtom, useSetAtom } from "jotai";
import React from "react";
import HeartButton from "../Center/HeartButton";
import { useMediaQuery } from "@mantine/hooks";
import ProjData from "../Center/ProjData";
import clsx from "clsx";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import DownloadBrocher from "../../DownloadBrocher";
import { overlayAtom } from "@/app/test/newui/store/overlay";
import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import Link from "next/link";
import { searchPageMapToggle } from "@/app/(new_routes_seo)/search/store/projSearchStore";

type Props = any;

export default function TopRightSection({
  agentListing,
  ownerListing,
  projName,
  // lat,
  // lang,
  Sh,
  onAddingShortList,
  projIdEnc,
  type,
  data,
  propIdEnc,
  propName,
  basePrice,
  brochureUrl,
  facing,
  propTypeId,
  towerName,
  atFloor,
  sqftPrice,
  floorPlan,
  propTypeName,
  propType,
  amenCount,
  category,
  phaseId,
  location,
  city,
  cityName,
  locality,
  localityName,
  phaseName,
  bhkName,
}: Props) {
  const setSelected = useSetAtom(selectedSearchAtom);
  const dispatch = useSetAtom(overlayAtom);

  // const url =
  //   type === "proj"
  //     ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/abc/banglore/whitefield/${projIdEnc}`
  //     : `${process.env.NEXT_PUBLIC_BACKEND_URL}/listing/whitefield/${propIdEnc}`;

  const isMobile = useMediaQuery("(max-width: 1600px)");
  const projOrPropName = type === "proj" ? projName : propName;
  // const handleClick = () => {
  //   // Get the div by ID and scroll to it
  //   const element = document.getElementById("mobileMap");
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const url =
    type === "proj"
      ? createProjectLinkUrl({
          city: cityName ? cityName : city ? city : "",
          locality: localityName ? localityName : locality ? locality : "",
          slug: projName ? projName : projName,
          projIdEnc: projIdEnc,
        })
      : generateListingLinkUrl({
          city: cityName,
          locality: localityName,
          projName: projIdEnc ? propName : null,
          category: category === "Sale" ? "for-sale" : "for-rent",
          phase: phaseName,
          propIdEnc: propIdEnc,
          bhkUnitType: bhkName
            ? `${bhkName + " " + propTypeName}`
            : "" + " " + propTypeName,
        });
  const [lat, lang] = location?.split(",") ?? [];
  const setNearby = useSetAtom(selectedNearByAtom);
  const [, setMapPopup] = useAtom(modalPopup);
  const setIsMapLoaded = useSetAtom(searchPageMapToggle);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "m-[2px]  xl:mr-3 xl:my-2 flex xl:gap-[0.5px] mx-2 max-h-full justify-between items-start flex-row xl:flex-col xl:items-end  xl:absolute top-0 right-0",
        type !== "proj" && ""
      )}
    >
      {category == "Sale" || type === "proj" ? (
        <div className="text-xs hidden xl:flex sm:text-base font-medium text-[#4f4f4f] text-nowrap absolute top-3 right-24  sm:top-0 sm:right-[65px]">
          Avg Price:{" "}
          <span className="font-bold ml-1">
            {" "}
            {/*  ₹{formatNumberWithSuffix(type === "proj" ? basePrice : sqftPrice)} */}
            ₹{formatNumberWithSuffix(type === "proj" ? basePrice : sqftPrice)}
          </span>
        </div>
      ) : null}

      {isMobile && (
        <>
          <ProjData type={type} {...data} />
          <div className="flex flex-col justify-between">
            <div className="flex flex-row md:flex-col gap-3 sm:gap-1 xl:gap-3  justify-end">
              <div className="gap-2 xl:gap-1 inline-flex justify-end">
               {/*  <HeartButton
                  shortListed={Sh}
                  onAddingShortList={onAddingShortList}
                /> */}
                 <button onClick={onAddingShortList}>
      {       Sh ? <p> ❤️ </p>: <p className="text-sm text-gray-700"> 🤍 </p> }
            </button>
                <button
                name="share Project"
                  className="gap-2 xl:gap-1 flex flex-row items-center align-middle  "
                  onClick={() => {
                    navigator.share({
                      title: type === "proj" ? projName : propName,
                      text: `Check out this ${
                        type === "proj" ? "project" : "property"
                      }: ${type === "proj" ? projName : propName}`,
                      url: url,
                    });
                  }}
                >
              🔗
                </button>
                {floorPlan && type !== "proj" && (
                  <div
                    onClick={() =>
                      window.open(
                        `/image?path=${
                          floorPlan.split(process.env.NEXT_PUBLIC_IMG_BASE)[1]
                        }&type=F`,
                        "_self"
                      )
                    }
                    className="xm:px-[1px] sm:py-[1px] inline-flex flex-row justify-center items-center xl:bg-[#F0F9FF] gap-0.5 rounded hover:cursor-pointer"
                  >
                   {/*  <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="4"
                            fill="#0073C6"
                            fillOpacity="0.1"
                          />
                          <path
                            d="M6 7C6 6.44772 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18H7C6.44772 18 6 17.5523 6 17V7Z"
                            stroke="#0073C6"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M6 9H18"
                            stroke="#0073C6"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M9 9V18"
                            stroke="#0073C6"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M12 12H15"
                            stroke="#0073C6"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M12 15H15"
                            stroke="#0073C6"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span className="text-[10px] hidden xl:flex text-[#0073C6] font-medium mt-0.5">
                          Floor Plan
                        </span>
                      </div>
                    </div> */}
               
                  </div>
                )}
                {/* <div
                  onClick={() => {
                    setNearby((prev:any) => ({...prev, category: "", selectedNearbyItem:{}, id:"", data:{}, isOpen: false }));
                    setMapPopup((prev:any) => ({...prev, isOpen: true}));
                    handleClick();
                    setSelected({
                      agentListing, 
                      ownerListing,
                      projOrPropName, 
                      lat,
                      lang,
                      type,
                      reqId: type === "proj" ? projIdEnc : propIdEnc,
                      propType: type === "proj" ? propType : propTypeName,
                    });
                  }}
                  className="inline-flex sm:hidden  xm:px-[1px] sm:py-[1px]  justify-center items-center xl:bg-[#F0F9FF] gap-0.5 rounded hover:cursor-pointer "
                >
                  <NewMapIcon className="w-6 h-6 " />
                </div> */}

                <button
                  title="Click to view on Map"
                  className="group flex sm:hidden mb-[4px] items-center bg-[linear-gradient(144deg,#00DDEB,#1b78f2_50%,#00DDEB)] shadow-[rgba(151,65,252,0.2)_0_15px_30px_-5px] box-border  justify-center leading-normal no-underline select-none touch-manipulation whitespace-nowrap cursor-pointer p-[3px] rounded-lg border-0 text-[12px] font-semibold hover:outline-none active:outline-none "
                  onClick={() => {
                    setIsMapLoaded(true);
                    setNearby((prev: any) => ({
                      ...prev,
                      category: "",
                      selectedNearbyItem: {},
                      data: {},
                      id: "",
                      isOpen: false,
                    }));
                    setMapPopup((prev: any) => ({ ...prev, isOpen: true }));
                    setSelected({
                      agentListing,
                      ownerListing,
                      projOrPropName,
                      lat,
                      lang,
                      type,
                      reqId: type === "proj" ? projIdEnc : propIdEnc,
                      propType: type === "proj" ? propType : propTypeName,
                      phaseId: phaseId,
                    });
                  }}
                >
                  <span className=" px-[4px] h-full w-full text-white transition-[300ms] rounded-md bg-transparent">
                    View Map
                  </span>
                </button>

                {/* 
                <button
                  className="hidden sm:flex max-w-fit sm:px-[1px] sm:py-[1px] rounded text-[#242424] text-sm not-italic font-semibold sm:my-1 md:mb-1 xl:gradient"
                  onClick={() => {
                    handleClick();
                    setSelected({
                      agentListing,
                      ownerListing,
                      projOrPropName,
                      lat,
                      lang,
                      type,
                      reqId: type === "proj" ? projIdEnc : propIdEnc,
                      propType: type === "proj" ? propType : propTypeName,
                    });
                  }}
                >
                 
                </button> */}
              </div>
              {/* <button
                className="max-w-fit sm:block hidden xl:hidden ml-auto px-[1px] py-[1px] rounded text-[#242424] text-xs not-italic font-semibold  md:mb-1 gradient"
                onClick={() => {
                  setNearby((prev:any) => ({...prev, category: "", selectedNearbyItem:{}, data:{}, id:"" }));

                  setSelected({
                    agentListing,
                    ownerListing,
                    projOrPropName, 
                    lat,
                    lang,
                    type,
                    reqId: type === "proj" ? projIdEnc : propIdEnc,
                    propType: type === "proj" ? propType : propTypeName,
                  })}
                }
              >
                {" "}
                <div className="py-[1px] px-[2px] inline-flex justify-center items-center bg-[#F0F9FF]  rounded">
                  {" "}
                  View on Map
                </div>
              </button> */}

              <button
                className="group sm:flex hidden md:mb-1 items-center bg-[linear-gradient(144deg,#00DDEB,#1b78f2_50%,#00DDEB)] shadow-[rgba(151,65,252,0.2)_0_15px_30px_-5px] box-border  justify-center leading-normal no-underline select-none touch-manipulation whitespace-nowrap cursor-pointer p-[3px] rounded-lg border-0 text-[12px] font-semibold hover:outline-none active:outline-none "
                title="Click to view on Map"
                onClick={() => {
                  setIsMapLoaded(true);
                  setNearby((prev: any) => ({
                    ...prev,
                    category: "",
                    selectedNearbyItem: {},
                    data: {},
                    id: "",
                    isOpen: false,
                  }));
                  setSelected({
                    agentListing,
                    ownerListing,
                    projOrPropName,
                    lat,
                    lang,
                    type,
                    reqId: type === "proj" ? projIdEnc : propIdEnc,
                    propType: type === "proj" ? propType : propTypeName,
                    phaseId: phaseId,
                  });
                }}
              >
                <span className="bg-white px-[6px] h-full w-full text-black group-hover:text-white transition-[300ms] rounded-md hover:bg-transparent">
                  View on Map
                </span>
              </button>
            </div>

            {/* <div className="flex items-end flex-col justify-between md:gap-2 mt-[2px]">
              <Button
                // onChange={() => onAddingCompare()}
                title={Com ? "Remove Compare" : " + Compare"}
                buttonClass="inline-flex justify-center items-center gap-1 xl:gap-2.5 rounded p-0.5 border-[0.5px] border-solid border-[#00A8CD] text-[#00A8CD] text-[12px]       sm:text-[12px] xl:text-xs not-italic font-semibold ml-auto rounded-full"
              />{" "}
            </div> */}
            {/* tab and laptop */}
            {type === "proj" && (
              <div className="flex flex-col space-y-1 justify-end items-end">
                {" "}
                {brochureUrl && <DownloadBrocher brochureUrl={brochureUrl} />}
                <button
                  title={`Click to view ${
                    amenCount === 1 ? "" : "all"
                  } ${amenCount} ${amenCount === 1 ? "Amenity" : "Amenities"}`}
                  className="bg-orange-500 text-white text-right max-w-fit px-[4px] py-[4px] md:py-[6px] sm:px-2 font-bold  rounded hover:bg-orange-600 focus:outline-none text-xs text-nowrap  inline-flex"
                  onClick={() =>
                    dispatch({
                      type: "OPEN",
                      content: [],
                      id: `${projIdEnc}+${propTypeId}+${phaseId}`,
                      title: "Amenities",
                      conType: "amenities",
                      pType: type,
                    })
                  }
                >
                  {amenCount} {amenCount === 1 ? "Amenity" : "Amenities"}
                </button>
                <button
                  className="bg-teal-500 text-white text-right max-w-fit font-bold px-[4px] py-[4px] sm:px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out"
                  title="Click to view all Near by Locations"
                  onClick={() => {
                    setIsMapLoaded(true);
                    setNearby((prev: any) => ({
                      ...prev,
                      category: "",
                      data: {},
                      selectedNearbyItem: {},
                      id: "",
                      isOpen: false,
                      isLoader: true,
                    }));
                    // setSelected(null);
                    setSelected({
                      lat: data.lat,
                      lang: data.lang,
                      type: data.type,
                      reqId: !propIdEnc ? projIdEnc : propIdEnc,
                      propType: !propIdEnc ? propType : propTypeName,
                      projOrPropName: propName ? propName : projName,
                      phaseId: phaseId,
                    });
                    if (isMobile)
                      setMapPopup((prev: any) => ({ ...prev, isOpen: true }));
                    dispatch({
                      type: "OPEN",
                      content: [],
                      id: `${projIdEnc}+${propTypeId}${
                        phaseId ? `+${phaseId}` : ""
                      }`,
                      title: `NearBy Locations of ${projName}`,
                      conType: "nearby",
                      pType: type,
                      lat,
                      lang,
                    });
                  }}
                >
                  Nearby
                </button>
              </div>
            )}
            {(type === "proj" || type === null || category == "Sale") && (
              <div className="text-xs flex xl:hidden sm:text-base font-semibold text-[#4f4f4f] mt-[4px] justify-end items-end ">
                <p className="text-right text-[12px] md:text-[14px] text-nowrap ">
                  Avg Price:
                  <span className="text-[#148B16]">
                    ₹{" "}
                    {formatNumberWithSuffix(
                      type === "proj" ? basePrice : sqftPrice
                    )}
                  </span>
                </p>
                {/*  <p className="text-right text-[12px] text-nowrap">
                    {towerData ? towerData : "N/A"}
                  </p> */}
              </div>
            )}

            {type !== "proj" && (
              <>
                <ListingDownSectionCard label={"Tower"} value={towerName} />
                <ListingDownSectionCard label={"Facing"} value={facing} />
                {/* <ListingDownSectionCard
                  label={"Property Age"}
                  value={propertyAge}
                /> */}
                <ListingDownSectionCard
                  label={
                    propTypeName === "Row House" || propTypeName === "Villa"
                      ? "Elevation"
                      : "At Floor"
                  }
                  value={atFloor == 0 ? "G" : atFloor}
                />
              
              </>
            )}
          </div>
        </>
      )}
      {!isMobile && (
        <div>
          <div className="flex  flex-col justify-center  h-auto items-end">
            <div className="space-x-2 flex flex-row justify-center">
              <HeartButton
                shortListed={Sh}
                onAddingShortList={onAddingShortList}
              />
              <button
                className="space-x-2 flex flex-row justify-center"
                onClick={() =>
                  navigator.share({
                    title: type === "proj" ? projName : propName,
                    text: `Check out this ${
                      type === "proj" ? "project" : "property"
                    }: ${type === "proj" ? projName : propName}`,
                    url: url,
                  })
                }
              >
                {config.shareIcon}
              </button>
            </div>
            {/* <button
              className="max-w-fit px-[1px] py-[1px] rounded text-[#242424] text-xs not-italic font-semibold my-2 md:mb-1 gradient"
              onClick={() => {
                setSelected({
                  agentListing,
                  ownerListing,
                  projOrPropName,
                  lat,
                  lang,
                  type,
                  reqId: type === "proj" ? projIdEnc : propIdEnc,
                  propType: type === "proj" ? propType : propTypeName,
                })
                setNearby( (prev:any) => ({...prev, category: "", data:{}, id:"" }) );
              }}
            >
              {" "}
              <div className="py-[1px] px-[2px] inline-flex justify-center items-center bg-[#F0F9FF]  rounded">
                {" "}
                View on Map
              </div>
            </button> */}

            <button
              className="group md:mb-1 items-center bg-[linear-gradient(144deg,#00DDEB,#1b78f2_50%,#00DDEB)] shadow-[rgba(151,65,252,0.2)_0_15px_30px_-5px] box-border flex justify-center leading-normal no-underline select-none touch-manipulation whitespace-nowrap cursor-pointer p-[3px] rounded-lg border-0 text-[12px] font-semibold group-hover:outline-none active:outline-none "
              title="Click to view on Map"
              onClick={() => {
                setIsMapLoaded(true);
                setNearby((prev: any) => ({
                  ...prev,
                  category: "",
                  isOpen: false,
                  selectedNearbyItem: {},
                  data: {},
                  id: "",
                }));
                setSelected({
                  agentListing,
                  ownerListing,
                  projOrPropName,
                  lat,
                  lang,
                  type,
                  reqId: type === "proj" ? projIdEnc : propIdEnc,
                  propType: type === "proj" ? propType : propTypeName,
                  phaseId: phaseId,
                });
              }}
            >
              <span className="bg-white h-full w-full px-[6px] text-black group-hover:text-white transition-[300ms] rounded-md group-hover:bg-transparent">
                View on Map
              </span>
            </button>

            {type !== "proj" && (
              <>
                <ListingDownSectionCard label={"Tower"} value={towerName} />
                <ListingDownSectionCard label={"Facing"} value={facing} />
                {/* <ListingDownSectionCard
                  label={"Property Age"}
                  value={propertyAge}
                /> */}
                <ListingDownSectionCard
                  label={
                    propTypeName === "Row House" || propTypeName === "Villa"
                      ? "Elevation"
                      : "At Floor"
                  }
                  value={
                    propTypeName === "Row House" || propTypeName === "Villa"
                      ? `G+${atFloor}`
                      : atFloor == 0
                      ? "G"
                      : atFloor
                  }
                />
                {floorPlan && (
                  <Link
                    title="Click to view Floor Plan"
                    className="text-[14px]  text-btnPrimary  font-bold mt-2"
                    href={`/image?path=${
                      floorPlan.split(process.env.NEXT_PUBLIC_IMG_BASE)[1]
                    }&type=F`}
                    // onClick={() =>
                    //   window.open(
                    //     `/image?path=${
                    //       floorPlan.split(process.env.NEXT_PUBLIC_IMG_BASE)[1]
                    //     }&type=F`,
                    //     "_self"
                    //   )
                    // }
                  >
                    <span className="hidden sm:flex">View Floor Plan</span>
                  </Link>
                )}
              </>
            )}
          </div>
          {type === "proj" && (
            <div className="flex  items-end flex-col gap-2">
              {brochureUrl && <DownloadBrocher brochureUrl={brochureUrl} />}
              {amenCount && (
                <button
                  className="bg-orange-500 text-white py-1 px-2 font-bold  rounded hover:bg-orange-600 focus:outline-none text-xs "
                  title={`Click to view ${
                    amenCount === 1 ? "" : "all"
                  } ${amenCount} ${amenCount === 1 ? "Amenity" : "Amenities"}`}
                  onClick={() =>
                    dispatch({
                      type: "OPEN",
                      content: [],
                      id: `${projIdEnc}+${propTypeId}${
                        phaseId ? `+${phaseId}` : ""
                      }`,
                      title: "Amenities",
                      conType: "amenities",
                      pType: type,
                    })
                  }
                >
                  {amenCount} {amenCount === 1 ? "Amenity" : "Amenities"}
                </button>
              )}

              <button
                className="bg-teal-500 text-white font-bold py-1 px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out"
                title="Click to view all Near by Locations"
                onClick={() => {
                  setIsMapLoaded(true);
                  setNearby((prev: any) => ({
                    ...prev,
                    category: "",
                    data: {},
                    selectedNearbyItem: {},
                    id: "",
                    isOpen: false,
                    isLoader: true,
                  }));
                  // setSelected(null);
                  setSelected({
                    lat: data.lat,
                    lang: data.lang,
                    type: data.type,
                    reqId: !propIdEnc ? projIdEnc : propIdEnc,
                    propType: !propIdEnc ? propType : propTypeName,
                    projOrPropName: propName ? propName : projName,
                    phaseId: phaseId,
                  });
                  dispatch({
                    type: "OPEN",
                    content: [
                      "Orion Mall",
                      "Apollo Hospital",
                      "Greenwood High International School",
                      "MG Road Metro Station",
                      "Major Bus Stop",
                      "City Park",
                      "Central Library",
                      "Fitness Center",
                      "Local Market",
                      "Coffee Shop",
                      "Bank",
                      "Post Office",
                      "Restaurant",
                      "Pharmacy",
                      "Veterinary Clinic",
                    ],
                    id: `${projIdEnc}+${propTypeId ?? ""}${
                      phaseId ? `+${phaseId}` : ""
                    }`,
                    title: `NearBy Locations of ${projName}`,
                    conType: "nearby",
                    pType: type,
                    lat,
                    lang,
                  });
                }}
              >
                Nearby
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const ListingDownSectionCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon?: React.JSX.Element;
}) => {
  return (
    value && (
      <p className="text-[#001F35] text-[12px]   xl:text-sm not-italic font-medium text-wrap  inline-flex max-w-fit ml-auto">
        {Icon} {label}:{" "}
        <span className="text-[#242424] text-[12px] xl:text-[14px]  not-italic  font-bold text-nowrap ml-1 ">
          {" "}
          {value}
        </span>
      </p>
      // <p className="text-[#242424] text-[12px] xl:text-[14px]  not-italic mt-[1px] font-bold text-nowrap ml-1 mt-0.5">
      //   {" "}

      // </p>
    )
  );
};

const config = {
  shareIcon: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13"
        cy="13"
        r="12.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <path
        d="M11.2391 13.5434C11.2391 14.0522 11.037 14.5401 10.6773 14.8999C10.3175 15.2597 9.82954 15.4618 9.32075 15.4618C8.81195 15.4618 8.324 15.2597 7.96423 14.8999C7.60446 14.5401 7.40234 14.0522 7.40234 13.5434C7.40234 13.0346 7.60446 12.5467 7.96423 12.1869C8.324 11.8271 8.81195 11.625 9.32075 11.625C9.82954 11.625 10.3175 11.8271 10.6773 12.1869C11.037 12.5467 11.2391 13.0346 11.2391 13.5434Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
      <path
        d="M15.0751 9.32227L11.2383 12.008M15.0751 17.7632L11.2383 15.0775"
        stroke="#616D75"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.911 18.5308C18.911 19.0396 18.7089 19.5276 18.3491 19.8873C17.9894 20.2471 17.5014 20.4492 16.9926 20.4492C16.4838 20.4492 15.9959 20.2471 15.6361 19.8873C15.2763 19.5276 15.0742 19.0396 15.0742 18.5308C15.0742 18.022 15.2763 17.5341 15.6361 17.1743C15.9959 16.8145 16.4838 16.6124 16.9926 16.6124C17.5014 16.6124 17.9894 16.8145 18.3491 17.1743C18.7089 17.5341 18.911 18.022 18.911 18.5308ZM18.911 8.55512C18.911 9.06391 18.7089 9.55187 18.3491 9.91164C17.9894 10.2714 17.5014 10.4735 16.9926 10.4735C16.4838 10.4735 15.9959 10.2714 15.6361 9.91164C15.2763 9.55187 15.0742 9.06391 15.0742 8.55512C15.0742 8.04633 15.2763 7.55838 15.6361 7.19861C15.9959 6.83884 16.4838 6.63672 16.9926 6.63672C17.5014 6.63672 17.9894 6.83884 18.3491 7.19861C18.7089 7.55838 18.911 8.04633 18.911 8.55512Z"
        stroke="#616D75"
        strokeWidth="1.5"
      />
    </svg>
  ),
};
