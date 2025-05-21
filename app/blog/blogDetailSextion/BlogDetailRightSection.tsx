import { blogDetails } from "@/app/hooks/blog";
import { playIcon } from "@/app/images/commonSvgs";
import { useAtom } from "jotai";
import React from "react";

function BlogDetailRightSection() {
  const [{ selectedBlog, allBlogData }, setBlogData] = useAtom(blogDetails);

  const onValueChange = (value: any) => {
    setBlogData((prev) => ({ ...prev, selectedBlog: value }));
  };

  return (
    <div className=" w-full max-w-[562px] ">
      {allBlogData.map((eachBlog) => {
        return (
          <div
            className={`flex cursor-pointer w-full flex-col items-start gap-1 xl:px-8 xl:py-6 md:px-[24px] md:py-[16px] px-[16px] py-[10px] border-b-[#66666666] border-b border-solid select-none duration-500 ${
                selectedBlog.id === eachBlog.id
                  ? "bg-[#2aa3270f] duration-500"
                  : ""
              }`}
            key={`blogBoxBtns_${eachBlog.id}`}
            onClick={() => onValueChange(eachBlog)}
          >
            <h3
              className={`text-[color:var(--800,#2D3748)] text-[16px] md:text-[14px] not-italic font-bold leading-[normal] flex gap-[8px] 
                ${
                  selectedBlog.id === eachBlog.id
                    ? "xl:text-[20px] md:text-[16px] text-[14px]"
                    : ""
                }`}
            >
              {selectedBlog.id === eachBlog.id ? playIcon : ""}
              {eachBlog.heading}
            </h3>
            <p className="text-[#303030] xl:text-[14px] md:text-[12px] text-[12px] italic font-medium leading-[normal]">
              {eachBlog.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default BlogDetailRightSection;
