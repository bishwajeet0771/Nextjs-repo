import React from "react";
import SearchAndFilterCon from "../components/searchAndFilterCon";
import Header from "@/app/components/layouts/primary/header";
import Footer from "@/app/components/layouts/primary/footer";
import { Toaster } from "react-hot-toast";
import { LeftSideBlock } from "../components/leftsection/leftSideBlock";
import { RightSideBlock } from "../components/rightSideBlock";
type Props = { cityData: any };

export default function DefaultSearchPage({ cityData }: Props) {
  return (
    <div className="w-full flex justify-center items-center flex-col ">
      <Header />
      <SearchAndFilterCon
        frontendFilters={{}}
        {...(cityData.cityId &&
          cityData.city && {
            cityData: `${cityData?.city}+${cityData.cityId}`,
          })}
      />
      <div className=" w-[100%] mx-2  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap">
        <LeftSideBlock />
        <RightSideBlock />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
