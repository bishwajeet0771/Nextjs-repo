import React from "react";
import Header from "@/app/components/layouts/primary/header";
import SearchAndFilterCon from "./components/searchAndFilterCon";
import LeftSideBlock from "./components/leftSideBlock";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import Footer from "@/app/components/layouts/primary/footer";
import { Toaster } from "react-hot-toast";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import SharePopup from "../components/SharePopup";
// import { getUserCity } from "@/app/(new_routes_seo)/utils/new-seo-routes/home.api";
// import { headers } from "next/headers";
const SearchingPage = async () => {
  // const ip = headers().get("x-forwarded-for") || headers().get("cf-connecting-ip") || "";
  // const data = await getUserCity(undefined,ip);
  // const data = {
  //   city: "Bengaluru",
  //   cityId: "9",
  // };
  return (
    <div>
      <Header />
      <SearchAndFilterCon />
      <div className="  xl:m-0 flex justify-center flex-wrap-reverse sm:flex-nowrap">
        <LeftSideBlock />
      </div>
      <Footer />
      <Toaster />
      <RequestCallBackModal />
      <LoginPopup />
      <SharePopup />
    </div>
  );
};

export default SearchingPage;
