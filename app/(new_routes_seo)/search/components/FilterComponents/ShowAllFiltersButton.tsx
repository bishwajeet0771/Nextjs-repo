/* eslint-disable no-unused-vars */
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import React, { useEffect, useState } from "react";
import {
  MdTune,
  MdKeyboardArrowDown,
  MdApartment,
  MdHouse,
  MdVilla,
  MdMapsHomeWork,
  MdLandscape,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { toFormattedString } from "./buget/budget";
import { useAtom, useAtomValue } from "jotai";
import { projSearchStore } from "../../store/projSearchStore";
import LocalitySearch from "./city/searchInputSearch";
import useProjSearchAppliedFilters from "../../hooks/useProjSearchAppliedFilters";
import { useDebouncedState } from "@mantine/hooks";
import { serverCityAtom } from "@/app/store/search/serverCity";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import { usePathname } from "next/navigation";
import RTK_CONFIG from "@/app/config/rtk";
import CustomRangeSlider from "@/app/components/atoms/RangeSlider";

interface ShowAllFiltersButtonProps {
  selectedFilters: { [key: string]: string[] };
  toggleFilter: (category: string, value: string) => void;
  isOpen: boolean;

  onToggle: () => void;
  isListing?: boolean;
}
interface Location {
  name: string;
  stringUrl: null | string;
  stringId: string;
  type: string;
}

export default function ShowAllFiltersButton({
  isOpen,

  onToggle,
  isListing,
}: ShowAllFiltersButtonProps) {
  const path = usePathname();
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  const { handleClearFilters, handleApplyFilters } =
    useProjSearchAppliedFilters();

  const [state, dispatch] = useAtom(projSearchStore);
  const propertyiconss = {
    apt: {
      id: 35,
      name: "Apartment",
      icon: <MdApartment className="w-5 h-5 text-green-700" />,
    },
    Rwh: {
      id: 33,
      name: "RowHouse",
      icon: <MdHouse className="w-5 h-5 text-green-700" />,
    },
    vil: {
      id: 31,
      name: "Villa",
      icon: <MdVilla className="w-5 h-5 text-green-700" />,
    },
    vlmt: {
      id: 34,
      name: "Villament",
      icon: <MdMapsHomeWork className="w-5 h-5 text-green-700" />,
    },
    plt: {
      id: 32,
      name: "Plot",
      icon: <MdLandscape className="w-5 h-5 text-green-700" />,
    },
    ...(("/search/listing" === path ||
      ("/search" === path && state.listedBy !== null)) && {
      indp: {
        id: 36,
        name: "Independent",
        icon: <MdLandscape className="w-5 h-5 text-green-700" />,
      },
    }),
  };

  const toggleExpand = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getPhasesData = async () => {
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post-project/phase-name-by-project?projIdEnc=${state?.projIdEnc}`;
    const res = await fetch(url);
    const responseData = await res.json();
    return responseData;
  };

  const { data, isLoading: PHASElOADING } = useQuery({
    queryKey: ["phases"],
    queryFn: () => getPhasesData(),
    enabled: state.projIdEnc !== null,
    ...RTK_CONFIG,
  });
  let phaseObjList: any = [];
  if (data && Object.keys(data).length > 0) {
    Object.keys(data).forEach((eachKey) => {
      if (eachKey === "status") return;
      phaseObjList = [
        ...phaseObjList,
        { cid: `${data[eachKey]}+${eachKey}`, constDesc: data[eachKey] },
      ];
    });
  }

  const renderFilterSection = (
    title: string,
    data: any[],
    category: string,
    initialDisplay: number = 5
  ) => {
    const isExpanded = expandedSections[category] || false;
    const displayData = isExpanded ? data : data.slice(0, initialDisplay);
    const radioorChecked = [
      "projStatus",
      // "reraIds",
      "propType",
      "propStatus",
      "listedBy",
      "isUsed",
      "pnb",
      "furnish",
    ];

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <div className="flex flex-row flex-wrap gap-2 items-center">
          {displayData.map((item: any, index: number) => (
            <label key={item.cid || index} className="flex items-center gap-2">
              <input
                type={radioorChecked.includes(category) ? "radio" : "checkbox"}
                className="rounded border-gray-300 !accent-green-600"
                checked={
                  Array.isArray(state[category as keyof typeof state])
                    ? // @ts-ignore
                      state[category as keyof typeof state]?.includes(
                        item.cid ||
                          item.value ||
                          item.constDesc ||
                          item.cids ||
                          propertyiconss[item as keyof typeof propertyiconss]
                            ?.id
                      )
                    : state[category as keyof typeof state] ===
                      (item.cid ||
                        item.value ||
                        item.constDesc ||
                        item.cids ||
                        propertyiconss[item as keyof typeof propertyiconss]?.id)
                }
                onChange={() => {
                  const value =
                    category === "propType"
                      ? propertyiconss[item as keyof typeof propertyiconss]
                          ?.id || item.cid
                      : item.cid || item.value || item.cid;

                  dispatch({
                    type: "update",
                    payload: {
                      [category]:
                        Array.isArray(state[category as keyof typeof state]) &&
                        state[category as keyof typeof state] !== null
                          ? // @ts-ignore
                            state[category as keyof typeof state]?.includes(
                              value
                            )
                            ? // @ts-ignore
                              state[category as keyof typeof state].filter(
                                (item: any) => item !== value
                              )
                            : [
                                ...(state[
                                  category as keyof typeof state
                                ] as any[]),
                                value,
                              ]
                          : value,
                    },
                  });
                }}
              />
              {category === "propType" &&
                propertyiconss[item as keyof typeof propertyiconss]?.icon}
              <span>
                {propertyiconss[item as keyof typeof propertyiconss]?.name ||
                  item.Label ||
                  item.title ||
                  item.constDesc}
              </span>
            </label>
          ))}
        </div>
        {data.length > initialDisplay && (
          <button
            onClick={() => toggleExpand(category)}
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
          >
            {isExpanded ? (
              <>
                <MdExpandLess className="mr-1" />
                Show less
              </>
            ) : (
              <>
                <MdExpandMore className="mr-1" />
                Show more
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const [localitySearch, setSearchLocality] = useDebouncedState("", 500);
  const [builderSearch, setBuilderSearch] = useDebouncedState("", 500);
  const serverCity = useAtomValue(serverCityAtom);
  const { data: localitydata, isLoading } = useQuery({
    queryFn: () =>
      getData(localitySearch, "loc", state.city ?? serverCity ?? ""),
    queryKey: ["search" + "loc" + localitySearch],
    enabled: localitySearch !== "",
  });
  const { isLoading: builderDataLoading, data: builderData } = useQuery({
    queryFn: () =>
      getData(builderSearch, "builders", state.city ?? serverCity ?? ""),
    queryKey: ["search" + "builders" + builderSearch],
    enabled: builderSearch !== "",
  });
  const handleLocationChange = (selected: Location[]) => {
    console.log("Selected locations:", selected);
  };
  const isproject =
    path !== "/search/listing" && path.includes("search")
      ? state.listedBy == null
      : !isListing;

  return (
    <div className="  relative  ">
      <button
        onClick={onToggle}
        className="hidden sm:flex items-center gap-2 px-4 py-2 border-2 border-[#0073C6] rounded-full hover:bg-gray-50"
      >
        <MdTune className="w-5 h-5" />
        Add Filters
        <MdKeyboardArrowDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full flex flex-col right-0 sm:mb-0 max-w-full sm:min-w-[700px] bg-white rounded-lg shadow-lg border z-50 ">
          <div className="flex items-center justify-between gap-4 pb-4 border-1   mt-3 z-50 max-w-[90%]  ">
            <button
              onClick={() => {
                handleClearFilters(isproject ? "clearAll" : "listing");
                onToggle();
              }}
              className="flex-1 text-gray-600 border-gray-300 hover:bg-gray-100"
            >
              Clear Filter
            </button>
            <button
              onClick={() => handleApplyFilters(() => onToggle())}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              Apply Filter
            </button>
          </div>
          <div className="flex flex-col justify-start max-h-[66vh] mb-10 sm:mb-0 overflow-y-auto">
            {!state.projIdEnc && (
              <div className="flex flex-col mb-6 ml-4 gap-6 sm:mT-6">
                <LocalitySearch<Location>
                  data={localitydata || []}
                  displayKey="name"
                  loading={isLoading}
                  valueKey="stringId"
                  onChange={handleLocationChange}
                  placeholder="Search locations..."
                  label="Location"
                  setQuery={setSearchLocality}
                  category="localities"
                  multiple
                />
              </div>
            )}

            <div className="px-6 flex  flex-col items-start  flex-wrap justify-between   ">
              {isproject &&
                renderFilterSection(
                  "Project Status",
                  SEARCH_FILTER_DATA.projectstatus,
                  "projStatus"
                )}
              {!isproject &&
                phaseObjList &&
                phaseObjList.length > 0 &&
                renderFilterSection("Phases", phaseObjList, "phaseId")}
              {!isproject &&
                renderFilterSection(
                  "Property Status",
                  SEARCH_FILTER_DATA.listingStatus,
                  "propStatus"
                )}
              {renderFilterSection(
                "Property Type",
                state.bhk.length > 0
                  ? [
                      ...Object.keys(propertyiconss).filter(
                        (each) => each != "plt"
                      ),
                    ]
                  : Object.keys(propertyiconss),
                "propType"
              )}
              {state.propType !== 32 &&
                renderFilterSection(
                  "BHK Type",
                  SEARCH_FILTER_DATA.bhkDetails,
                  "bhk",
                  6
                )}
              {isproject && (
                <LocalitySearch<Location>
                  data={builderData || []}
                  displayKey="name"
                  valueKey="stringId"
                  onChange={handleLocationChange}
                  placeholder="Search Builders..."
                  loading={builderDataLoading}
                  setQuery={setBuilderSearch}
                  label="Builder"
                  category="builderIds"
                  multiple
                />
              )}
              {isproject &&
                !isproject &&
                renderFilterSection(
                  "RERA Status",
                  SEARCH_FILTER_DATA.rerastatus,
                  "reraIds"
                )}
            </div>
            <div className="ml-6  ">
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] font-[600] text-lg"
                id="Area (in Sq.ft)"
              >
                Super Built-Up Area (In Sq.ft)
              </h3>
              <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
                {state.areaValue[0]} sq.ft - {state.areaValue[1]} sq.ft
              </p>
              <CustomRangeSlider
                color="green"
                marks={
                  window.innerWidth > 768
                    ? [
                        { value: 0, label: "0 sq.ft" },
                        { value: 1000, label: "1000 sq.ft" },
                        { value: 2000, label: "2000 sq.ft" },
                        { value: 3000, label: "3000 sq.ft" },
                        { value: 4000, label: "4000 sq.ft" },
                        { value: 5000, label: "5000 sq.ft" },
                      ]
                    : []
                }
                min={0}
                max={5000}
                value={state.areaValue}
                onChange={(value) =>
                  dispatch({
                    type: "update",
                    payload: { areaValue: value },
                  })
                }
                style={{ width: "80%" }}
                className="ml-[14px] md:ml-4 "
                // mb={"5%"}
              />
            </div>

            <div className="ml-6">
              <h3
                className=" text-[#202020] mb-[1%] text-[14px] mt-[1%] text-lg font-semibold  "
                id="Budget"
              >
                Budget
              </h3>
              <p className="text-[#4D6677] text-[14px] md:text-[16px] font-[600]  ml-[14px] md:ml-0  ">
                ₹ {toFormattedString(state.bugdetValue[0])} - ₹{" "}
                {toFormattedString(state.bugdetValue[1])}
              </p>
              <CustomRangeSlider
                color="green"
                key="budgetSlider"
                onChange={(value) => {
                  dispatch({
                    type: "update",
                    payload: { bugdetValue: value },
                  });
                }}
                style={{ width: "80%" }}
                defaultValue={[
                  state?.bugdetValue[0] ?? 500000,
                  state?.bugdetValue[1] ?? 600000000,
                ]}
                value={state.bugdetValue}
                min={0}
                max={state.cg === "R" ? 100000 : 600000000}
                step={state.cg === "R" ? 1 : 100000}
                label={(value) => toFormattedString(value)}
                // size={isMobile ? "xs" : "md"}
                className="ml-[14px] md:ml-1 "
                // classNames={{markLabel: S.sliderMarkLable}}
              />
            </div>
            <div className="p-6 flex flex-col items-start  flex-wrap justify-between   ">
              {renderFilterSection(
                "Number of Bathrooms",
                SEARCH_FILTER_DATA.Bathrooms,
                "bathroom",
                6
              )}
              {renderFilterSection(
                "Number of Parkings",
                SEARCH_FILTER_DATA.Parkings,
                "parking",
                6
              )}

              {renderFilterSection(
                "Amenities",
                SEARCH_FILTER_DATA.amenities,
                "amenities",
                8
              )}
              {!isproject &&
                renderFilterSection(
                  "Facing",
                  SEARCH_FILTER_DATA.facing,
                  "facing",
                  9
                )}
              {!isproject &&
                renderFilterSection(
                  "Used or Un-used",
                  SEARCH_FILTER_DATA.UsedorNotUsed,
                  "isUsed"
                )}
              {!isproject &&
                renderFilterSection(
                  "Posted By",
                  SEARCH_FILTER_DATA.PostedBy,
                  "listedBy"
                )}
              {!isproject &&
                renderFilterSection(
                  "Photos & Videos",
                  SEARCH_FILTER_DATA.photoAvail,
                  "pnb"
                )}
              {!isproject &&
                renderFilterSection(
                  "Furnishing",
                  SEARCH_FILTER_DATA.furnish,
                  "furnish"
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
