"use client";
// import { Image } from "@mantine/core";
import React from "react";
import ReactPlayer from "react-player";

// import NextImage from "next/image";
type Props = { searchParams: { path: string } };
export default function Page({ searchParams: { path } }: Props) {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        path.includes("youtube")
          ? path
          : `${process.env.NEXT_PUBLIC_IMG_BASE}${path}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "grp.mp4"; // Set the filename with extension
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      // Clean up the URL object after download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh] ">
      {!path.includes("youtube") && (
        <button
          className="inline-flex flex-col items-center justify-center gap-2.5 p-3 rounded-[10px] bg-[#0073C6] text-white text-lg not-italic font-bold leading-[normal] tracking-[0.96px] absolute top-[10%] right-[24.5%]"
          onClick={(e) => {
            e.preventDefault();
            handleDownload();
          }}
        >
          Download Video
        </button>
      )}
      <ReactPlayer
        url={`${process.env.NEXT_PUBLIC_IMG_BASE}${path}`}
        width="auto"
        height="550px"
        controls
      />
    </div>
  );
}
