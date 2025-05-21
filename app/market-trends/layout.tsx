import "@mantine/carousel/styles.css";
import React from "react";
import MarketBanner from "./components/MarketBanner";
import MarketNavigator from "./components/MarketNavigator";
// import SearchField from "./components/SearchField";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100%] w-[100%] mt-[70px] flex flex-col overflow-hidden items-center ">
      <MarketBanner title="Property Rates & Price Trends" text="in india" />
      <MarketNavigator />
      {/* <SearchField /> */}
      {children}
    </div>
  );
}
