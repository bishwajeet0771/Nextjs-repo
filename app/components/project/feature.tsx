import Image from "next/image";
import React from "react";
import SubHeading from "./headings/SubHeading";

export default function Feature({
  data,
  projName,
}: {
  data: string[];
  projName: string;
}) {
  return (
    <div
      className="w-[90%] mt-[35px] scroll-mt-[180px] mb-[5%] sm:mb-0 sm:mt-0 sm:pt-screen-spacing"
      id="highlights"
    >
      <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words sm:text-nowrap w-[78%]">
        <strong>
          <span className="text-[#001F35]">Highlights Of{" "}</span>
          <span className="text-green-800">{projName}</span>
        </strong>
      </h2>
      <SubHeading
        text="Key features: Elegant design, spacious layout, stunning views, modern amenities"
        className="mb-[24px] sm:mb-[36px]"
      />

      <ul className="list-inside flex flex-col mt-4  ml-[2%]">
        {data?.map((each, ind) => {
          return (
            <li
              key={`hightlights-${each}`}
              className="inline-flex gap-[1%] xl:gap-[0.5%] mb-[1%]"
            >
              <Image
                width={20}
                height={20}
                alt={"hightlights-" + (ind+1)}
                title={"hightlights-" + (ind+1)}
                className="w-[12px] h-[12px] sm:max-w-[20px] max-h-[14px] sm:max-h-[20px] sm:h-[20px] sm:w-[20px] mt-[1.5px] sm:mt-[3.5px] xl:mt-[10px]"
                src={"/abc/Checked.png"}
              />
              <p className="text-[12px] sm:text-[18px] xl:text-[24px]  m-0 text-[#212C33] font-medium sm:font-500 xl:font-700 ">
                {each}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
