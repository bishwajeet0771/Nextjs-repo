import Tooltip from "@/app/components/atoms/Tooltip";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { extractApiValues } from "@/app/utils/dyanamic/projects";
import { truncateText } from "@/app/utils/letters";
// import { Tooltip } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  item: any;
};

// const url = `/search/listing?sf=propType=${data.PT}${
//   data.BH ? `-bhk=${data.BH}` : ""
// }-cg=${
//   data.CG
// }-localities=${localityName}%2B${encodeURIComponent(
//   data.LT
// )}${
//   data.PJ && data.PJ !== "null"
//     ? `-projIdEnc=${data.PJ}-projName=${apiData.name
//         .split(" in ")[1]
//         .split("-")[0]
//         .trim()}`
//     : ""
// }`;

export default function Box({ item }: Props) {
  const filters = useAtomValue(homeSearchFiltersAtom);
  const router = useRouter();

  const handlePush = async (type: string, data: any, apiData: any) => {
    // console.log("box.ts")
    const AgentOwnerBuilderMap = new Map([
      ["BuilderAgentListing", "A"],
      ["BuilderOwnerListing", "I"],
      ["BuilderBuilderListing", "B"],
      ["ProjectAgentListing", "A"],
      ["ProjectOwnerListing", "I"],
      ["ProjectBuilderListing", "B"],
    ]);
    switch (type) {
      case "project":
        if (apiData.type === "Project") {
          router.push(apiData.stringUrl);
        } else {
          router.push(
            `/search/listing?sf=projIdEnc=${
              apiData.stringId.split("_")[0]
            }-phaseId=${apiData.stringId.split("_")[1]}-projName=${
              apiData.name
            }`
          );
        }

        break;
      case "listing":
        {
          const data = extractApiValues(apiData.stringId);

          let localityName = apiData.name.split(" in ")[1].toLowerCase().trim();

          // let url;
          // url =
          //   `propType=${data.PT}${data.BH ? `-bhk=${data.BH}` : ""}-cg=${
          //     data.CG
          //   }-localities=${localityName}` +
          //   "%2B" +
          //   encodeURIComponent(data.LT);
          // window.open(
          //   data.PJ && data.PJ !== "null"
          //     ? `/search/listing?sf=${url}`
          //     : "/search/?sf=" + `${url}-listedBy=All`,
          //   "_blank",
          //   "noreferrer"
          // );

          const url = `/search/listing?sf=propType=${data.PT}${
            data.BH ? `-bhk=${data.BH}` : ""
          }-cg=${data.CG}-localities=${localityName}%2B${encodeURIComponent(
            data.LT
          )}${
            data.PJ && data.PJ !== "null"
              ? `-projIdEnc=${data.PJ}-projName=${apiData.name
                  .split(" in ")[1]
                  .split("-")[0]
                  .trim()}`
              : ""
          }`;
          router.push(url);
        }
        break;
      case "projectListing":
        {
          let projectName = data.name.split(" in ")[1].trim();

          const url = `projIdEnc=${
            data.stringId
          }&listedBy=${AgentOwnerBuilderMap.get(
            apiData.type
          )}&projName=${projectName}`;
          router.push("/search/listing?sf=" + url);
        }
        break;
      case "builder":
        {
          if (apiData.type === "BuilderDetail") {
            router.push(apiData.stringUrl);
          } else {
            const url =
              encodeURIComponent(data.name) +
              "%2B" +
              encodeURIComponent(apiData.stringId.split("_")[1]);
            router.push(
              `/search?sf=builderIds=${url}-city=${encodeURIComponent(
                filters?.city ?? ""
              )}${
                apiData.type !== "BuilderProject"
                  ? `-listedBy=${AgentOwnerBuilderMap.get(apiData.type)}`
                  : ""
              }`
            );
          }
        }
        // const url = encodeURI(`${data.name}+${data.id}`);

        break;
      default:
        break;
    }
  };

  return (
    <Tooltip text={item.name}>
     <div
        onClick={() => handlePush(item.ct, item, item)}
        className="inline-flex justify-center items-center gap-2 rounded-lg px-3 py-1.5 border border-gray-300 bg-white text-blue-800 text-[13px] mb-[4px] sm:text-sm font-medium cursor-pointer text-nowrap shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200"
      >
        {truncateText(item?.name, 36)} {config.icon}
      </div>
    </Tooltip>
  );
}

const config = {
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 14 15"
      fill="none"
    >
      <path
        d="M9.5 4H13.5V8"
        stroke="#4B77C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 4L7.85 9.65C7.75654 9.74161 7.63088 9.79293 7.5 9.79293C7.36912 9.79293 7.24346 9.74161 7.15 9.65L4.85 7.35C4.75654 7.25839 4.63088 7.20707 4.5 7.20707C4.36912 7.20707 4.24346 7.25839 4.15 7.35L0.5 11"
        stroke="#4B77C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// /search/listing?sf=propType=31-bhk=49-cg=S-localities=sterling%20villa%20grande-krishnarajapura%2B369-projIdEnc=0bc531c355e8cd106f9b2cb44a4aa5f8-projName=Sterling%20Villa%20Grande

// /search/listing?sf=propType=31-bhk=49-cg=S-localities=Krishnarajapura%2B369-projIdEnc=0bc531c355e8cd106f9b2cb44a4aa5f8-projName=Sterling%20Villa%20Grande
