"use client";
// import { Menu } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import data, { unAuthorizedData } from "@/app/data/dropdown";
// import S from "@/app/styles/DropDown.module.css";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import usePathToOrigin, { encryptUrl } from "@/app/hooks/custom/useRedirect";
import Link from "next/link";
import clsx from "clsx";
import { useMediaQuery } from "@mantine/hooks";
import Btn from "@/app/(dashboard)/new/components/post-your-listing/Btn";
import PostProjectBtn from "@/app/(dashboard)/new/components/PostProjectBtn";
import MenuBtn from "@/app/(dashboard)/new/components/home-search/header/Menu";
import { GrpLogoSvg } from "@/app/images/getrightLogo";
import { usePathname } from "next/navigation";
import { homePageSvgsMap } from "@/app/images/commongsSvgs2";

type Props = {};

export default function Header({}: Props) {
  const isMobile = useMediaQuery("(max-width: 601px)");
  const pathname = usePathname();
  return (
    ![
      "/login",
      "/register",
      "/register/individual",
      "/register/agent",
      "/register/builder",
      "/forgot",
    ].includes(pathname) && (
      <div
        className={`flex h-[70px] items-center justify-between shrink-0 p-1 pl-2 sm:pl-5 w-full py-3 shadow-[0px_4px_20px_0px_rgba(194,194,194,0.20)] bg-gradient-to-r from-[#f1f1f1] via-[#f1f1f1]  to-[#bde3ff] fixed top-0 z-[50] `}
      >
        <Link
          prefetch={false}
          href={"/"}
          title="Home"
          aria-label="Home"
          className={` ${pathname === "/" ? "pointer-events-none" : ""}`}
        >
          <span className="hidden">Home Logo</span>

          <GrpLogoSvg className="h-[54px] w-[160px" />
        </Link>
        {isMobile ? (
          <div className="flex sm:hidden mr-4 gap-4">
            <Btn />
            <MobileDropDown />
          </div>
        ) : (
          <div className="sm:flex items-center justify-center gap-[30px] mr-[40px] hidden">
            <a href={"/blog"} target="_self" rel="noopener noreferrer">
              <p className="text-[#242424] text-xl not-italic font-medium cursor-pointer">
                Blogs
              </p>
            </a>
            <ForBuilders />
            <PostProjectBtn />
            <Btn />
            <Dropdown />
          </div>
        )}
      </div>
    )
  );
}

const ForBuilders = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  return (
    !session && (
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered((prev) => !prev)}
      >
        <button aria-label="For Builders" name="For Builders" title="For Builders" className="text-[#242424] text-xl not-italic font-medium inline-flex gap-2 justify-center items-center">
          For Builders {config.chevron}
        </button>

        {isHovered && (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="!p-0 cursor-pointer w-full absolute min-w-[387px] "
            onClick={() =>
              typeof window !== "undefined"
                ? window.open(`/login?cc=${encryptUrl(pathName)}`)
                : ""
            }
          >
            <div className="mt-[20px] relative w-[387px] h-[178px] shrink-0 rounded border shadow-[0px_4px_20px_0px_rgba(194,194,194,0.40)] border-solid border-[#C5C2DD] bg-gradient-to-r from-[#f5f5f5] to-[#ffeacc] p-6">
              <p className="text-[#F5AC44] text-lg not-italic font-bold">
                Calling Builders!!!
              </p>
              <div className="text-[#242424] text-xs not-italic font-semibold">
                To Post Project Free!
              </div>
              <ul className="ml-5 mt-3">
                <li className="list-disc text-[#242424] text-[12px] not-italic font-medium leading-4">
                  Free Posting
                </li>
                <li className="list-disc text-[#242424] text-[12px] not-italic font-medium leading-4">
                  Multiple Images
                </li>
                <li className="list-disc text-[#242424] text-[12px] not-italic font-medium leading-4">
                  Easy to post
                </li>
              </ul>
              <button className="inline-flex justify-center items-center gap-2.5 rounded px-2.5 py-1 bg-[#0073C6] text-white text-xs not-italic font-bold mt-2">
                Post Project
              </button>

              <Image
                src={"/home/for_builder.svg"}
                alt=""
                width={220}
                height={220}
                className="absolute right-0 bottom-0"
              />
            </div>
          </div>
        )}
      </div>
    )
  );
};

// function Dropdown() {
//   const handleLogout = async () => {
//     try {
//       if (process.env.NODE_ENV === "development") {
//         await signOut();
//         await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/v1/logOut`);
//       } else {
//         await axios
//           .get(`${process.env.NEXT_PUBLIC_URL}/user/v1/logOut`)
//           .then(() => {
//             signOut();
//           });
//       }
//     } catch (error) {
//       console.log("Something Went Wrong", error);
//     }
//   };

//   const { redirectQueryParam } = usePathToOrigin();
//   const { data: session } = useSession();
//   return (
//     <Menu width={200} shadow="md" trigger="click-hover">
//       <Menu.Target>
//         {session ? (
//           <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
//             <button className="inline-flex justify-center items-center gap-1 ">
//               {config.getIcon(session.user.userType)}{" "}
//               {
//                 /* session.user.name.split(" ")[0].length >= 3
//                 ? session.user.name.split(" ")[0]
//                 : session.user.name.split(" ")[1] != undefined
//                 ? session.user.name.split(" ")[1]
//                 : session.user.name.split(" ")[0] */
//                 session.user.name.slice(0, 10)
//               }
//               {`${session.user.name.length > 8 ? "..." : ""}`}
//             </button>
//             {config.blueChevron}
//           </div>
//         ) : (
//           <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
//             <Link
//               prefetch={false}
//               rel="noopener noreferrer"
//               className=""
//               href={{
//                 pathname: `/register`,
//                 search: redirectQueryParam,
//               }}
//               onClick={(e) => {
//                 e.stopPropagation();
//               }}
//             >
//               Login/ Sign up
//             </Link>
//             {config.blueChevron}
//           </div>
//         )}
//       </Menu.Target>

//       {session ? (
//         <Menu.Dropdown
//           className="!z-[1000]"
//           classNames={{
//             dropdown: S.dropdown,
//           }}
//         >
//           <>
//             {data.map((item, index) =>
//               session.user?.userType !== "B" &&
//               item.label === "Post Project" ? null : (
//                 <Menu.Item
//                   key={`dataCrad_${item.label + (index + 1)}`}
//                   classNames={{
//                     itemLabel: S.itemLabel,
//                     item: S.item,
//                   }}
//                   component="a"
//                   className=" text-gray-700 hover:text-green-500 transition-colors flex"
//                   href={item.url}
//                   // target="_self"
//                 >
//                   <div className="flex items-center gap-2">
//                     {homePageSvgsMap.get(item.svg ?? "")}{" "}
//                     <span>{item.label}</span>
//                   </div>
//                 </Menu.Item>
//               )
//             )}
//             <hr className=" bg-[#768AA9] h-0.5 max-w-[90%] m-auto" />
//           </>

//           <Menu.Item
//             classNames={{
//               itemLabel: S.itemLabel,
//             }}
//             component="button"
//             className="block text-gray-700 hover:text-green-500 transition-colors"
//             onClick={handleLogout}
//           >
//             <div className="flex items-center gap-2">
//               {homePageSvgsMap.get("logout")} <span>Log Out</span>
//             </div>
//           </Menu.Item>
//         </Menu.Dropdown>
//       ) : (
//         <Menu.Dropdown
//           className="!z-[1000]"
//           classNames={{
//             dropdown: S.dropdown,
//           }}
//         >
//           {unAuthorizedData.map((item, index) => (
//             <Menu.Item
//               key={item.url}
//               classNames={{
//                 itemLabel: S.itemLabel,
//               }}
//               component={Link}
//               className="block text-gray-700 hover:text-green-500 transition-colors"
//               href={{
//                 pathname: item.url,
//                 search: redirectQueryParam,
//               }}
//             >
//               {item.label}
//             </Menu.Item>
//           ))}
//         </Menu.Dropdown>
//       )}
//     </Menu>
//   );
// }

function Dropdown() {
  const handleLogout = async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        await signOut();
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/v1/logOut`);
      } else {
        await axios
          .get(`${process.env.NEXT_PUBLIC_URL}/user/v1/logOut`)
          .then(() => {
            signOut();
          });
      }
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  };

  const { redirectQueryParam } = usePathToOrigin();
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {session ? (
        <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
          <button
            className="inline-flex justify-center items-center gap-1 "
            onClick={() => setIsHovered((prev) => !prev)}
          >
            {config.getIcon(session.user.userType)}{" "}
            {
              /* session.user.name.split(" ")[0].length >= 3
                ? session.user.name.split(" ")[0]
                : session.user.name.split(" ")[1] != undefined
                ? session.user.name.split(" ")[1]
                : session.user.name.split(" ")[0] */
              session.user.name.slice(0, 10)
            }
            {`${session.user.name.length > 8 ? "..." : ""}`}
          </button>
          {config.blueChevron}
        </div>
      ) : (
        <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
          <Link
            prefetch={false}
            rel="noopener noreferrer"
            className=""
            href={{
              pathname: `/register`,
              search: redirectQueryParam,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsHovered((prev) => !prev);
            }}
          >
            Login/ Sign up
          </Link>
          {config.blueChevron}
        </div>
      )}

      {session
        ? isHovered && (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="absolute"
            >
              <div className="w-full flex flex-col min-w-[172px] mt-[20px] bg-white items-start gap-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] max-w-[180px] p-1 rounded-lg">
                {data.map((item, index) =>
                  session.user?.userType !== "B" &&
                  item.label === "Post Project" ? null : (
                    <Link
                      key={`dataCrad_${item.label + (index + 1)}`}
                      className="flex hover:text-green-500 transition-colors pl-[12px] text-[#505050] font-[400] text-[14px] md:text-[18px] w-full hover:bg-gray-100 "
                      href={item.url}
                      // target="_self"
                    >
                      <div className="flex items-center gap-2">
                        {homePageSvgsMap.get(item.svg ?? "")}{" "}
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  )
                )}
                <hr className=" border-[#768AA9] border-solid border-t-[1px] ml-[12px] w-full max-w-[90%]" />

                <div
                  className="block hover:text-green-500 transition-colors text-[#505050] font-[400] text-[14px] md:text-[18px] max-w-[150px] md:max-w-auto  "
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-2 cursor-pointer ">
                    {homePageSvgsMap.get("logout")} <span>Log Out</span>
                  </div>
                </div>
              </div>
            </div>
          )
        : isHovered && (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="absolute"
            >
              <div className="w-full flex flex-col min-w-[172px] mt-[20px] bg-white items-start gap-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] max-w-[180px] p-1 rounded-lg">
                {unAuthorizedData.map((item) => (
                  <Link
                    key={item.url}
                    className="flex hover:text-green-500 transition-colors pl-[12px] text-[#505050] font-[400] text-[14px] md:text-[18px] w-full hover:bg-gray-100 "
                    href={{
                      pathname: item.url,
                      search: redirectQueryParam,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
    </div>
  );
}

const config = {
  chevron: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#33535F" />
    </svg>
  ),
  blueChevron: (
    <svg
      className="pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path
        d="M0 0.5L4.29289 4.79289C4.68342 5.18342 5.31658 5.18342 5.70711 4.79289L10 0.5H0Z"
        fill="#0073C6"
      />
    </svg>
  ),
  logo: `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/getrightpropertylogo.png`,
  getIcon: (type: string) => {
    const data = {
      B: {
        color: "bg-[#00C5CC]",
        text: "B",
      },
      I: {
        color: "bg-[#9ADB7C]",
        text: "In",
      },
      A: {
        color: "bg-[#FFE53B]",
        text: "A",
      },
    };
    return (
      <span
        className={clsx(
          "flex flex-col justify-center items-center gap-2.5 rounded px-1 text-white pointer-events-none ",
          `${data[type as keyof typeof data].color}`
        )}
      >
        {data[type as keyof typeof data].text}
      </span>
    );
  },
};

function MobileDropDown() {
  const handleLogout = async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        await signOut();
        await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/logOut`
        );
      } else {
        await axios
          .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/logOut`)
          .then(() => {
            signOut();
          });
      }
    } catch (error) {
      console.log("Something Went Wrong", error);
    }
  };

  const { redirectQueryParam } = usePathToOrigin();
  const { data: session } = useSession();
  const isMobile = useMediaQuery("(max-width: 601px)");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative "
      // onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
        {session ? (
          <div onClick={() => setIsHovered((prev) => !prev)} className=" text-[12px] flex justify-center items-center gap-1.5 rounded border shadow-[0px_4px_30px_0px_rgba(194,194,194,0.40)] text-[#0073C6] text-lg not-italic font-semibold leading-[normal] px-2.5 py-1.5 border-solid border-[#0073C6] bg-white">
            <button
              className="inline-flex justify-center items-center gap-1 pointer-events-none "
            >
              {config.getIcon(session.user.userType)}
            </button>
            {config.blueChevron}
          </div>
        ) : (
          <div
            className="w-full min-h-full flex justify-center items-center"
            onClick={() => setIsHovered((prev) => !prev)}
          >
            <MenuBtn />
          </div>
        )}
      </div>
      {session
        ? isHovered && (
            <div
              onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
              className=" w-full flex flex-col absolute right-0 min-w-[150px] top-[48px]  bg-white items-start gap-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] max-w-[180px] p-1 rounded-lg"
            >
              {data.map((item, index) =>
                session.user?.userType !== "B" &&
                item.label === "Post Project" ? null : index == 0 &&
                  isMobile ? (
                  <button
                    onClick={() =>
                      typeof window !== "undefined"
                        ? window.open(
                            `${process.env.NEXT_PUBLIC_PROJECT_URL}/your-profile/dashboard`,
                            "_self",
                            "noreferrer"
                          )
                        : ""
                    }
                    className={`rounded w-full pl-3 text-wrap flex items-center gap-2 text-[14px] text-gray-700 hover:text-green-500 transition-colors p-1 capitalize ${
                      session.user.userType == "A"
                        ? "bg-[#FFFCE7]"
                        : session.user.userType == "B"
                        ? "bg-[#dff8f8]"
                        : "bg-[#D9F1CD]"
                    }`}
                  >
                    {config.getIcon(session.user.userType)}{" "}
                    {session.user.name.split(" ")[0].length >= 3
                      ? session.user.name.split(" ")[0]
                      : session.user.name.split(" ")[1] != undefined
                      ? session.user.name.split(" ")[1]
                      : session.user.name.split(" ")[0]}
                  </button>
                ) : (
                  <Link
                    key={`dataCrad_${item.label[index]}`}
                    className="flex hover:text-green-500 transition-colors pl-[12px] text-[#505050] font-[400] text-[14px] md:text-[18px] w-full hover:bg-gray-100 "
                    href={item.url}
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      {homePageSvgsMap.get(item.svg ?? "")}{" "}
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )
              )}
              <hr className=" border-[#768AA9] border border-b-[1px] h-[0.5px] max-w-[90%] w-full m-auto" />

              <div
                className="block text-gray-700 hover:text-green-500 transition-colors  "
                onClick={handleLogout}
              >
                <div className="flex items-center gap-2 text-[14px] pl-3">
                  {homePageSvgsMap.get("logout")} <span>Log Out</span>
                </div>
              </div>
            </div>
          )
        : isHovered && (
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className=" w-full flex flex-col absolute right-0 min-w-[150px] top-[48px]  bg-white items-start gap-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] max-w-[180px] p-1 rounded-lg"
            >
              {unAuthorizedData.map((item) => (
                <Link
                  key={item.url}
                  className="flex hover:text-green-500 transition-colors pl-[12px] text-[#505050] font-[400] text-[14px] md:text-[18px] w-full hover:bg-gray-100 "
                  href={{
                    pathname: item.url,
                    search: redirectQueryParam,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
    </div>
  );
}
