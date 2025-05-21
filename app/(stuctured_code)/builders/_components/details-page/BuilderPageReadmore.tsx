"use client";
import { readMoreAtom } from "@/app/store/drawer";
import { useAtom } from "jotai";
import React from "react";

interface ReadMoreProps {
  text: string;
  maxLines?: number;
  title: string;
  showProjName?: boolean;
  builderName?: string;
}

const BuilderPageReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLines = 4,
  title,
  showProjName = true,
  builderName,
}) => {
  const [{ expanded }, setReadMore] = useAtom(readMoreAtom);

  const handleReadMoreClick = () => {
    setReadMore((prev) => ({
      ...prev,
      expanded: !prev.expanded,
      content: text,
      type: "content",
      title: title,
      showProjName: showProjName,
      ...(builderName && { builderName }),
    }));
  };

  const getClampedText = () => {
    const words = text?.split(" ");
    return words?.slice(0, maxLines * 10).join(" ");
  };

  const shouldShowReadMore = text?.split(" ").length > 50;

  return (
    <div className="w-full ">
      <p className="text-[14px] sm:text-[18px]  xl:text-[24px] font-[500]  text-[#233333] break-words">
        {getClampedText()}
        {!expanded && shouldShowReadMore && "... "}
        {shouldShowReadMore && (
          <span
            className="text-[#0073C6] text-[14px]  sm:text-[18px] xl:text-[22px] not-italic font-semibold cursor-pointer"
            onClick={handleReadMoreClick}
          >
            {expanded ? "" : "Read More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default BuilderPageReadMore;
