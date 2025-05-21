"use cilent";

import { SelectedHeartIcon } from "@/app/images/HomePageIcons";
import React from "react";
import { useQuery } from "react-query";
import { getShortIds } from "../../api";
import Link from "next/link";

type Props = {};

export default function ShortListed({}: Props) {
  const { data } = useQuery({
    queryKey: ["shortListed"],
    queryFn: getShortIds,
  });
  return data.total ? (
    <Link 
    prefetch={false}
    rel="noopener noreferrer"
      href="/your-profile/shortlisted"
      className="inline-flex items-center gap-[5px] rounded shadow-[0px_4px_20px_0px_rgba(0,0,0,0.40)] sm:p-1 xl:p-2 border-[0.5px] border-solid border-[#2D4657] bg-[#1a2733] fixed bottom-10 right-5 sm:text-sm xl:text-xl z-[1000]"
    >
      <span className="hidden sm:block text-white font-bold">Shortlisted</span>{" "}
      <div className="flex justify-center items-center rounded-sm border-[0.5px] border-solid border-[#4A7091] bg-[#2d4657] px-1 gap-1 text-white sm:text-sm xl:text-xl not-italic font-bold">
        <p>{1000}</p>
        <SelectedHeartIcon />
      </div>
    </Link>
  ) : null;
}
