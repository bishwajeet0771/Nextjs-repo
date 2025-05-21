"use client";
import useSearchFilters from "@/app/hooks/search";
import clsx from "clsx";
import React from "react";

export default function ClearAll({
  type,
  close,
}: {
  type: "unitType" | "price" | "all" | "propType" | "prjectsearchlisting";
  close?: () => void;
}) {
  const { handleReset, handleAppliedFilters } = useSearchFilters();
  const handleApply = () => {
    handleAppliedFilters();
    if (close) close(); // --- listing type
  };
  return (
    <div className="flex w-full justify-end items-center pl-auto pr-[13px] py-[5px] bg-[#F4F4F4] ">
      <button
        className="text-[12px] text-[#0073C6] md:text-lg not-italic font-semibold leading-[normal] underline mr-3 md:mr-5 cursor-pointer"
        onClick={() => handleReset(type)}
      >
        {type === "price" || type == "propType" ? "Clear Filter" : "Clear All"}{" "}
      </button>
      <button
        className="flex justify-center text-[12px] items-center gap-1 px-1 md:px-2 py-1 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] rounded-[10px] bg-[#0073C6] text-white sm:text-[18px] not-italic font-semibold leading-[normal]"
        onClick={handleApply}
      >
        {type === "price" || type == "propType"
          ? "Apply Filter"
          : "Apply Filters"}{" "}
      </button>
      <CloseModal onClose={() => close && close()} className="ml-3" />
    </div>
  );
}
const CloseModal = ({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      onClick={onClose}
      className={clsx("cursor-pointer sm:hidden block", className)}
    >
      <g filter="url(#filter0_d_365_112992)">
        <rect x="4" width="19" height="19" rx="9.5" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.8294 5.99349C17.8834 5.93952 17.9263 5.87543 17.9556 5.80488C17.9849 5.73433 18 5.65871 18 5.58233C18 5.50595 17.985 5.43031 17.9559 5.35973C17.9267 5.28915 17.8839 5.225 17.8299 5.17096C17.7759 5.11692 17.7118 5.07404 17.6413 5.04477C17.5707 5.01549 17.4951 5.0004 17.4187 5.00036C17.3424 5.00031 17.2667 5.01531 17.1961 5.04449C17.1256 5.07368 17.0614 5.11648 17.0074 5.17046L13.4999 8.67797L9.99348 5.17046C9.88434 5.06132 9.73631 5 9.58197 5C9.42762 5 9.27959 5.06132 9.17045 5.17046C9.06131 5.2796 9 5.42763 9 5.58198C9 5.73633 9.06131 5.88435 9.17045 5.99349L12.6779 9.5L9.17045 13.0065C9.11641 13.0605 9.07355 13.1247 9.0443 13.1953C9.01505 13.2659 9 13.3416 9 13.418C9 13.4944 9.01505 13.5701 9.0443 13.6407C9.07355 13.7113 9.11641 13.7755 9.17045 13.8295C9.27959 13.9387 9.42762 14 9.58197 14C9.65839 14 9.73407 13.9849 9.80467 13.9557C9.87528 13.9265 9.93944 13.8836 9.99348 13.8295L13.4999 10.322L17.0074 13.8295C17.1165 13.9385 17.2645 13.9997 17.4187 13.9996C17.573 13.9995 17.7209 13.9382 17.8299 13.829C17.9389 13.7199 18.0001 13.5719 18 13.4177C17.9999 13.2634 17.9385 13.1155 17.8294 13.0065L14.3219 9.5L17.8294 5.99349Z"
          fill="#FF0000"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_365_112992"
          x="0"
          y="0"
          width="27"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_365_112992"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_365_112992"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
