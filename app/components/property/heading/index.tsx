import clsx from "clsx";
import React from "react";

export default function PropertyHeading({
  className,
  title,
  desc,
  projName,
}: {
  className?: string;
  title: any;
  desc: string;
  projName?: string;
}) {
  return (
    <div
      className={clsx(
        "inline-flex  gap-2 sm:gap-[26px]  w-[90%] items-center",
        className
      )}
    >
      {Svg}{" "}
      <div>
        {" "}
        <h2 className="text-h2 sm:text-[22px] xl:text-[28px] font-bold mb-[4px] sm:mb-[10px] xl:mb-[6px] capitalize">
          <strong>
            <span className="text-[#001F35]">{title}</span>
            {projName && projName !== "" && (
              <span className="text-green-800">{projName} </span>
            )}
          </strong>
        </h2>{" "}
        <p className="text-[13px] sm:text-[16px] xl:text-2xl text-[#344273] italic leading-[normal] mb-2">
          {desc}
        </p>
      </div>
    </div>
  );
}

const Svg = (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="6"
  //   height="72"
  //   viewBox="0 0 6 72"
  //   fill="none"
  //   className="h-[36px] xl:h-[54px] xl:w-[14px]"
  // >
  //   <path
  //     d="M3 2.5L3 69.5"
  //     stroke="url(#paint0_linear_342_34781)"
  //     strokeWidth="5"
  //     strokeLinecap="round"
  //   />
  //   <defs>
  //     <linearGradient
  //       x1="3.00001"
  //       y1="72"
  //       x2="3"
  //       y2="0.499999"
  //       gradientUnits="userSpaceOnUse"
  //     >
  //       <stop offset="0" stopColor="#B3DFFF" />
  //       <stop offset="1" stopColor="#0094FF" />
  //     </linearGradient>
  //   </defs>
  // </svg>

  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="72"
      viewBox="0 0 6 72"
      fill="none"
      className="h-[36px] xl:h-[54px] xl:w-[14px]"
    >
      <path
        d="M3 2.5L3 69.5"
        stroke="#0094FF"  // Solid blue color
        strokeWidth="6"
        strokeLinecap="round"
      />
  </svg>

);

export { Svg };
