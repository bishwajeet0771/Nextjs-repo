"use client";
import Link from "next/link";
import React from "react";
import { getQueryParam } from "@/app/hooks/custom/useRedirect";
import clsx from "clsx";
type Props = {
  searchParams: any;
  state: string;
  singupText?: string;
  className?: string;
};

export default function LoginSignupTabs({
  searchParams,
  state,
  singupText,
  className,
}: Props) {
  const activeClassName = clsx(
    "flex flex-col justify-center items-center gap-1 rounded border shadow-[0px_4px_11.1px_0px_rgba(25,80,71,0.46)_inset,0px_4px_12.9px_0px_rgba(140,177,141,0.38)] px-[28px] md:px-[52px] py-1.5 border-solid border-[#148B16] bg-[#148b16] text-white xl:text-2xl not-italic font-bold leading-[normal] sm:text-[24px] text-nowrap text-[16px] ",
    className
  );
  const inactiveClassName =
    "flex flex-col justify-center items-center gap-1 rounded   px-[28px] py-1.5  bg-transparent text-[#242424] text-nowrap  xl:text-[20px] not-italic font-[500] leading-[normal] sm:text-[24px]";

  return (
    <div className="inline-flex items-center border   rounded-md border-solid border-[#CDD7DE] bg-[#fafafa] ">
      <Link
      role="link"
        className={state === "login" ? activeClassName : inactiveClassName}
        href={{
          pathname: "/login",
          search: getQueryParam(searchParams),
        }}
      >
        Login
      </Link>
      <Link
      role="link"
        href={{
          pathname: "/register",
          search: getQueryParam(searchParams),
        }}
        className={state === "signup" ? activeClassName : inactiveClassName}
      >
        {singupText ?? "Sign Up"}
      </Link>
    </div>
  );
}
