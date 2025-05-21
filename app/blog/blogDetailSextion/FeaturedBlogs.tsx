"use client";
import { blogDetails } from "@/app/hooks/blog";
import { getClampedText } from "@/app/news/components/NewsSections";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function FeaturedBlogCard({ data }: { data: any }) {
  return (
    <div className=" min-w-[297px] min-h-[340px] md:min-h-[380px] border-t-1 border-solid shadow-[0px_4px_4px_0px_rgba(192,189,189,0.25)] rounded-[5px] ">
      <Image
        src={data?.coverImage}
        alt="blog Image"
        quality={80}
        height={630}
        width={1200}
        className="rounded-t-[10px] w-full h-[179px]"
      />

      <div className="p-[10px] md:p-[12px] xl:p-[16px] relative flex flex-col ">
        <h3 className="text-[color:var(--800,#2D3748)] text-[14px] not-italic font-bold leading-[normal] mb-[4px] ">
          {data.heading}
        </h3>
        <p className="text-[#01417C] text-[12px] italic font-bold leading-[normal] mb-[12px] md:mb-[16px]">
          {data.text}
        </p>
        <p className=" text-[#303030] text-xs not-italic font-normal leading-[normal] mb-[16px] md:mb-[26px]">
          {getClampedText(data.content, 5)}
        </p>
        <div className=" flex justify-between items-center mt-auto w-full ">
          <span className="text-[#627A9E] text-[12px] italic font-bold leading-[normal]">
            {data.date}
          </span>
          <span className="text-[color:var(--800,#2D3748)] font- text-[12px] not-italic font-bold leading-[normal]">
            Read more
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedBlogs() {
  const [{ allBlogData, selectedBlog }] = useAtom(blogDetails);
  const newList = allBlogData.filter(
    (each: any) => each?.id !== selectedBlog?.id
  );

  return (
    <div className=" mb-[3%] w-[94%] md:w-[90%] xl:w-[80%] ">
      <h2 className="text-black text-[20px] md:text-[24px] xl:text-[32px] italic font-bold leading-[normal] mb-[32px] ">
        Featured{" "}
        <span className="text-[#2AA327] italic font-bold leading-[normal]">
          Blogs
        </span>
      </h2>
      <div className=" flex justify-between items-start xl:gap-[20px] gap-[10px] p-[8px] overflow-x-auto ">
        {newList.map((each) => {
          const pathName =
            each && each.heading
              ? each.heading.toLowerCase().replaceAll(" ", "-")
              : "";
          return (
            <Link
              prefetch={false}
              rel="noopener noreferrer"
              key={`FeaturedBlogCard_${each.heading}`}
              href={`/blog/${pathName}`}
            >
              <FeaturedBlogCard data={each} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedBlogs;
