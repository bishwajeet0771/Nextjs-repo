/* eslint-disable no-unused-vars */
import { useAtom } from "jotai";
import React, { memo } from "react";
import { MdClose } from "react-icons/md";
import { projSearchStore } from "../../../store/newListingStore";
import { SEARCH_FILTER_DATA, SelectedFiltersMap } from "@/app/data/search";
import useProjSearchAppliedFilters from "./../hooks/useProjSearchAppliedFilters";

type Props = {
  frontendFilters: any;
};

const ListingSelectedFilters = ({ frontendFilters }: Props) => {
  const [state, dispatch] = useAtom(projSearchStore);
  const { handleApplyFilters } = useProjSearchAppliedFilters();

  // Fallback to frontendFilters if JS is disabled (or state is empty)
  const filtersSource = React.useMemo(
    () =>{
      if (state.listedBy === undefined) {
        return frontendFilters
      }
      return !Object.entries(state).some(
          ([_, value]) =>
            (Array.isArray(value) && value.length > 0) || value !== null
        )
          ? frontendFilters
          : state
      // typeof window === "undefined" || // SSR or JS disabled
      // !Object.entries(state).some(
      //   ([_, value]) =>
      //     (Array.isArray(value) && value.length > 0) || value !== null
      // )
      //   ? frontendFilters
      //   : state
    },
    [state, frontendFilters]
  );

  const hasFilters = Object.entries(filtersSource).some(
    ([_, value]) => (Array.isArray(value) && value.length > 0) || value !== null
  );

  if (!hasFilters) return null;

  return (
    <div className="border-t overflow-x-auto min-w-full max-w-full md:min-w-[60%] md:max-w-[60%] xl:min-w-[50%] xl:max-w-[50%] flex items-center ">
      <div className="flex gap-2 px-[10px] w-full pt-[4px] xl:pt-[8px] ">
        {Object.entries(filtersSource).map(
          ([category, values]: [string, any | string | null]) =>
            values !== null &&
            values !== undefined &&
            category !== "bugdetValue" &&
            category !== "areaValue" &&
            category !== "sortByfield" &&
            category !== "sortType" &&
            category !== "cg" &&
            category !== "city" &&
            category !== "projIdEnc" &&
            category !== "lng" &&
            (Array.isArray(values) ? (
              values.map((value) => (
                <div
                  key={`${category}-${value}`}
                  className="flex items-center text-nowrap gap-2 mb-[6px] mt-[6px] bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm capitalize"
                >
                  <span>
                    {category === "localities" ||
                    category === "builderIds" ||
                    category === "phaseId"
                      ? value.split("+")[0]
                      : category === "parking" || category === "bathroom"
                      ? `${value} ${category}`
                      : SelectedFiltersMap.get(value)}
                  </span>
                  {/* {typeof window !== "undefined" && ( */}
                    <button
                      onClick={() => {
                        dispatch({
                          type: "update",
                          payload: {
                            [category]: Array.isArray(
                              state[category as keyof typeof state]
                            )
                              ? (
                                  state[category as keyof typeof state] as any[]
                                ).filter((item: any) => item !== value)
                              : null,
                          },
                        });
                        handleApplyFilters();
                      }}
                      className="text-[#0073C6] hover:text-[#0073C6]/70"
                    >
                      <MdClose className="w-4 h-4" />
                    </button>
                  {/* ``)} */}
                </div>
              ))
            ) : (
              <div
                key={`${category}-${values}`}
                className="flex items-center text-nowrap gap-2 mb-[6px] mt-[6px] bg-[#0073C6]/10 text-[#0073C6] px-3 py-1 rounded-full text-sm capitalize"
              >
                <span>
                  {values === "All"
                    ? "All Listings"
                    : category === "parking" || category === "bathroom"
                    ? `${values} ${category}`
                    : category === "pnb"
                    ? SEARCH_FILTER_DATA.photoAvail?.filter(
                        (each) => each.value == values
                      )[0]?.title
                    : category === "projName"
                    ? values
                    : category === "lat"
                    ? "Near By"
                    : category == "lng"
                    ? "Near By"
                    : SelectedFiltersMap.get(values) ?? ""}
                </span>
                {/* {typeof window !== "undefined" && ( */}
                  <button
                    onClick={() => {
                      dispatch({
                        type: "update",
                        payload: {
                          [category]: null,
                          ...(category === "projName" && {
                            projIdEnc: null,
                            phaseId: [],
                          }),
                        },
                      });
                      handleApplyFilters();
                    }}
                    className="text-[#0073C6] hover:text-[#0073C6]/70"
                  >
                    <MdClose className="w-4 h-4" />
                  </button>
                {/* )} */}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default memo(ListingSelectedFilters);
