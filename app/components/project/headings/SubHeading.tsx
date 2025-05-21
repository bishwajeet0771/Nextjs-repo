import clsx from "clsx";
import React from "react";

type Props = {
  className?: string;
  text: string;
};

export default function SubHeading({ className, text }: Props) {
  return (
    <h3
      className={clsx(
        "text-[13px] sm:text-[16px] xl:text-2xl  text-[#344273]  italic font-semibold leading-[normal] mb-2",
        className
      )}
    >
      {text}
    </h3>
  );
}
