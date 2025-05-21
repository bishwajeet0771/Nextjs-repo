import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { blogDetails } from "@/app/hooks/blog";
import ContentBox from "@/app/blog/blogDetailSextion/ContentBox";
// import { usePathname } from 'next/navigation';

function BlogDetailLeftSection() {
  const [{ selectedBlog, allBlogData }] = useAtom(blogDetails);
  const data = allBlogData.filter((each) => each.id === selectedBlog.id)[0];
  const pathName = data && data.heading ? data.heading.toLowerCase() : "";
  return (
    <div className="max-w-[617px] w-full ">
      <Image
        src={data?.coverImage}
        alt="blog Image" /*  width={100} height={269}  */
        quality={80}
        height={630}
        width={1200}
        className="rounded-[10px] w-full xl:max-h-[269px] md:max-h-[200px] max-h-[210px] first-letter: border-[0.5px] border-gray border-solid mb-[16px] "
      />
      <ContentBox
        key="BlogDetailLeftSectionContant"
        heading={data && data.heading ? data.heading : ""}
        text={data && data.text ? data.text : ""}
        content={data && data.content ? data.content : ""}
        date={data && data.date ? data.date : ""}
        type="large"
        href={pathName}
      />
    </div>
  );
}

export default BlogDetailLeftSection;
