"use client";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { useSession } from "next-auth/react";
// import Link from "next/link";
import React from "react";
// import toast from "react-hot-toast";
import { DocIcon } from "@/app/images/commonSvgs";
import clsx from "clsx";
// import { downloadIcon } from '@/app/images/commonSvgs';

const DownloadBroucher = ({
  url,
  className,
}: {
  url?: string;
  className?: string;
}) => {
  const { data: session } = useSession();
  const [, { open: LoginOpen }] = usePopShortList();

  const handleDownload = () => {
    if (session) {
      url &&
        window.open(
          `/pdf/${encodeURIComponent(url.split(".net")[1])}`,
          "_self"
        );
    } else {
      LoginOpen(() => {
        url &&
          window.open(
            `/pdf/${encodeURIComponent(url.split(".net")[1])}`,
            "_self"
          );
      });
    }

    // fetch(url)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(
    //         `Network response was not ok: ${response.statusText}`
    //       );
    //     }
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = "brochure.pdf";
    //     document.body.appendChild(link);

    //     link.click();

    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching or downloading the file:", error);
    //   });
  };

  return (
    url && (
      <button
        onClick={handleDownload}
        className={clsx(
          "inline-flex justify-center items-center gap-[5px] p-2 text-[12px]  rounded-md bg-btnPrimary text-white sm:text-[20px] xl:text-[22px] not-italic font-bold leading-[normal] mt-3 ",
          className
        )}
      >
        {DocIcon} Download Brochure
      </button>
      // <div
      //   className="flex scroll-mt-[220px] justify-start mt-[5%] items-center flex-wrap w-[90%] gap-[2%] mb-[3%]"
      //   id="brochure"
      // >
      //   <p className="text-[28px] lg:text-[32px] text-[#023993] font-[700]">
      //     Brochure{" "}
      //   </p>
      //   <button
      //     // href={url}
      //     // download={true}
      //     // target="_self"
      //     onClick={handleDownload}
      //     className="flex border-0 justify-center items-center text-[20px] lg:text-[24px] text-[#FFF] font-[700] rounded-[10px] bg-[#0073C6] gap-[8px] p-[5px]  "
      //   >
      //     {downLoadIcon}
      //     Download Brochure
      //   </button>
      // </div>
    )
  );
};

export default DownloadBroucher;
