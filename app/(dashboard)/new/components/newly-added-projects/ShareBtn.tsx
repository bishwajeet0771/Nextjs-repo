"use client";
// import { searchShareAtom } from "@/app/(dashboard)/searchOldPage/components/SharePopup";
import { ShareIcon } from "@/app/images/HomePageIcons";
// import { useAtom } from "jotai";
import React from "react";

type Props = {
  url: string;
  type: "prop" | "proj";
};

export default function ShareBtn({ url, type }: Props) {
  // const [shareAtomData, setShareAtomData] = useAtom(searchShareAtom);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.share({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      title: type == "proj" ? "Share Project" : "Share Listing",
    });

    /* 
    setShareAtomData({
      ...shareAtomData,
      opened: true,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      ...(type !== "proj" && {
        title: "Share Listing",
      }),
    }); */
  };
  return (
    <button aria-label="Share this property"  onClick={handleClick} className="cursor-pointer">
      <ShareIcon
        className={"cursor-pointer w-[22px] h-[22px] xl:w-[26px] xl:h-[26px] "}
      />
    </button>
  );
}
