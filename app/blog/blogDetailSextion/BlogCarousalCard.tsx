"use client";
import React from "react";
import ContentBox from "./ContentBox";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  data: any;
  // proviousPage?: String;
};

function BlogCard({ data }: Props) {
  const path = usePathname();
  const title = data && data.heading ? data.heading : "";
  const pathName = title.toLowerCase().replaceAll(" ", "-");

  return (
    <Link
      rel="noopener noreferrer"
      href={`${path}/${pathName}`}
      prefetch={false}
    >
      <div className="w-full shadow-[0px_4px_4px_0px_rgba(192,189,189,0.25)] rounded-[5px] bg-white min-w-[280px] min-h-[430px]">
        <Image
          src={data?.coverImage}
          alt="blog Image"
          quality={80}
          height={630}
          width={1200}
          className="rounded-[10px] w-full max-h-[179px] border-[0.5px] border-gray border-solid mb-[16px] h-[280px]"
        />
        <ContentBox
          heading={title}
          text={data && data.text ? data.text : ""}
          content={data && data.content ? data.content : ""}
          date={data && data.date ? data.date : ""}
          type="small"
          href={pathName}
        />
      </div>
    </Link>
  );
}

export default BlogCard;
