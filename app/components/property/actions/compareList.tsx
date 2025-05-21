"use client";
import {
  ComparingListIcon,
  // comparingIcon
} from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import useDynamicProp from "@/app/hooks/property/useDyanamic";
import { listingProps } from "@/app/data/projectDetails";
// import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";
import { useErrorListing } from "@/app/hooks/property/useError";

export default function CompareList({ cg, propTypeName }: any) {
  const { data: session } = useSession();
  const { slug, bhk_unit_type } = useParams<{
    slug: string;
    bhk_unit_type: string;
  }>();
  const { toggleCompare } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const [, {  open: openSuccesPopup }] = useErrorListing();
  const { data, mutate } = useDynamicProp({
    cg,
    propId: listingProps[propTypeName.trim() as keyof typeof listingProps],
  });
  const onAddingCompare = () => {
    if (data?.compareCount >= 5 && !data?.compareAdded) {
      openSuccesPopup();
      return;
    }
    if (session) {
      mutate(3);
      toggleCompare({
        id: (slug || bhk_unit_type).split("-")[1],
        status: data?.compareAdded ? "N" : "Y",
        source: "prop",
      });
    } else {
      open();
    }
  };

  return (
    <button
    aria-label={`${data?.compareAdded ? "Remove From" : "Add to"} Compare}`}
              name={`${data?.compareAdded ? "Remove From" : "Add to"} Compare}`} 
              title={`${data?.compareAdded ? "Remove From" : "Add to"} Compare}`}
      onClick={() => onAddingCompare()}
      className={clsx(
        "flex justify-center items-center gap-1 p-2 rounded-lg border-[0.8px] xl:mt-3 border-solid border-[#0073C6] bg-[#fafafa] text-[#0073C6] sm:text-[20px] xl:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] sm:tracking-[0.4px] xl:tracking-[0.96px] mt-0 text-[12px] text-nowrap mb-[10px] md:mb-0",
        data?.compareAdded &&
          "bg-[rgb(231,245,255)] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
      )}
    >
      <ComparingListIcon color={data?.compareAdded ? "#148B16" : "#0073C6"} />
      {data?.compareAdded ? "Remove From" : "Add to"} Compare
    </button>
  );
}
