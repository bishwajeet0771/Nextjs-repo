"use client";
import React, { useState } from "react";
import ListingSearchleftSection from "./listingSearchTabs/listingSearchleftSection";
import { useQueryState } from "nuqs";
// import { useHydrateAtoms } from "jotai/utils";
// import { initialState, projSearchStore } from "../../../store/newListingStore";
// import { usePathname } from "next/navigation";

import dynamic from "next/dynamic";
// import ListingSearchMapSection from "./listingSearchTabs/ListingSearchMapSection";

// import ListingSearchRightSection from "./listingSearchTabs/listingSearchRightSection";
const ListingSearchMapSection = dynamic(
  () => import("./listingSearchTabs/ListingSearchMapSection")
);
type Props = {
  serverData: any;
  frontendFilters: any;
  preAppliedFilters: any;
};

export default function ListingMainSection({
  frontendFilters,
  serverData,
  preAppliedFilters = null,
}: Props) {
  // useHydrateAtoms(
  //   [
  //     [
  //       projSearchStore,
  //       {
  //         type: "update",
  //         payload: {
  //           // ...initialState,
  //           ...frontendFilters,
  //         },
  //       },
  //     ],
  //   ],
  //   {
  //     dangerouslyForceHydrate: true,
  //   }
  // );

  const [apiFilterQueryParams] = useQueryState("sf");
  const [isTrue, setIsTrue] = useState(
    apiFilterQueryParams !== preAppliedFilters
  );

  return (
    <>
      <ListingSearchleftSection
        serverData={serverData}
        frontendFilters={frontendFilters}
        isTrue={isTrue}
        apiFilterQueryParams={apiFilterQueryParams}
        setIsTrue={setIsTrue}
        preAppliedFilters={preAppliedFilters}
      />
      <div className="w-[100%] sm:w-[50%] -z-10" />

      <ListingSearchMapSection serverData={serverData} />
    </>
  );
}
