"use client";
import RTK_CONFIG from "@/app/config/rtk";
import {
  completedProjIconSvg,
  newLaunchProjIconSvg,
  onGoingProjIconSvg,
} from "@/app/images/commonSvgs";
import { getBuilderProjectsCount } from "@/app/utils/api/builder";
import Link from "next/link";
// import { useRouter } from "next/navigation";

import React from "react";
import { useQuery } from "react-query";

type Props = {
  id: string;
  builderName: string;
};

export default function BuilderProjectsCount({ id, builderName }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: [`BuilderProjectsCount`, id],
    queryFn: async () => {
      const response = await getBuilderProjectsCount(id);
      // Convert string like '{106=5, 107=1}' to proper object
      if (typeof response.projectCount === "string") {
        const countStr = response.projectCount.slice(1, -1); // Remove { }
        const counts = Object.fromEntries(
          countStr.split(",").map((pair: string) => {
            const [key, value] = pair.split("=").map((s: string) => s.trim());
            return [key, parseInt(value)];
          })
        );
        response.projectCount = counts;
      }

      return {
        ...response,
        onGoing: response.projectCount?.[106] || 0,
        newLaunch: response.projectCount?.[108] || 0,
        completed: response.projectCount?.[107] || 0,
      };
    },
    ...RTK_CONFIG,
  });
  const builderQueryNameAndId = encodeURIComponent(`${builderName}+${id}`);
  if (isLoading) {
    return (
      <div className="sm:rounded-[20px]  flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[3%] sm:w-[65%] xl:w-[50%] p-[1%] border border-gray-300">
        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px] animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
        <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px] animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
        <div className="w-[30%] animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="sm:rounded-[20px] flex justify-between items-center bg-[#FFF] shadow-md w-[100%] mb-[1%] sm:w-[65%] xl:w-[50%] p-[1%] border border-gray-300">
      <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
        {data?.newLaunch > 0 ? (
          <Link
            href={`/search?sf=projStatus=108-builderIds=${builderQueryNameAndId}`}
            rel="noopener noreferrer"
            className="block"
          >
            <p className="flex justify-between items-center w-[90%]">
              <span className="text-[#202020]text-[16px] sm:text-[20px] lg:text-[24px] font-[600]">
                {data?.newLaunch}
              </span>
              {newLaunchProjIconSvg}
            </p>
            <span className="text-[#0C5F0E] text-[13px] lg:text-[20px] font-[700]">
              New Launch {`Project${data?.newLaunch > 1 ? "s" : ""}`}
            </span>
          </Link>
        ) : (
          <div>
            <div className="flex justify-between items-center w-[90%]">
              <span className="text-[#202020]text-[16px] sm:text-[20px] lg:text-[24px] font-[600]">
                0
              </span>
            </div>
            <p className="text-[#0C5F0E] text-[13px] lg:text-[20px] font-[700]">
              New Launch Projects
            </p>
          </div>
        )}
      </div>

      <div className="w-[30%] border-solid border-[#92B2C8] border-r-[1px]">
        {data?.onGoing > 0 ? (
          <Link
            prefetch={false}
            href={`/search?sf=projStatus=106-builderIds=${builderQueryNameAndId}`}
            rel="noopener noreferrer"
            className="block"
          >
            <p className="flex justify-between items-center w-[90%]">
              <span className="text-[#202020]text-[16px] sm:text-[20px] lg:text-[24px] font-[600]">
                {data?.onGoing}
              </span>
              {onGoingProjIconSvg}
            </p>
            <span className="text-[#0073C6] text-[13px] lg:text-[20px] font-[700]">
              Ongoing <br className="block sm:hidden" />{" "}
              {`Project${data?.onGoing > 1 ? "s" : ""}`}
            </span>
          </Link>
        ) : (
          <div>
            <div className="flex justify-between items-center w-[90%]">
              <span className="text-[#202020]text-[16px] sm:text-[20px] lg:text-[24px] font-[600]">
                0
              </span>
            </div>
            <p className="text-[#0073C6] text-[13px] lg:text-[20px] font-[700]">
              Ongoing <br className="block sm:hidden" /> Projects
            </p>
          </div>
        )}
      </div>

      <div className="w-[30%]">
        {data?.completed > 0 ? (
          <Link
            href={`/search?sf=projStatus=107-builderIds=${builderQueryNameAndId}`}
            rel="noopener noreferrer"
            className="block"
          >
            <p className="flex justify-between items-center w-[90%]">
              <span className="text-[#202020]text-[16px] sm:text-[20px] lg:text-[24px] font-[600]">
                {data?.completed}
              </span>
              {completedProjIconSvg}
            </p>
            <span className="text-yellow-900 text-[13px] lg:text-[20px] font-[700]">
              Completed {`Project${data?.completed > 1 ? "s" : ""}`}
            </span>
          </Link>
        ) : (
          <div>
            <div className="flex justify-between items-center w-[90%]">
              <span className="text-[#202020]text-[16px] sm:text-[20px] lg:text-[24px] font-[600]">
                0
              </span>
            </div>
            <p className="text-yellow-900 text-[13px] lg:text-[20px] font-[700]">
              Completed Projects
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
