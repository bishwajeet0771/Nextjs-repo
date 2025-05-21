"use client";
import React from "react";
import Header from "@/app/components/layouts/primary/header";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import Footer from "@/app/components/layouts/primary/footer";
import { Toaster } from "react-hot-toast";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import SearchAndFilterCon from "../components/searchAndFilterCon";
const LeftSideBlock = dynamic(() => import("../components/leftSideBlock"));
import SharePopup from "../../components/SharePopup";
import dynamic from "next/dynamic";

type Props = {
  serverData: any;
  frontendFilters: any;
};

export default function ListingSearchPage({
  serverData,
  frontendFilters,
}: Props) {
  return (
    <div>
      <Header />
      <SearchAndFilterCon
        serverData={serverData}
        frontendFilters={frontendFilters}
      />
      <div className="  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap">
        <LeftSideBlock serverData={serverData} />
      </div>
      <Footer />
      <Toaster />
      <RequestCallBackModal />
      <LoginPopup />
      <SharePopup />
    </div>
  );
}
