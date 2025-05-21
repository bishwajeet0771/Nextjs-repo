"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {
  Icon: React.ReactNode;
  title: string;
  content: string;
  type: "email" | "mobile" | "text";
  textClassName?: string;
};

export default function Card({
  Icon,
  title,
  content,
  type,
  textClassName,
}: Props) {
  const renderContent = () => {
    return (
      <p className="text-[#242424] mt-0.5 text-[14px] sm:text-lg xl:text-2xl not-italic font-semibold underline">
        {content}
      </p>
    );
  };
  const scheme = type === "email" ? "mailto:" : type === "mobile" ? "tel:" : "";
  return type === "text" ? (
    <div>
      <div className={clsx(styles.container, styles.text)}>
        {Icon} {title}
      </div>
      <div className=" sm:mt-2">
        <p className={clsx(styles.content, textClassName)}>{content}</p>
      </div>
    </div>
  ) : (
    <Link rel="noopener noreferrer"   href={`${scheme}${content.replace(/\s+/g, "")}`} className={clsx("cursor-pointer")} prefetch={false}>
      <div className={clsx(styles.container, styles.text)}>
        {Icon} {title}
      </div>
      <div className=" sm:mt-2">{renderContent()}</div>
    </Link>
  );
}

const styles = {
  container:
    "inline-flex justify-center items-center gap-0.5 p-1 rounded-md bg-gradient-to-tr from-[#EFF5FF] to-[#F2FAFF] ",
  text: "text-[#00487C] text-[14px] sm:text-xl  xl:text-[28px] not-italic font-semibold ",
  content:
    "text-[#242424]  mt-1 text-[14px] sm:text-xl xl:text-2xl not-italic font-semibold",
};
