import React from "react";
import ProjData from "./ProjData";
import ListingData from "./ListingData";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  data: any;
  type: any;
};

export default function CenterTop({ data, type }: Props) {
  const isMobile = useMediaQuery("(max-width: 1600px)");
  return (
    <div className="flex  flex-col px-1 xl:px-4 xl:mt-[2px]">
      {!isMobile && <ProjData type={type} {...data} />}
      <ListingData {...data} type={type} />
    </div>
  );
}
