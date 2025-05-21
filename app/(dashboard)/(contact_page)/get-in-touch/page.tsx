// import Footer from "@/app/components/layouts/primary/footer";
// import Header from "@/app/components/layouts/primary/header";
import React from "react";
import HeadBanner from "./components/HeadBanner";
import MainContent from "./components/MainContent";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="flex  items-center flex-col">
      <HeadBanner />
      <MainContent />
    </div>
  );
}
