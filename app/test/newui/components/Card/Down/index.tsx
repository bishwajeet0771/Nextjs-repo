import Button from "@/app/elements/button";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import React from "react";
import { overlayAtom } from "../../../store/overlay";
import { useAtom, useSetAtom } from "jotai";
import { WhitePetFreindly } from "@/app/images/commonSvgs";
import selectedSearchAtom, {
  modalPopup,
  selectedNearByAtom,
} from "@/app/store/search/map";
import { searchPageMapToggle } from "@/app/(new_routes_seo)/search/store/projSearchStore";
// import { preventBackButton } from "@/app/components/molecules/popups/req";

export default function CardDownSection({
  a,
  o,
  B,
  type,
  projName,
  propName,
  projIdEnc,
  onAddingCompare,
  isCompared,
  handleOpen,
  propTypeId,
  isPetFriendly,
  amenCount,
  propIdEnc,
  propTypeName,
  title,
  propType,
  location,
  phaseId,
}: any) {
  const [lat, lang] = location?.split(",") ?? [];
  const isMobile = useMediaQuery("(max-width: 1600px)");
  const [, setMapPopup] = useAtom(modalPopup);
  const setNearby = useSetAtom(selectedNearByAtom);
  const setSelected = useSetAtom(selectedSearchAtom);

  // const name =
  //   type === "proj"
  //     ? projName
  //     : `${bhkName ?? ""} ${propTypeName} for
  //   ${cg === "R" ? "Rent" : "Sell"} in ${ltName}`;
  // const [, { open }] = useReqCallPopup();
  // const setPopReqData = useSetAtom(NearByDataAtom);
  // const handleOpen = () => {
  //   open({
  //     modal_type:
  //       type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
  //     postedByName: type === "proj" ? builderName : postedBy,
  //     postedId: builderId,
  //     reqId: reqId,
  //     source: type === "proj" ? "projCard" : "propCard",
  //     title:
  //       type === "proj"
  //         ? projName
  //         : `${bhkName ?? ""} ${propTypeName} for
  //     ${cg === "R" ? "Rent" : "Sell"} in ${localityName}`,
  //   });
  // };
  const dispatch = useSetAtom(overlayAtom);
  const setIsMapLoaded = useSetAtom(searchPageMapToggle);

  return (
    <div className="bg-white flex items-start gap-1 xl:gap-auto xl:px-[17px] xl:py-[9px] w-full p-2 justify-between flex-wrap sm:flex-nowrap">
      <div className="flex gap-[9px]">
        {type === "proj" ? (
          <>
            <CountListing
              type="Agent"
              value={a}
              projIdEnc={projIdEnc}
              projName={projName}
            />
            <CountListing
              type="Owner"
              value={o}
              projIdEnc={projIdEnc}
              projName={projName}
            />
            <CountListing
              type="Builder"
              value={B}
              projIdEnc={projIdEnc}
              projName={projName}
            />
            
          </>
        ) : (
          <>
            {isPetFriendly && propTypeName !== "Plot" ? (
              <div className="flex items-center space-x-1 bg-green-500 text-white font-bold py-1 px-3 text-xs rounded-full shadow-md">
                <WhitePetFreindly className="w-[20px] h-[20px] " />
                <span>Pet Friendly</span>
              </div>
            ) : null}

            {/* <button
              className="bg-cyan-500 text-white text-[12px] sm:text-sm py-0 font-bold px-1 sm:py-1 xl:px-2  rounded shadow-md hover:bg-cyan-600 transition duration-300 ease-in-out"
              onClick={() =>
                dispatch({
                  content: [
                    "Spacious Living Room with floor-to-ceiling windows providing ample natural light.",
                    "Modern Kitchen equipped with the latest appliances and an island countertop.",
                    "Master Bedroom Suite with a large walk-in closet and en-suite bathroom.",
                    "Rooftop Terrace offering panoramic views and a great space for entertaining.",
                    "Energy Efficient design with solar panels and high-efficiency HVAC systems.",
                    "Prime Location with easy access to public transportation and local amenities.",
                  ],
                  conType: "hightlights",
                  title: "Highlights",
                  id: `${projIdEnc}+${propTypeId}`,
                  type: "OPEN",
                })
              }
            >
              Highlights
            </button> */}
            {amenCount > 0 && (
              <button
                className="bg-orange-600 text-white text-[12px] sm:text-sm py-0 font-bold px-1 sm:py-1 xl:px-2  rounded shadow-md hover:bg-orange-800  transition duration-300 ease-in-out"
                title={`Click to view ${
                  amenCount === 1 ? "" : "all"
                } ${amenCount} ${amenCount === 1 ? "Amenity" : "Amenities"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    content: [],
                    conType: "amenities",
                    title: "Amenities",
                    id: `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
                      propTypeId ?? propTypeName ?? ""
                    }`,
                    type: "OPEN",
                    pType: type,
                    propId: propIdEnc,
                  });
                }}
              >
                <span className="bg-white rounded-full text-black px-2">
                  {amenCount}
                </span>{" "}
                Amenities
              </button>
            )}
            <button
              className="bg-teal-500 text-white text-right max-w-fit px-1 font-bold sm:py-1 sm:px-2 text-xs rounded shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out min-h-[28px] "
              title="Click to view Near by Locations"
              onClick={(e) => {
                setIsMapLoaded(true);
                title = "Click to view Near by Locations";
                e.stopPropagation();
                setNearby((prev: any) => ({
                  ...prev,
                  category: "",
                  data: {},
                  selectedNearbyItem: {},
                  id: "",
                  isOpen: false,
                  isLoader: true,
                }));
                setSelected({
                  lat,
                  lang,
                  type,
                  reqId: !propIdEnc ? projIdEnc : propIdEnc,
                  propType: !propIdEnc ? propType : propTypeName,
                  projOrPropName: propName ? propName : projName,
                  phaseId: phaseId ? phaseId : "",
                });
                if (isMobile)
                  setMapPopup((prev: any) => ({ ...prev, isOpen: true }));
                // console.log("near by 2");
                dispatch({
                  type: "OPEN",
                  content: [],
                  id: `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
                    propTypeId ?? propTypeName ?? ""
                  }`,
                  title: `NearBy Locations of ${title}`,
                  conType: "nearby",
                  pType: projIdEnc ? "proj" : "prop",
                  lat,
                  lang,
                  propId: propIdEnc,
                });
              }}
            >
              Nearby
            </button>
          </>
        )}
      </div>

      {/* right section */}
      {!isMobile && (
        <div className=" right-1 inline-flex">
          <button
            title={`Click to ${
              isCompared ? "Remove Compare" : "Add to Compare"
            }`}
            className="bg-btnPrimary rounded-[4px]  bottom-2 left-1 text-white text-[12px] px-1 font-bold"
            onClick={(e) => {
              e.stopPropagation();
              onAddingCompare();
            }}
          >
            {isCompared ? "Remove Compare" : "Add to Compare"}
          </button>
          <Button
            onChange={handleOpen}
            title={`${
              type === "proj"
                ? isMobile
                  ? "Contact"
                  : "Request Callback"
                : "Request Callback"
            }`}
            buttonClass="flex justify-end right-1  self-end text-[#FFF] ml-1 p-[3px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] xl:text-[12px] md:text-[12px] font-[700] text-nowrap"
          />
        </div>
      )}
    </div>
  );
}
type CountListProps = {
  value: number;
  type: "Agent" | "Owner" | "Builder";
  projIdEnc: string;
  projName: string;
};
const CountListing = ({ type, value, projIdEnc, projName }: CountListProps) => {
  const handleAgentOwner = (type: "A" | "I" | "B") => {
    window.open(
      `/search/listing?sf=projIdEnc=${projIdEnc}-listedBy=${type}-projName=${projName}`,
      "_self",
      "noreferrer"
    );
  };

  return (
    value > 0 && (
      <button
        title={`Click to view ${type} Listing`}
        onClick={(e) => {
          e.stopPropagation();
          handleAgentOwner(
            type === "Owner" ? "I" : type === "Builder" ? "B" : "A"
          );
        }}
        className={clsx(
          "flex flex-col justify-start  items-start gap-2 p-1 rounded border-[0.4px] border-solid",
          type === "Owner"
            ? "bg-[#FFF6ED] text-[#D66700] border-[#FF7A00]"
            : "bg-[#f0fff0]",
          value > 0
            ? "text-[#148B16] border-[#148B16] cursor-pointer"
            : "text-gray-400 border-[#5e5f5e] opacity-50 cursor-none"
        )}
      >
        <span
          className={`text-[12px] text-nowrap  xl:text-xs not-italic font-bold leading-[normal] ${
            value > 0 ? "underline" : ""
          }`}
        >
          {type} Listing : {value}
        </span>
      </button>
    )
  );
};
