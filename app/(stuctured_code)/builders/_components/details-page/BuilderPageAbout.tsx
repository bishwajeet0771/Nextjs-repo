import React from "react";
import clsx from "clsx";
import { useMediaQuery } from "@mantine/hooks";
import BuilderPageReadMore from "./BuilderPageReadmore";

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

export default function BuilderPageAbout({
  heading,
  content,
  id,
  className,
  showProjName,
  builderName,
  // projName,
  // type,
}: Props) {
  const isMobile = useMediaQuery(`(max-width: 600px)`);
  return (
    <div className={clsx("w-full  mb-[2%]", className)} id={id ?? ""}>
      <BuilderPageReadMore
        text={content}
        maxLines={isMobile ? 3 : 12}
        title={heading}
        showProjName={showProjName}
        builderName={builderName}
      />
    </div>
  );
}
