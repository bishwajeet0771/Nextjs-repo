import Close from "@/app/components/project/button/close";
import React from "react";

export default function Header({ close }: { close: () => void }) {
  return (
    <div className="flex justify-between items-center p-[.8%]">
      <div>
        <p className="text-[#001F35]  md:text-[20px] font-[600]">
          3BHK Apartment for Sale in Kadugodi,
        </p>
        <p className=" text-[#148B16] md:text-base not-italic font-semibold">
          Marthapathi Grand Field
        </p>
      </div>
      <div>
        <Close close={close} />
      </div>
    </div>
  );
}
