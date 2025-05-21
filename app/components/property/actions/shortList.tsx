import {
  // Shorlisted,
  ShortListIcon,
  // shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
// import useDynamicProj from "@/app/hooks/project/useDynamic";
import useDynamicProp from "@/app/hooks/property/useDyanamic";
import { listingProps } from "@/app/data/projectDetails";

export default function ShortList({ cg, propTypeName }: any) {
  const { data: session } = useSession();
  const { slug, bhk_unit_type } = useParams<{
    slug: string;
    bhk_unit_type: string;
  }>();
  const { toggleShortlist } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const { data, mutate } = useDynamicProp({
    cg,
    propId: listingProps[propTypeName.trim() as keyof typeof listingProps],
  });

  const onAddingShortList = () => {
    if (session) {
      mutate(2);
      toggleShortlist({
        id: (slug || bhk_unit_type).split("-")[1],
        status: data?.shortListed ? "N" : "Y",
        source: "prop",
      });
    } else {
      open();
    }
  };
  return (
    <button
      aria-label={`${data?.shortListed ? "Remove from" : "Add to"} Shortlist}`}
      name={`${data?.shortListed ? "Remove from" : "Add to"} Shortlist}`} 
      title={`${data?.shortListed ? "Remove from" : "Add to"} Shortlist}`}
      onClick={() => onAddingShortList()}
      className={clsx(
        "flex justify-center items-center gap-1 p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa] text-[#0073C6] text-[12px] sm:text-[20px] xl:text-2xl not-italic font-semibold leading-[normal] sm:trackin-[0.4px] tracking-[0.96px] xl:tracking-[0.96px] text-nowrap   xl:mr-0 mb-[10px] xl:mb-0 ",
        data?.shortListed &&
          "bg-[rgb(231,245,255)] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
      )}
    >
      <ShortListIcon color={data?.shortListed ? "#148B16" : "#0073C6"} />
      {data?.shortListed ? "Remove from" : "Add to"} Shortlist
    </button>
  );
}
