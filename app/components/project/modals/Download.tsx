"use client";
import { useGallery } from "@/app/hooks/useGallery";
import { ShearIcon } from "@/app/images/commonSvgs";
import React from "react";
import SharePopup from "../../atoms/SharePopup";

export default function Download() {
  const [opened, { close }] = useGallery();
  const handleDownload = async () => {
    // var link = document.createElement("a");
    // link.href = "images.jpg";
    // link.download = opened?.url || "gallery.jpg";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // if (opened && opened.url) {
    //   try {
    //     const response = await fetch(opened.url);
    //     const blob = await response.blob();
    //     const url = URL.createObjectURL(blob);
    //     const downloadLink = document.createElement("a");
    //     downloadLink.href = url;
    //     downloadLink.download = "gallery.jpg"; // Set the filename with extension
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    //     document.body.removeChild(downloadLink);
    //     // Clean up the URL object after download
    //     URL.revokeObjectURL(url);
    //   } catch (error) {
    //     console.error("Error downloading image:", error);
    //   }
    // }
  };
  return (
    opened && (
      <div className="w-full bg-[#EDEDED] fixed   h-[57px] flex items-center justify-between  z-[1000] px-10">
        <div className="text-[#333] text-2xl not-italic font-semibold leading-[normal]">
          {opened.type === "image" ? "Gallery" : "Videos"}
        </div>
        <div className="flex justify-center items-center gap-5 mb-2">
          <SharePopup title="Share" />
          {opened.type === "image" && (
            <button
              className="flex justify-center items-center gap-2 px-4 py-2 rounded bg-[#0073C6] text-white"
              onClick={handleDownload}
            >
              Download Image
            </button>
          )}
          <Close close={close} />
        </div>
      </div>
    )
  );
}

const Close = ({ close }: { close: any }) => {
  return (
    <svg
      cursor={"pointer"}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      onClick={close}
    >
      <rect width="36" height="36" rx="18" fill="#FF0000" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.6588 11.7662C26.7669 11.6703 26.8526 11.5563 26.9112 11.4309C26.9697 11.3055 26.9999 11.171 27 11.0353C27.0001 10.8995 26.9701 10.765 26.9117 10.6395C26.8534 10.514 26.7678 10.4 26.6598 10.3039C26.5519 10.2079 26.4237 10.1316 26.2826 10.0796C26.1415 10.0275 25.9903 10.0007 25.8375 10.0006C25.6847 10.0006 25.5335 10.0272 25.3923 10.0791C25.2511 10.131 25.1228 10.2071 25.0148 10.303L17.9999 16.5386L10.987 10.303C10.7687 10.109 10.4726 10 10.1639 10C9.85524 10 9.55919 10.109 9.34091 10.303C9.12263 10.4971 9 10.7602 9 11.0346C9 11.309 9.12263 11.5722 9.34091 11.7662L16.3558 18L9.34091 24.2338C9.23283 24.3299 9.14709 24.4439 9.0886 24.5694C9.03011 24.695 9 24.8295 9 24.9654C9 25.1012 9.03011 25.2358 9.0886 25.3613C9.14709 25.4868 9.23283 25.6009 9.34091 25.697C9.55919 25.891 9.85524 26 10.1639 26C10.3168 26 10.4681 25.9732 10.6093 25.9212C10.7506 25.8692 10.8789 25.793 10.987 25.697L17.9999 19.4614L25.0148 25.697C25.233 25.8908 25.529 25.9995 25.8375 25.9994C26.146 25.9992 26.4418 25.8901 26.6598 25.6961C26.8778 25.502 27.0002 25.239 27 24.9647C26.9998 24.6905 26.8771 24.4276 26.6588 24.2338L19.6439 18L26.6588 11.7662Z"
        fill="white"
      />
    </svg>
  );
};
export function FloorPlanHeader() {
  const [opened, { close }] = useGallery();
  return (
    opened && (
      <div className="w-full bg-[#EDEDED] fixed   h-[57px] flex items-center justify-between  z-[1000] px-10">
        <div className="text-[#333] text-2xl not-italic font-semibold leading-[normal]">
          {opened.type === "image" ? "Gallery" : "Videos"}
        </div>
        <div className="flex justify-center items-center gap-5">
          {" "}
          <button
            //   onClick={open}
            className="shadow-md cursor-pointer gap-[4px] p-[8px] flex justify-center items-center rounded-[20px] bg-[#F3F7FF] text-[#0073C6] text-[14px] font-[600]  max-w-[140px] ml-auto"
          >
            <ShearIcon />
            Share
          </button>
          {opened.type === "image" && (
            <button className="flex justify-center items-center gap-2 px-4 py-2 rounded bg-[#0073C6] text-white">
              DownLoad Image
            </button>
          )}
          <Close close={close} />
        </div>
      </div>
    )
  );
}
