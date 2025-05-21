"use client";
import { readMoreAtom } from "@/app/store/drawer";
import { useAtom } from "jotai";
import React from "react";
import { preventBackButton } from "../molecules/popups/req";

interface ReadMoreProps {
  text: string;
  maxLines?: number;
  title: string;
  showProjName?: boolean;
  builderName?: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLines = 4,
  title,
  showProjName = true,
  builderName,
}) => {
  const [{ expanded }, setReadMore] = useAtom(readMoreAtom);
  const charLimit = maxLines * 100;
  const shouldShowReadMore = text?.length > charLimit;

  const handleReadMoreClick = () => {
    if (shouldShowReadMore) {
      preventBackButton();
      document.body.style.overflow = "hidden";
      setReadMore((prev) => ({
        ...prev,
        expanded: !prev.expanded,
        content: text,
        type: "content",
        title,
        showProjName,
        ...(builderName && { builderName }),
      }));
    }
  };

  return (
    <button aria-label="Read More" name="Read More" title="Read More" onClick={handleReadMoreClick}>
      {/* {!expanded && shouldShowReadMore && "... "} */}
      {shouldShowReadMore && (
        <span className="text-[#0073C6] text-[14px] sm:text-[18px] xl:text-[22px] not-italic font-semibold cursor-pointer underline">
          {expanded ? "" : "Read More"}
        </span>
      )}
    </button>
  );
};

export default ReadMore;
