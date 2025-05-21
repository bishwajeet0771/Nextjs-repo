import clsx from "clsx";
import React from "react";

type Props = {
  label: string;
  value: string | number;
  className?: string;
};

export default function ListItemOld({ label, value, className }: Props) {
  return (
    <li
      className={clsx(
        "flex max-w-[771px] justify-between list-disc  items-start  gap-[26px]   text-2xl  font-bold leading-[23.784px]  border-b border-[#00000080] pb-5",
        className
      )}
    >
      <div className="text-[#4D6677] flex items-center  text-2xl not-italic font-bold leading-[23.784px] relative pl-5">
        <span className="text-center text-5xl absolute left-0 -top-[25px]">
          .
        </span>

        {label}
      </div>{" "}
      <span className="text-[#4D6677] text-2xl not-italic font-medium leading-[normal]">
        {value === "Lifetime" ? value : ` ${value}`}
      </span>
    </li>
  );
}
 