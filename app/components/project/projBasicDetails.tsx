import React from "react";
import Tooltip from "../atoms/Tooltip";

type props = {
  icon: any;
  title: string;
  value?: string | number | null | string[];
  className?: string;
  Id?: string;
  type?: "authorities";
};

export default function ProjBasicDetails({
  icon,
  title,
  value,
  className,
  Id,
  type,
}: props) {
  return (
    value &&
    (!type || type !== "authorities" ? (
      <div className={`${className} scroll-mt-[450px]`} {...(Id && { id: Id })}>
        {icon}
        {/* <h4 className=" text-[#001F35] text-[13.5px] sm:text-[16px]  xl:text-2xl not-italic   whitespace-nowrap font-semibold">
          {title}
        </h4> */}
        <h2 className="text-[#001F35] text-[13.5px] sm:text-[16px] xl:text-2xl not-italic whitespace-nowrap font-semibold">
        {title}
      </h2>
        <p className="text-[#148B16]  text-[13.5px] sm:text-[18px] xl:text-2xl not-italic font-semibold ">
          {value}
        </p>
      </div>
    ) : (
      <div className={`${className} scroll-mt-[450px]`} {...(Id && { id: Id })}>
        {icon}
        <h2 className=" text-[#001F35] text-[13.5px] sm:text-[16px]  xl:text-2xl not-italic   whitespace-nowrap font-semibold">
          {title}
        </h2>
        
        <div className="text-[#148B16] inline-flex  text-[13.5px] sm:text-[18px] xl:text-2xl not-italic font-semibold ">
          {Array.isArray(value) &&
            value.map((item, index) => {
              const [text] = item.split("–").map((part) => part.trim());

              return (
                <Tooltip key={item} text={item}>
                  <p className="cursor-pointer mr-1.5">
                    {`${text}${index < value.length - 1 ? ", " : ""}`}
                  </p>
                </Tooltip>
              );
            })}
        </div>
      </div>
    ))
  );
}
