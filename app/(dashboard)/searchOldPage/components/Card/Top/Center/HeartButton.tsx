import React from "react";

type Props = {
  shortListed: string;
  onAddingShortList: () => void;
};

export default function HeartButton({ shortListed, onAddingShortList }: Props) {
  return (
    <button onClick={onAddingShortList}>
      {shortListed ? config.isTrueIcon : config.heartIcon}
    </button>
  );
}

let config = {
  heartIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      className="max-w-fit px-[1px] py-[1px]  rounded  text-[#242424] text-sm not-italic font-semibold  md:mb-1  "
    >
      <circle
        cx="12"
        cy="12"
        r="11.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <path
        d="M15.5334 6C13.1666 6 12 8.36363 12 8.36363C12 8.36363 10.8334 6 8.46665 6C6.54321 6 5.02006 7.63016 5.00037 9.57536C4.96027 13.6131 8.16224 16.4845 11.6719 18.8977C11.7687 18.9643 11.883 19 12 19C12.117 19 12.2314 18.9643 12.3281 18.8977C15.8374 16.4845 19.0394 13.6131 18.9996 9.57536C18.9799 7.63016 17.4568 6 15.5334 6Z"
        stroke="#4D6677"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  isTrueIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="28"
      viewBox="0 0 24 28"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="11.75"
        fill="#ECF0F3"
        stroke="#A7C4DA"
        strokeWidth="0.5"
      />
      <g filter="url(#filter0_d_31_1046)">
        <path
          d="M15.5334 6C13.1666 6 12 8.36363 12 8.36363C12 8.36363 10.8334 6 8.46665 6C6.54321 6 5.02006 7.63016 5.00037 9.57536C4.96027 13.6131 8.16224 16.4845 11.6719 18.8977C11.7687 18.9643 11.883 19 12 19C12.117 19 12.2314 18.9643 12.3281 18.8977C15.8374 16.4845 19.0394 13.6131 18.9996 9.57536C18.9799 7.63016 17.4568 6 15.5334 6Z"
          fill="#EF5A5A"
        />
        <path
          d="M15.5334 6C13.1666 6 12 8.36363 12 8.36363C12 8.36363 10.8334 6 8.46665 6C6.54321 6 5.02006 7.63016 5.00037 9.57536C4.96027 13.6131 8.16224 16.4845 11.6719 18.8977C11.7687 18.9643 11.883 19 12 19C12.117 19 12.2314 18.9643 12.3281 18.8977C15.8374 16.4845 19.0394 13.6131 18.9996 9.57536C18.9799 7.63016 17.4568 6 15.5334 6Z"
          stroke="#FFA6A6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_31_1046"
          x="0.25"
          y="5.25"
          width="23.5"
          height="22.5"
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
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_31_1046"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_31_1046"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  ),
};
