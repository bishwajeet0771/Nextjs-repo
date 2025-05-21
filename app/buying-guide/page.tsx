"use client"
import React from "react";
import BlogDetailsBox from "./blogDetailSextion/BlogDetailsBox";
import BlogThirdBlock from "./blogDetailSextion/BlogThirdBlock";
import BlogBanner from "../blog/blogDetailSextion/BlogBanner";
import SubscribeBlock from "../blog/blogDetailSextion/SubscribeBlock";
import BlogCarousal from "./blogDetailSextion/BlogCarousal";

export default function Page() {
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden bg-[#F5F7F8] items-center ">
    <BlogBanner />
    <BlogDetailsBox />
    <BlogCarousal />
    <BlogThirdBlock />
    <SubscribeBlock />
  </div>;
}  
