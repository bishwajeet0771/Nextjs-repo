"use client";
import React from "react";
import InFoCarousel from "./InFoCarousel";
// import CardCarousel from "./CardCarousel";
import PartialUnitModal from "./Modal/Modal";
type Props = {
  partialUnitData: any;
  data: any;
};

export default function MainSection({ partialUnitData, data }: Props) {
  return (
    <div className="mt-6">
      <InFoCarousel
        partialUnitData={{
          ...partialUnitData,
          type: data.type,
          id: data.projIdEnc,
        }}
      />
      {data.type !== "overview" && <PartialUnitModal data={data} />}
    </div>
  );
}
