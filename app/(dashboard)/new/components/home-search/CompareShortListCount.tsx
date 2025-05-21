import { SelectedHeartIcon } from "@/app/images/HomePageIcons";
import React from "react";
import { useQuery } from "react-query";
// import { getShortIds } from "../../api";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  initialValue: Record<string, any>;
};

export default function CompareShortListCount({ initialValue }: Props) {
  const session = useSession();
  const getShortIds = async () => {
    if (session) {
      try {
        if (process.env.NODE_ENV === "development") {
          return {
            total: 8,
            projIds: [
              "9ea8cf3c5e833a71663f440d450f942f",
              "9891b38e10299b88cef791a58bc03af8",
              "4e4920af760dd82499ef7f855cbba69f",
            ],
            propIds: [
              "68da26ae16f44473a3e7710febcf6f03",
              "493516e7f29fa40dbe483c79fd3591b6",
              "881a9dfc336469ae1bc8f2f6d5af1266",
              "f38e3fde9948b9dfa85a578c80dd663b",
              "2d320b68173ffd4516aad7b2d95001d7",
            ],
          };
        } else {
          let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/shortlist/ids`;
          let data = await fetch(url, {
            headers: {
              // @ts-ignore
              Authorization: `${session?.user?.token as any}`,
            },
          });

          return await data.json();
        }
      } catch (error: any) {
        return {
          total: 0,
          propIds: [],
          projIds: [],
        };
      }
    }
  };
  const { data, isLoading } = useQuery({
    initialData: initialValue,
    queryKey: ["shortListed-compare-count"],
    queryFn: getShortIds,
    enabled: false,
  });
  return (
    !isLoading && (
      <Link
        prefetch={false}
        rel="noopener noreferrer"
        href="/your-profile/shortlisted"
        className="inline-flex items-center gap-[5px] rounded shadow-[0px_4px_20px_0px_rgba(0,0,0,0.40)] sm:p-1 xl:p-2 border-[0.5px] border-solid border-[#2D4657] bg-[#1a2733] fixed bottom-10 right-5 sm:text-sm xl:text-xl z-[1000]"
      >
        <span className="hidden sm:block text-white font-bold">
          Shortlisted
        </span>{" "}
        <div className="flex justify-center items-center rounded-sm border-[0.5px] border-solid border-[#4A7091] bg-[#2d4657] px-1 gap-1 text-white sm:text-sm xl:text-xl not-italic font-bold">
          <p>{data.total}</p>
          <SelectedHeartIcon />
        </div>
      </Link>
    )
  );
}
