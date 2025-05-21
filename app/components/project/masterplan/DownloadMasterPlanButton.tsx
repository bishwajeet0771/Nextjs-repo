"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import Button from "@/app/elements/button";

type Props = {
  media: string;
};

export default function DownloadMasterPlanButton({ media }: Props) {
  const [, { open: LoginOpen }] = usePopShortList();
  const { data: session } = useSession();
  const downloadFn = async () => { 
    try {
      const response = await fetch(media);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url; 
      downloadLink.download = "masterplan.webp";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  const handleDownload = async () => {
    if (session) {
      downloadFn();
    } else {
      LoginOpen(downloadFn, {
        type: "master-plan",
        link: media,
      });
    }
  };

  return (
    <Button
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="29"
          viewBox="0 0 28 29"
          fill="none"
          className="mr-2 w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]"
        >
          <path
            d="M14 21L6.5 13.5L8.6 11.325L12.5 15.225V3H15.5V15.225L19.4 11.325L21.5 13.5L14 21ZM5 27C4.175 27 3.469 26.7065 2.882 26.1195C2.295 25.5325 2.001 24.826 2 24V19.5H5V24H23V19.5H26V24C26 24.825 25.7065 25.5315 25.1195 26.1195C24.5325 26.7075 23.826 27.001 23 27H5Z"
            fill="white"
          />
        </svg>
      }
      title=" Download Master Plan"
      buttonClass=" text-[#FFF] text-[12px] sm:text-[18px] xl:text-[28px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px]  mt-3"
      onChange={handleDownload}
    />
  );
}
