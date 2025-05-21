"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import S from "@/app/styles/DropDown.module.css";
// import { deleteCookie } from "cookies-next";

export default function AuthButton() {
  const { data: session } = useSession();

  const postProjectLink = session
    ? `${process.env.NEXT_PUBLIC_PROJECT_URL}/post-your-project`
    : "/login";

  const postListingLink = session
    ? `${process.env.NEXT_PUBLIC_PROJECT_URL}/post-your-listing`
    : "/register";

  return (
    <>
      {session?.user?.isActive === "Y" && session?.user?.userType === "B" && (
        <Link
          rel="noopener noreferrer"
          href={postProjectLink}
          className="text-[16px] gap-[10px] lg:text-[20px] flex justify-center items-center font-semibold px-5 bg-[#227FBC] py-1.5 rounded-xl text-white"
        >
          {postDetailsIcon}
          Post Your Project
        </Link>
      )}
      {(session?.user?.isActive === "Y" || !session) && (
        <Link
          rel="noopener noreferrer"
          href={postListingLink}
          className="hidden md:flex text-[12px] py-1 px-1 gap-[10px] lg:text-[20px]  justify-center items-center font-semibold md:px-5 bg-[#227FBC] md:py-1.5 rounded-xl text-white"
        >
          {postDetailsIcon}
          Post Listing
        </Link>
      )}

      <Dropdown />
    </>
  );
}

import { Menu } from "@mantine/core";
import data, { unAuthorizedData } from "@/app/data/dropdown";
import { postDetailsIcon } from "@/app/images/commonSvgs";
import axios from "axios";
import usePathToOrigin from "@/app/hooks/custom/useRedirect";

function Dropdown() {
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
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        {session ? (
          <button className="login-btn text-[20px] font-semibold px-5 py-2 rounded-full flex flex-row-reverse justify-center gap- items-center text-[#0073C6] border-none underline loginBg shadow-md">
            <Image width={30} height={30} alt="logout" src="/burger.svg" />{" "}
            {session?.user?.name}
          </button>
        ) : (
          <div className="login-btn text-[12px] sm:text-[20px] font-semibold px-5 py-2 rounded-full flex flex-row-reverse justify-center gap- items-center text-[#0073C6] border-none underline loginBg shadow-md">
            <Image width={30} height={30} alt="logout" src="/burger.svg" />{" "}
            <Link
              href={{
                pathname: `/register`,
                search: redirectQueryParam,
              }}
              className=" md:text-[20px] mr-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span> Login/Sign up</span>
            </Link>
          </div>
        )}
      </Menu.Target>
      {session ? (
        <Menu.Dropdown
          className="!z-[1000]"
          classNames={{
            dropdown: S.dropdown,
          }}
        >
          <>
            {data.map((item) =>
              session.user?.userType !== "B" &&
              item.label === "Post Project" ? null : (
                <Menu.Item
                  key={item.label}
                  classNames={{
                    itemLabel: S.itemLabel,
                  }}
                  component="a"
                  className="block text-gray-700 hover:text-green-500 transition-colors"
                  href={item.url}
                  target="_self"
                >
                  {item.label}
                </Menu.Item>
              )
            )}
            <hr className=" bg-[#768AA9] h-0.5 max-w-[90%] m-auto" />
          </>

          <Menu.Item
            classNames={{
              itemLabel: S.itemLabel,
            }}
            component="button"
            className="block text-gray-700 hover:text-green-500 transition-colors"
            onClick={handleLogout}
          >
            Log Out
          </Menu.Item>
        </Menu.Dropdown>
      ) : (
        <Menu.Dropdown
          className="!z-[1000]"
          classNames={{
            dropdown: S.dropdown,
          }}
        >
          {unAuthorizedData.map((item) => (
            <Menu.Item
              key={"unAuthorizedData_" + item.label}
              classNames={{
                itemLabel: S.itemLabel,
              }}
              component={Link}
              className="block text-gray-700 hover:text-green-500 transition-colors"
              href={{
                pathname: item.url,
                search: redirectQueryParam,
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  );
}
