// import data from "@/app/data/auth";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  content: string;
  className?: {
    title?: string;
    content?: string;
  };
  url?: string;
};

export default function MainHeading({
  title,
  content,
  className,
  url = "/",
}: Props) {
  return (
    <div className="flex flex-row  items-center justify-between">
      <div className=" flex flex-col  max-w-[80%] sm:max-w-full items-start justify-start gap-1">
        <h2
          className={clsx(
            "text-green-700 text-[16px] sm:text-xl xl:text-[24px] not-italic font-bold",
            className?.title
          )}
        >
          {title}
        </h2>
        <h3
          className={clsx(
            "text-black  text-[12px] sm:text-[14px] xl:text-xl not-italic font-medium sm:mt-1",
            className?.content
          )}
        >
          {content}
        </h3>
      </div>
      {title != "Handpicked Projects" &&
        title != "Top Localities" &&
        title != "Listings Posted By" &&
        title != "Latest Blogs" && (
          <Link
            rel="noopener noreferrer"
            className="text-[#0073C6]  text-[14px] sm:text-[18px] xl:text-[20px]  not-italic font-bold leading-[normal]"
            href={url}
          >
            View all
          </Link>
        )}
    </div>
  );
}
