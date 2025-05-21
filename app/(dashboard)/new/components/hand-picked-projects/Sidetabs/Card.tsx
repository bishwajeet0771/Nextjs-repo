import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function Card({ label, active, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        " flex items-center gap-2.5 self-stretch px-[10px] py-[6px] sm:p-2.5 bg-[#DAE6F1] border-b-[1px] border-[#819CA9] text-black text-[12px] sm:text-xl not-italic font-medium cursor-pointer text-nowrap",
        active && "bg-[#DCFFDD] !text-green-800 !font-semibold"
      )}
    >
      {label}
    </div>
  );
}
