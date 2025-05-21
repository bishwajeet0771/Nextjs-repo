/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { blogDetails } from "@/app/hooks/blog";
import {
  backIcon,
  Facebook,
  facebookRedirectLink,
  ShearIcon,
  TringleIcons,
  WhatsApp,
  whatsappRedirectLink,
} from "@/app/images/commonSvgs";
import {
  usePathname,
  // useSearchParams
} from "next/navigation";
import Link from "next/link";

function BlogDetailsFirstBlock() {
  const [{ allBlogData }, setBlogDetails] = useAtom(blogDetails);
  const path = usePathname();

  const currentBlog = path.split("/")[2].replaceAll("-", " ");

  const data: any = allBlogData.filter(
    (each) => each.heading.toLowerCase() === currentBlog.toLowerCase()
  )[0];

  const { date, text, heading, coverImage } = data;

  useEffect(() => {
    setBlogDetails((prev) => ({ ...prev, selectedBlog: data }));
  }, [data]);
  console.log(path, "where is consoleing get the details");
  // const getParams = useSearchParams();
  // let listedBy = getParams.get("pp");
  // const pathHref = listedBy === "B" ? "/blog" : listedBy === "G" ? "/buying-guide" : "/";

  return (
    <div className="w-[94%] xl:w-[80%] flex flex-col md:flex-row justify-between items-center gap-[20px] mt-[5%] mb-[40px] md:mb-[5%] xl:mb-[160px] pt-[30px] md:pt-[50px] relative  ">
      {/*      <a href={pathHref} target="_blank"> */}
      <Link
        href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/buying-guide`}
        className="text-[#202020] text-[16px] md:text-[18px] xl:text-[20px] not-italic font-medium leading-[normal] gap-[8px] absolute top-0 left-0 flex justify-center items-center self-start "
      >
        <span className=" bg-[#E8F3FF] w-[18px] h-[18px] xl:w-[32px] xl:h-[32px] rounded-[50%] flex justify-center items-center ">
          {backIcon}
        </span>
        Back
      </Link>
      {/*      </a> */}

      <div className="rounded-[10px] relative w-full md:w-[50%] max-h-[463px] border-[0.5px] border-gray border-solid  bg-white ">
        <TringleIcons
          key="TringleIcon1"
          className="absolute bottom-[-180px] left-[-120px] z-0 xl:w-[408px] xl:h-[427px] w-[308px] h-[327px]"
          number={1}
        />
        <TringleIcons
          key="TringleIcon2"
          className="absolute bottom-[-60px] left-[20px] z-10 xl:w-[208px] xl:h-[217px] w-[108px] h-[117px]"
          number={2}
        />
        <TringleIcons
          key="TringleIcon2"
          className="absolute top-[20%] right-[-60px] z-10 xl:w-[167px] xl:h-[170px] w-[67px] h-[70px]"
          number={3}
        />
        <TringleIcons
          key="TringleIcon2"
          className="absolute top-[24%] right-[0] md:right-[-120px] z-10 xl:w-[105px] xl:h-[110px] w-[65px] h-[60px]"
          number={4}
        />
        <TringleIcons
          key="TringleIcon2"
          className="absolute top-[-50px] right-[-10px] z-10 xl:w-[61px] xl:h-[64px]"
          number={5}
        />

        <Image
          src={coverImage}
          quality={80}
          height={630}
          width={1200}
          alt="blog Image"
          className="rounded-[10px] w-full h-full relative max-h-[260px] md:max-h-[463px] bg-white z-1"
        />
      </div>

      <div className="w-full md:w-[45%] relative z-10 ">
        <h3
          className={`text-[color:var(--800,#2D3748)] not-italic font-bold leading-[normal] mb-[12px] md:mb-[16px] xl:mb-[22px] text-[18px] md:text-[22px] lg:text-[30px]  `}
        >
          {heading}
        </h3>
        <p
          className={`text-[#01417C] italic font-medium leading-[normal] text-[14px] md:text-[16px] xl:text-[22px] mb-[12px] md:mb-[16px] xl:mb-[22px] `}
        >
          {text}
        </p>

        <div className={`flex justify-between items-center `}>
          <p
            className={`text-[#627A9E] italic font-medium leading-[normal] text-[16px]`}
          >
            {date}
          </p>
          <div className="gap-[12px] flex justify-center items-center h-[24px] ">
            {/* <FacebookShareButton /> */}
            <ShearIcon
              onClick={() =>
                navigator.share({
                  title: "Share Blog",
                  url: "",
                })
              }
              className={"w-[24px] h-[24px]"}
            />
            <Link
              prefetch={false}
              rel="noreferrer"
              href={facebookRedirectLink}
              target="_blank"
            >
              <Facebook className={"w-[24px] h-[24px]"} />
            </Link>
            <Link
              prefetch={false}
              rel="noreferrer"
              href={whatsappRedirectLink}
              target="_blank"
            >
              <WhatsApp className={"w-[24px] h-[24px]"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailsFirstBlock;
