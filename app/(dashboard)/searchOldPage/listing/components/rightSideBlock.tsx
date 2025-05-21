"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import MapSkeleton from "@/app/components/maps/Skeleton";
// import useSearchFilters from "@/app/hooks/search";

const RightSideBlock = ({ serverClientData }: any) => {
  const Map = useMemo(
    () =>
      dynamic(
        () => import("@/app/components/maps/search/ProjectSearchPageMap"),
        {
          loading: () => <MapSkeleton />,
          ssr: false,
        }
      ), // "use client";
    // import dynamic from "next/dynamic";
    // import React, { useMemo } from "react";
    // import MapSkeleton from "@/app/components/maps/Skeleton";
    // import useSearchFilters from "@/app/hooks/search";

    // const RightSideBlock = () => {
    //   const Map = useMemo(
    //     () =>
    //       dynamic(() => import("@/app/components/maps/search"), {
    //         loading: () => <MapSkeleton />,
    //         ssr: false,
    //       }),
    //     []
    //   );
    //   const { searchProps } = useSearchFilters();
    //   const { data } = searchProps as any;
    //   return (
    //     <div className="w-[100%] sm:w-full  flex justify-start items-start z-[1] md:w-[50%] ">
    //       <Map
    //         projName={"Searched Location"}
    //         lat={(data && data[0]?.lat) ?? 47.46489}
    //         lang={(data && data[0]?.lang) ?? 15.34043}
    //         data={data}
    //       />
    //     </div>
    //   );
    // };

    // export { RightSideBlock };
    []
  );

  return (
    <div
      id="mobileMap"
      className="w-[98%] sm:w-full scroll-mt-[200px] flex justify-start items-start z-[1] md:w-[50%] "
    >
      <Map
        key="oldSearchPageListingMap"
        projName={"Searched Location"}
        lat={
          (serverClientData && (serverClientData[0]?.lat as any)) ?? 47.46489
        }
        lang={
          (serverClientData && (serverClientData[0]?.lang as any)) ?? 15.34043
        }
        data={serverClientData}
      />
    </div>
  );
};

export { RightSideBlock };
