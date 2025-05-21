"use client";

import React from "react";
import useSearchFilters from "@/app/hooks/search";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import NewTabCon from "./newtabCon";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
const LeftSideBlock = ({ serverData }: any) => {
  const {
    searchProps: { mutate },
    handleAppliedFilters,
    filters,
    params,
    setFilters,
  } = useSearchFilters();

  const onTabChange = (listedBy: "A" | "I" | "proj" | "B" | "ALL"): void => {
    if (!listedBy) {
      console.error(`Invalid value passed to onTabChange: ${listedBy}`);
      return;
    }

    const updatedFilters =
      listedBy === "proj"
        ? { ...filters, listedBy: null, sortByfield: null, sortType: null }
        : {
            ...filters,
            ...Object.fromEntries(
              (diffToProjFromListing[listedBy] ?? []).map((key: string) => [
                key,
                // @ts-ignore
                (initialState[key] ?? null) as any,
              ])
            ),
            listedBy,
          };
    setFilters(updatedFilters);
    handleAppliedFilters();
  };

  return (
    <div className="w-[100%] md:w-[50%] sm:w-[100%] md:bg-white xl:min-w-[400px] sm:max-h-[600px] xl:max-h-[740px] ">
      <NewTabCon
        onTabChange={onTabChange}
        selectedProtype={params.listedBy ?? "proj"}
        Activities={params.cg}
        categoryType={SEARCH_FILTER_DATA.categoryDataProject}
      />
      <TabPanelSection
        key={params.listedBy ?? "proj"}
        mutate={mutate}
        serverData={serverData}
      />
      <RequestCallBackModal />
      <LoginPopup />
      <SharePopup />
      <Dialog />
      {/* <MapModal /> */}
    </div>
  );
};

export { LeftSideBlock };
import { diffToProjFromListing, initialState } from "@/app/store/search";
import TabPanelSection from "./TabPanelSection";
import SharePopup from "../SharePopup";
import Dialog from "@/app/test/newui/components/modals/Proj_PropModal";
// import { projSearchStore } from "@/app/(new_routes_seo)/search/store/projSearchStore";
// import { useHydrateAtoms } from "jotai/utils";
