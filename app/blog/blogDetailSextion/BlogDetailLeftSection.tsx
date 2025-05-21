import React from "react";
import ContentBox from "./ContentBox";
import Image from "next/image";
import { useAtom } from "jotai";
import { blogDetails } from "@/app/hooks/blog";
import { usePathname } from "next/navigation";
import Link from "next/link";

function BlogDetailLeftSection() {
  const [{ selectedBlog, allBlogData }] = useAtom(blogDetails);
  const data = allBlogData.filter(
    (each) => each.heading === selectedBlog.heading
  )[0];
  const pathName =
    data && data.heading ? data.heading.toLowerCase().replaceAll(" ", "-") : "";
  const path = usePathname();

  return (
    <Link
      rel="noopener noreferrer"
      href={`${path}/${pathName}`}
      prefetch={false}
    >
      <div className="max-w-[617px] w-full ">
        <Image
          src={data?.coverImage}
          alt="blog Image" /* width={100} height={269}  */
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
    </Link>
  );
}

export default BlogDetailLeftSection;
