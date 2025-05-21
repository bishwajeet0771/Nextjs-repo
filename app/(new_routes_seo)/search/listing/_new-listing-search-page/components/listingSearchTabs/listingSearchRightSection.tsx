/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import dynamic from "next/dynamic";
import React, { useMemo, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { getSearchData } from "../../../../utils/project-search-queryhelpers";
import { useQueryState } from "nuqs";
import RTK_CONFIG from "@/app/config/rtk";
import { useMediaQuery } from "@mantine/hooks";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { modalPopup, selectedNearByAtom } from "@/app/store/search/map";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
import LocationCard from "@/app/test/newui/components/modals/overly_items/LocationList";
import { overlayAtom } from "@/app/test/newui/store/overlay";

const ListingSearchRightSection = ({ serverData, isTrue }: any) => {
  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/app/components/maps/search/ProjectSearchPageMap"),
        {
          loading: () => (
            <div className="flex justify-center items-center w-full h-[600px] flex-col">
              <div className="animate-spin rounded-full h-[50px] w-[50px] border-t-4 border-b-4 border-[#0073C6] border-t-transparent" />
              <p className="font-[600] text-[20px] mt-[16px]">
                Please wait Map is loading...
              </p>
            </div>
          ),
          ssr: false,
        }
      ),
    []
  );

  const isMobile = useMediaQuery("(max-width: 601px)");
  const [mapPopup, setMapPopup] = useAtom(modalPopup);
  const dispatch = useSetAtom(overlayAtom);
  const {
    data: nearByData,
    isOpen,
    isLoader,
  } = useAtomValue(selectedNearByAtom);
  const [apiFilterQueryParams] = useQueryState("sf");

  const { data } = useInfiniteQuery({
    queryKey: [
      `searchQuery${apiFilterQueryParams ? `-${apiFilterQueryParams}` : ""}`,
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getSearchData(
        pageParam,
        apiFilterQueryParams ? apiFilterQueryParams : ""
      );
      return response;
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const nextPage = allPages.length;
      if (lastPage.length < 20) {
        return;
      }
      return nextPage;
    },
    ...RTK_CONFIG,
    enabled: false,
  });

  const apidata = data?.pages.flat() || [];

  const handleModalClose = useCallback(() => {
    document.body.style.overflow = "unset";
    setMapPopup((prev: any) => ({ ...prev, isOpen: false }));
    dispatch({ type: "CLOSE" });
  }, [setMapPopup, dispatch]);

  const mapProps = useMemo(
    () => ({
      projName: "Searched Location",
      lat: (apidata && apidata[0]?.lat) ?? 47.46489,
      lang: (apidata && apidata[0]?.lang) ?? 15.34043,
      data: apidata,
    }),
    [apidata]
  );

  const renderMap = useCallback(() => {
    if (isMobile) {
      if (!mapPopup.isOpen) return null;

      return (
        <ModalBox isOpen={mapPopup.isOpen} handleChange={handleModalClose}>
          {isLoader ? (
            <div className="flex justify-center items-center gap-2 w-full py-[30px]">
              <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
              <span className="font-bold">Loading...</span>
            </div>
          ) : (
            <div className="flex flex-col justify-between items-center h-full w-full">
              <div
                className={`w-full ${
                  isOpen ? "h-[calc(100vh-60vh)]" : "h-[calc(100vh-30vh)]"
                } right-0 flex justify-start items-start md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0 relative`}
              >
                <Map
                  {...mapProps}
                  type="proj"
                  styles={`z-1 w-full max-w-full ${
                    isOpen ? "h-[calc(100vh-60vh)]" : "h-[calc(100vh-30vh)]"
                  }`}
                />
              </div>
              {nearByData && Object.keys(nearByData).length > 0 && isOpen && (
                <div className="!h-[calc(100vh-60vh)] overflow-y-auto w-full">
                  <LocationCard data={nearByData} />
                </div>
              )}
            </div>
          )}
        </ModalBox>
      );
    }

    return (
      <div
        className="w-full max-h-[70vh] sm:fixed right-0 flex justify-start items-start md:w-[60%] xl:w-[50%] scroll-mt-[150px] z-0"
        id="mobileMap"
      >
        <Map
          key="liastingTabsSearchPageMap"
          {...mapProps}
          type="prop"
          styles="h-[calc(100vh-65vh)] md:h-[calc(100vh-220px)] xl:h-[calc(100vh-232px)] w-full max-w-full"
        />
      </div>
    );
  }, [
    isMobile,
    mapPopup.isOpen,
    isLoader,
    isOpen,
    nearByData,
    mapProps,
    handleModalClose,
  ]);

  return renderMap();
};

export default ListingSearchRightSection;
