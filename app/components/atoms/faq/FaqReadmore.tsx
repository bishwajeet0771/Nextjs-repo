import React, { useState, useMemo } from "react";

interface ReadMoreProps {
  text: string;
  maxLines?: number;
  title: string;
  showReadMoreButton?: boolean; // Add a prop to control Read More/Less visibility
}

const FaqReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLines = 4,
  // title,
  showReadMoreButton = true,
}) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const shouldShowReadMore = useMemo(
    () => text?.split(" ").length > 50,
    [text]
  );
  const handleReadMoreClick = () => {
    shouldShowReadMore && !isReadMore && setIsReadMore(!isReadMore);
  };
  const getClampedText = useMemo(() => {
    const words = text?.split(" ");
    return !isReadMore ? words?.slice(0, maxLines * 10).join(" ") : text;
  }, [text, maxLines, isReadMore]);

  return (
    <div className="w-[90%]" onClick={handleReadMoreClick}>
      <p className="text-[#303A42] text-[14px] sm:text-[18px] xl:text-[22px] not-italic font-normal sm:leading-9 text-wrap break-words max-w-[100%]">
        {`${getClampedText}${isReadMore ? "..." : ""}`}

        {showReadMoreButton && shouldShowReadMore && (
          <span
            className="text-[#0073C6] text-[14px]  sm:text-[18px] xl:text-[22px] not-italic font-semibold cursor-pointer"
            role="button" // Add role for accessibility
            tabIndex={0} // Add tabIndex for accessibility
            aria-label={isReadMore ? "Read Less" : "Read More"} // Add ARIA label
            onClick={() => isReadMore && setIsReadMore(!isReadMore)}
          >
            {isReadMore ? " Read Less" : " Read More"}
          </span>
        )}
      </p>
    </div>
  );
};

export default FaqReadMore;
