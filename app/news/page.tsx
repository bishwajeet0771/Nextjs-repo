"use client"

import React from "react";
import NewsBanner from "./components/newsBanner";
import NewsSections from "./components/NewsSections";

export default function Page() {
  return <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden ">
    <NewsBanner />
    <NewsSections  />
  </div>;
}  
