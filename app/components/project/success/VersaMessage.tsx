import clsx from "clsx";
import React from "react";
interface VersaMessageProps {
  border: string;
  bgColor: string;
  title: string;
  content: string;
  icon: JSX.Element;
  greenText?: string;
}

export default function VersaMessage({
  bgColor,
  title,
  content,
  icon,
  border,
  greenText,
}: VersaMessageProps): JSX.Element {
  return (
    <div className="flex w-full  sm:h-[280px] xl:h-[467px] flex-col items-center gap-16 xl:gap-28 shrink-0 pb-[12px] xl:pb-[33px] rounded-[20px] bg-[#fff] border  overflow-hidden">
      <div
        // className={`top h-[100px] max-w-[400px] sm:w-[576px] xl:h-[178px] shrink-0 relative rounded-t-[20px] ${bgColor}`}
        className={`top h-[100px] w-full xl:h-[178px] shrink-0 relative rounded-t-[20px] ${bgColor}`}
      >
        <CenterFace border={border} icon={icon} />
      </div>
      <div 
        // className="down flex w-full xl:h-[467px] flex-col items-center  shrink-0 pb-6 xl:pb-[33px] xl:w-[448px] rounded-b-[20px]"
        className="down flex w-full xl:h-[467px] flex-col items-center shrink-0 pb-6 xl:pb-[33px] rounded-b-[20px]"
      >
        <p className="text-[#242424] text-center text-[20px] xl:text-2xl not-italic font-bold leading-[normal]">
          {title}
        </p>
        <p className="text-[#242424]  px-2 text-center text-[16px] mt-2 xl:text-xl not-italic font-medium xl:leading-8 xl:mt-[19px]">
          {content}
        </p>
        <p className="text-[#148B16] text-[14px] sm:text-lg xl:text-xl italic font-semibold leading-6 sm:leading-8 text-center w-full px-4">
          {greenText}
        </p>
      </div>
    </div>
  );
}

const CenterFace: React.FC<Pick<VersaMessageProps, "border" | "icon">> = ({
  icon,
  border,
}) => {
  return (
    <div
      className={clsx(
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 right-0  w-[90px] xl:w-[175px] h-[90px] xl:h-[175px] border  bg-white rounded-full flex justify-center items-center",
        border
      )}
    >
      {icon}
    </div>
  );
};
