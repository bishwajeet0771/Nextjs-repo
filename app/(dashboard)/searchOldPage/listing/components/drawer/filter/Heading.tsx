import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  text: string;
  id: string;
};

export default function Heading({ className, text, id }: Props) {
  return (
    <h2
      className={clsx(
        "text-[#202020] mb-[2%] text-[14px] font-[600] mt-[3%] flex items-center gap-[5px]",
        className
      )}
      id={id}
    >
      {text}
    </h2>
  );
}
