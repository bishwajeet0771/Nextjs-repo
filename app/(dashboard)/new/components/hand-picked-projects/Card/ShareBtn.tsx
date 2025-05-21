"use client";
// import { searchShareAtom } from "@/app/(dashboard)/searchOldPage/components/SharePopup";
import { ShareIcon } from "@/app/images/HomePageIcons";
// import { useAtom } from "jotai";
import React from "react";

type Props = {
  url: string;
};

export default function ShareBtn({ url }: Props) {
  // const [shareAtomData, setShareAtomData] = useAtom(searchShareAtom);
  return (
    <button
    aria-label="Share Project" name="Share Project" title="Share Project"
      onClick={() =>
        navigator.share({
          title: "Share Project",
          url: url,
        })
      }
      // onClick={() =>
      //   setShareAtomData({
      //     ...shareAtomData,
      //     opened: true,
      //     url,
      //   })
      // }
      className="cursor-pointer"
    >
      <ShareIcon />
    </button>
  );
}
