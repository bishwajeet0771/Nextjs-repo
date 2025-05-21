import React, { useState } from "react";

interface CustomTooltipProps {
  content: string;
  children: React.ReactNode;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div className="absolute -top-[45px] left-1/2 transform -translate-x-1/2 px-3 py-2 z-50 max-w-xs text-sm font-medium text-white bg-gray-900 rounded-md shadow-lg dark:bg-gray-700">
          {content}
          <div className="absolute w-3 h-3 bg-gray-900 dark:bg-gray-700 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" />
        </div>
      )}
      {children}
    </div>
  );
};

interface BoxProps {
  item: any;
}

export const Box: React.FC<BoxProps> = ({ item }) => {
  const truncateText = (text: string, limit: number): string => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  return (
    <CustomTooltip content={item?.name || ""}>
      <div className="inline-flex justify-center items-center gap-2 rounded-full px-3 py-2 border border-[#C3C3C3] bg-white text-[#5B84C0] text-sm font-medium cursor-pointer hover:bg-[#f0f4f8] transition-colors duration-200 shadow-sm">
        <span className="truncate max-w-[150px]">
          {truncateText(item?.name || "", 40)}
        </span>
        {config.icon}
      </div>
    </CustomTooltip>
  );
};

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M9.5 3.5H13.5V7.5"
        stroke="#5B84C0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 3.5L7.85 9.15C7.75654 9.24161 7.63088 9.29293 7.5 9.29293C7.36912 9.29293 7.24346 9.24161 7.15 9.15L4.85 6.85C4.75654 6.75839 4.63088 6.70707 4.5 6.70707C4.36912 6.70707 4.24346 6.75839 4.15 6.85L0.5 10.5"
        stroke="#5B84C0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
