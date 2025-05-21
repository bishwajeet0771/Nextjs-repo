"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { newsData } from "../store/newsState";
import { useAtom } from "jotai";
import Image from "next/image";
import { SocialIcons } from "@/app/images/commonSvgs";
import Link from "next/link";

type Props = {};
const styles = {
  soclalIconStyle: "h-[24px] w-[24px] md:h-[32px] md:w-[32px]",
};
export const commonLinks = {
  redirections: [
    { name: "Bangalore Real Estate", link: "/market-trends/locality-insights" },
    { name: "Builders", link: "/search?sf=listedBy=B" },
    { name: "Buyers", link: "/search" },
    { name: "Owners", link: "/search?sf=listedBy=I" },
    { name: "Real Estate News", link: "/market-trends/news" },
    { name: "Residential", link: "/search?sf=listedBy=All" },
  ],
  socialIcons: [
    {
      name: "facebook",
      icon: <SocialIcons type="facebook" className={styles.soclalIconStyle} />,
      link: "https://www.facebook.com/profile.php?id=100066833915037",
    },
    {
      name: "instagram",
      icon: <SocialIcons type="instagram" className={styles.soclalIconStyle} />,
      link: "https://www.instagram.com/_getrightproperty_/?utm_source=qr#",
    },
    {
      name: "twitter",
      icon: <SocialIcons type="twitter" className={styles.soclalIconStyle} />,
      link: "https://x.com/getrightproperty",
    },
    {
      name: "youtube",
      icon: <SocialIcons type="youtube" className={styles.soclalIconStyle} />,
      link: "https://youtube.com/@getrightproperty-1?si=GEoeTK1G9g0LkNau",
    },
    {
      name: "linkedin",
      icon: <SocialIcons type="linkdin" className={styles.soclalIconStyle} />,
      link: "https://www.linkedin.com/company/get-right-property/",
    },
  ],
};

function NewsDetailsPage({}: Props) {
  const [{ allData }] = useAtom(newsData);
  const path = usePathname();
  const currentBlog = path.split("/")[2].replaceAll("-", " ");

  const data: any = allData.filter(
    (each: any) => each?.name === currentBlog
  )[0];
  if (!data) return;
  const {  title, desc, url } = data;

  return (
    <div className=" flex flex-col  w-[96%] md:w-[80%] xl:w-[50%] py-[30px] ">
      <h1 className=" text-[20px] md:text-[24px] xl:text-[36px] font-bold text-wrap mb-[14px] md:mb-[20px] ">
        {title}
      </h1>
      <div className="flex flex-col md:flex-row justify-between w-full md:items-center mb-[16px]  md:mb-[26px] ">
        <div className="flex flex-wrap gap-[10px]">
          {commonLinks.redirections.map((eachOne: any) => {
            return (
              <Link
                prefetch={false}
                rel="noopener noreferrer"
                key={eachOne.name}
                href={eachOne.link}
              >
                <p className=" bg-gray-400 text-[10px] md:text-[12px] cursor-pointer text-white p-[2px] px-[4px] md:px-[6px] ">
                  #{eachOne.name}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="flex space-x-6 mt-[10px] gap-[10px] md:gap-[16px] md:mt-0 items-end justify-end max-h-[32px] ">
          {commonLinks.socialIcons.map(({ name, icon, link }) => (
            <Link
              prefetch={false}
              rel="noreferrer"
              key={name}
              href={link}
              className="text-white hover:text-gray-300 !m-0"
              target="_blank"
            >
              <span className="sr-only">{name}</span>
              {icon}
            </Link>
          ))}
        </div>
      </div>

      <div className="h-[280px] md:h-[360px] xl:h-[400px] w-full bg-gray-300 mb-[16px] ">
        <Image
          src={url}
          width={800}
          height={800}
          alt="not found"
          className=" w-full h-full "
        />
      </div>

      <p
        dangerouslySetInnerHTML={{ __html: desc }}
        className="custom-html text-[14px] md:text-[16px] leading-[26px] mb-[16px] "
      />
    </div>
  );
}

export default NewsDetailsPage;
