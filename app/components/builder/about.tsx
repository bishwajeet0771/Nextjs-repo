import React from "react";
import clsx from "clsx";
// import PropertyHeading from "../property/heading";
import ReadMore from "./readmore";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  heading: string;
  projName?: string;
  content: string;
  id?: string;
  type?: "prop" | "proj";
  className?: string;
  showProjName?: boolean;
  builderName?: string;
  icon?: any;
};

export default function About({
  heading,
  content,
  id,
  // projName,
  // type,
  className,
  showProjName,
  builderName,
}: Props) {
  const isMobile = useMediaQuery(`(max-width: 600px)`);
  return (
    <div className={clsx("w-full  mb-[2%]", className)} id={id ?? ""}>
      {/* <h1 className="text-[#242424] text-[28px] not-italic font-semibold mb-2 sm:mb-[24px] flex">
        {heading}
      </h1> */}

      <ReadMore
        text={content}
        maxLines={isMobile ? 3 : 12}
        title={heading}
        showProjName={showProjName}
        builderName={builderName}
      />
    </div>
  );
}
