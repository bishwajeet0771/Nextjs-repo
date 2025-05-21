import React from "react";

type Props = {};

export default function MenuBtn({}: Props) {
  return (
    <button aria-label="Open settings" className="flex justify-center items-center gap-1.5 self-stretch rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] p-0.5 border-solid border-[#0073C6] bg-white">
      {config.icon}
    </button>
  );
}

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 17H19M5 12H19M5 7H19"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
