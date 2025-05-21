import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  open: () => void;
};

export default function ReportButton({ open }: Props) {
  const { data: session } = useSession();
  return (
    session && (
      <button
        className="inline-flex gap-1 p-1 justify-center items-center bg-gray-200 text-gray-900 text-xs sm:text-base xl:text-xl not-italic font-semibold rounded mb-3 shadow mr-[100%] md:mr-0 whitespace-nowrap"
        onClick={open}
      >
        {config.icon} Report Issues
      </button>
    )
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
      className="w-[18px] h-[18px]"
    >
      <path
        d="M4 7.00004V21M11.758 3.90904C8.452 2.22504 5.851 3.21104 4.554 4.21904C4.32 4.40104 4.204 4.49204 4.102 4.69904C4 4.90904 4 5.10204 4 5.49004V14.733C4.97 13.635 7.879 11.933 11.758 13.91C15.224 15.675 18.174 14.943 19.57 14.18C19.763 14.075 19.86 14.022 19.93 13.904C20 13.786 20 13.658 20 13.402V5.87404C20 5.04504 20 4.63104 19.803 4.48104C19.605 4.33104 19.143 4.45904 18.22 4.71504C16.64 5.15304 14.342 5.22504 11.758 3.90904Z"
        stroke="#242424"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
