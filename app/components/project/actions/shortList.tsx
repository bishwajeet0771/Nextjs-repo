import {
  // Shorlisted,
  ShortListIcon,
  // shortlistIconSvg,
} from "@/app/images/commonSvgs";
import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
import React from "react";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import clsx from "clsx";
import useDynamicProj from "@/app/hooks/project/useDynamic";
import { queryClient } from "@/app/utils/query";

export default function ShortList({ slug }: { slug: string }) {
  const { data: session } = useSession();

  const { toggleShortlist } = useShortlistAndCompare();
  const [, { open }] = usePopShortList();
  const { data, mutate, getData } = useDynamicProj(slug);
  const handleShortlist = () => {
    mutate(2);
    toggleShortlist({
      id: slug,
      status: data?.shortListed ? "N" : "Y",
    });
  };
  const loginHandleShortList = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["dynamic", slug],
      queryFn: getData,
    });

    if (!data?.shortListed) {
      await mutate(2);
      await toggleShortlist({
        id: slug,
        status: data?.shortListed ? "N" : "Y",
      });
    }
  };
  const onAddingShortList = () => {
    if (session) {
      handleShortlist();
    } else {
      open(loginHandleShortList, {
        type: "shortlist",
        link: slug,
      });
    }
  };
  return (
    <button
      id="shortlist"
      name={`${data?.shortListed ? "Remove From" : "Add to"} Shortlist}`}
      title={`${data?.shortListed ? "Remove From" : "Add to"} Shortlist}`}
      aria-label={`${data?.shortListed ? "Remove From" : "Add to"} Shortlist}`}
      onClick={() => onAddingShortList()}
      className={clsx(
        "flex justify-center items-center gap-1 p-2 rounded-lg border-[0.8px] border-solid border-[#0073C6] bg-[#fafafa] text-[#0073C6] text-[12px] sm:text-base xl:text-[20px] xl:text-2xl not-italic font-semibold leading-[normal] sm:trackin-[0.4px] tracking-[0.96px]   xl:tracking-[0.96px]text-[12px] text-nowrap scroll-mt-[400px]",
        data?.shortListed &&
          "bg-[rgb(231,245,255)] text-[#148B16] text-2xl not-italic font-semibold leading-[normal] tracking-[0.96px]"
      )}
    >
      <ShortListIcon color={data?.shortListed ? "#148B16" : "#0073C6"} />
      {data?.shortListed ? "Remove From" : "Add to"} Shortlist
    </button>
  );
}
