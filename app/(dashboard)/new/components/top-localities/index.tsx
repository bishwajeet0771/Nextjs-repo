import React from "react";
import MainHeading from "../heading";
import ListBox from "./ListBox";

type Props = {};

export default function TopLocalities({}: Props) {
  return (
    <div className="mt-[40px] sm:mt-[60px] w-[95%] m-auto">
      <MainHeading
        title={"Top Localities"}
        content={"Top Localities for Your Perfect Home"}
      />
      <ListBox />
    </div>
  );
}
