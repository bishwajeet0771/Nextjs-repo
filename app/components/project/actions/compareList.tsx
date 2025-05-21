"use client";
import { ComparingListIcon } from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import useDynamicProj from "@/app/hooks/project/useDynamic";
import { useMessagePopup } from "@/app/hooks/project/useMessagePopup";
import { queryClient } from "@/app/utils/query";

export default function CompareList({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const { toggleCompare } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const { data, mutate, getData } = useDynamicProj(slug);
  const [, { open: openSuccesPopup }] = useMessagePopup("compare");
  const handleCompare = () => {
    mutate(3);
    toggleCompare({ id: slug, status: data?.compareAdded ? "N" : "Y" });
  };
  const loginHandleComapare = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["dynamic", slug],
      queryFn: getData,
    });
    if (data?.compareCount >= 5 && !data?.compareAdded) {
      openSuccesPopup();
      return;
    }
    mutate(3);
    await toggleCompare({ id: slug, status: data?.compareAdded ? "N" : "Y" });
  };
  const onAddingCompare = () => {
    if (data?.compareCount >= 5 && !data?.compareAdded) {
      openSuccesPopup();
      return;
    }

    if (session) {
      handleCompare();
      return;
    } else {
      open(loginHandleComapare);
    }
  };
  return (
    <button
      id="compare"
      aria-label={`${data?.shortListed ? "Remove From" : "Add to"} Compare}`}
      onClick={() => onAddingCompare()}
      className={clsx(
        "flex justify-center items-center gap-1 p-2 rounded-lg border-[0.8px] mt-3 border-solid border-[#0073C6] bg-[#fafafa] text-[#0073C6] sm:text-base xl:text-[20px] xl:text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px] sm:tracking-[0.4px]  xl:tracking-[0.96px]   sm:mt-2 xl:mt-5 text-[12px] text-nowrap scroll-mt-[400px]",
        data?.compareAdded &&
          "bg-[rgb(231,245,255)] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
      )}
    >
      <ComparingListIcon color={data?.compareAdded ? "#148B16" : "#0073C6"} />
      {data?.compareAdded ? "Remove From" : "Add to"} Compare
    </button>
  );
}
