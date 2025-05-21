import React from "react";

type props = {
  icon: any;
  title: string;
  value: string | number;
  className?: string;
};

export default function RoomBasicDetails({
  icon,
  title,
  value,
  className,
}: props) {
  const formattedValue =
    typeof value === "number" ? (value < 10 ? `0${value}` : value) : value;
  return value ? (
    <div className={className}>
      <div className="flex justify-start items-center space-x-1 xl:space-x-3 ">
        {icon}
        <h4 className="text-[#00487C]   text-[13.5px] sm:text-[16px]  xl:text-2xl not-italic   whitespace-nowrap font-semibold">
          {title}
        </h4>
      </div>

      <p
        className=" mt-1 xl:mt-2 
      text-[#202020]  text-[13.5px] sm:text-[18px] xl:text-2xl not-italic font-semibold  capitalize"
      >
        {formattedValue}
      </p>
    </div>
  ) : null;
}
