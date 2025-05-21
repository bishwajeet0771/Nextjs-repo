import React from "react";

type Props = {
  text: string;
};

export default function Line({ text }: Props) {
  return (
    <div className="text-[#242424] sm:text-wrap text-[12px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic font-semibold leading-[normal] flex items-center gap-1 sm:gap-3.5 xl:text-nowrap">
      <div className="w-3 sm:w-auto">{config.icon}</div>
      {text}
    </div>
  );
}

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 42 42"
      fill="none"
      className="w-[16px] h-[16px] sm:w-auto sm:h-auto"
    >
      <path
        d="M4.375 24.2078L10.5 30.625L12.292 28.7473M28.875 11.375L18.2648 22.491M13.125 24.2078L19.25 30.625L37.625 11.375"
        stroke="#F5AC44"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
