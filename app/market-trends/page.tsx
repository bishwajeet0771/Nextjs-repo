// "use client"

// import React from "react";
// import MarketBanner from "./components/MarketBanner";
// import MarketSections from "./components/MarketSections";
// import MarketNavigator from "./components/MarketNavigator";
// import SearchField from "./components/SearchField";
// import { useQuery } from "react-query";
// import RTK_CONFIG from "../config/rtk";
// import { getAllLocalitiesDetails } from "../utils/stats_cities";

// interface Locality {
//   id: string;
//   name: string;
// }

// export default function Page() {
//   const {
//     data: AllLocalities,
//     isLoading: citiesLoading,
//     error: citiesError,
//   } = useQuery<Locality[], Error>({
//     queryKey: ["all-localities"],
//     queryFn: getAllLocalitiesDetails,
//     ...RTK_CONFIG,
//     enabled: true,
//   });

//   // console.log(AllLocalities)
//   return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden items-center ">
//     <MarketBanner />
//     <MarketNavigator />
//     <SearchField />
//     <MarketSections />
//   </div>;
// }  

import React from "react";

export default function Page() {
  return <div>Page</div>;
}