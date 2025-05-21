"use client";

import React from "react";
import Image from "next/image";
// import { useSearchParams } from "next/navigation";
type Props = { searchParams: { path: string; type: "M" | "F" } };
export default function Page({ searchParams: { path, type } }: Props) {
  path = path.replace(" ", "+");
  const types = {
    M: "Master Plan",
    F: "Floor Plan",
    _image: {
      M: "master_plan",
      F: "floor_plan",
    },
  };

  let isDownloading = false; // Flag to track whether a download is in progress
  const handleDownload = async () => {
    // If already downloading, return immediately
    if (isDownloading) {
      console.log("Download in progress, please wait.");
      return;
    }

    // Set downloading flag to true
    isDownloading = true;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IMG_BASE}${path}`
      );

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${types._image[type] || "image"}.webp`; // Set the filename with extension
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      // Clean up the URL object after download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      // Reset downloading flag after completion
      isDownloading = false;
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:items-start mt-6 m-4 h-[60vh] md:mt-[6%]">
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}${path}`}
        height={650}
        width={700}
        alt="post"
        className="h-full"
      />
      <button
        className="inline-flex flex-col items-center  justify-center gap-2.5 p-3 rounded-[10px] bg-[#0073C6] text-white text-lg not-italic font-bold leading-[normal] tracking-[0.96px]  top-[10%] right-[7%]"
        onClick={(e) => {
          e.preventDefault();
          handleDownload();
        }}
      >
        Download {(types[type] as string) || "Image"}
      </button>
    </div>
  );
}
