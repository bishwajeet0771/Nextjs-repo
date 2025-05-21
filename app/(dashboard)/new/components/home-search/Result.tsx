/* eslint-disable react/no-array-index-key */
"use client";
import Loading from "@/app/components/atoms/Loader";
import useQsearch from "@/app/hooks/search/useQsearch";
import {
  SearchLocationIcon,
  mainSearchNoResult,
} from "@/app/images/commonSvgs";
import { homeSearchFiltersAtom } from "@/app/store/home";
// import { ScrollArea } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import toast from "react-hot-toast";
import { GrayMapIcon } from "@/app/images/commongsSvgs2";
import { useRecentSearched } from "@/app/hooks/custom/useRecentSearch";
import { extractApiValues } from "@/app/utils/dyanamic/projects";
import { FaExclamationCircle } from "react-icons/fa";

export default function Results() {
  const { data, isLoading, handleResetQuery } = useQsearch();
  const { addToRecent } = useRecentSearched();

  const [filters, dispatch] = useAtom(homeSearchFiltersAtom);
  if (isLoading) {
    return <Loading />;
  }
  const {
    localities,
    builders,
    cities,
    projects,
    listing: listings,
    projectListing,
  } = data;
  const handleAddSearch = (newItem: string) => {
    if (!filters.locality.includes(newItem)) {
      dispatch({ type: "ADD_LOCALITY", payload: newItem });
      handleResetQuery();
    } else {
      toast.error("The locality already exists.");
    }
  };

  const handlePush = async (type: string, data: any, apiData: any) => {
    // console.log("aa aa a a");
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
        addToRecent({ ...apiData, ct: "project" });
        if (apiData.type === "Project") {
          window.open(apiData.stringUrl, "_self");
        } else {
          // const phase = "";
          window.open(
            `/search/listing?sf=projIdEnc=${
              apiData.stringId.split("_")[0]
            }-phaseId=${apiData.stringId.split("_")[1]}-projName=${
              apiData.name
            }`,
            "_self"
          );
        }

        break;
      case "listing":
        {
          addToRecent({ ...apiData, ct: "listing" });
          const data = extractApiValues(apiData.stringId);
          /* console.log(JSON.stringify(data, ));
          alert(JSON.stringify(data));
          console.log(JSON.stringify(data, ...apiData)); */

          let localityName = apiData.name.split("-")[1]
            ? apiData.name.split("-")[1]
            : apiData.name.split(" in ")[1];
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
          window.open(url, "_self");
          /*   {
            let url;
            let localityName = apiData.name.split("-")[1] ? apiData.name.split("-")[1] : apiData.name.split(" in ")[1];
            url =
              `propType=${data.PT}${data.BH ? `-bhk=${data.BH}` : ""}-cg=${
                data.CG
              }-listedBy=All-localities=${localityName}` +
              "%2B" +
              encodeURIComponent(data.LT);
            window.open(
              data.PJ && data.PJ !== "null"
                ? `/search/listing?sf=${url}`
                : "/search?sf=" + url
            );
          } */
        }
        break;
      case "projectListing":
        {
          addToRecent({ ...apiData, ct: "projectListing" });
          let projectName = data.name.split(" in ")[1].trim();

          const url = `projIdEnc=${
            data.stringId
          }-listedBy=${AgentOwnerBuilderMap.get(
            apiData.type
          )}-projName=${projectName}`;
          window.open("/search/listing?sf=" + url, "_self");
        }
        break;
      case "builder":
        {
          addToRecent({ ...apiData, ct: "builder" });
          if (apiData.type === "BuilderDetail") {
            window.open(apiData.stringUrl, "_self");
          } else {
            const url =
              encodeURIComponent(data.name) +
              "%2B" +
              encodeURIComponent(
                apiData.stringId.split("_")[1]
                  ? apiData.stringId.split("_")[1]
                  : apiData.stringId
              );
            window.open(
              `/search?sf=builderIds=${url}-city=${encodeURIComponent(
                filters?.city ?? ""
              )}${
                apiData.type !== "BuilderProject"
                  ? `-listedBy=${AgentOwnerBuilderMap.get(apiData.type)}`
                  : ""
              }`,
              "_self"
            );
          }
        }
        // const url = encodeURI(`${data.name}+${data.id}`);

        break;
      default:
        break;
    }
  };
  const isEmptyOrNull = (arr: any[]) => !arr || arr.length === 0;

  const noResults =
    isEmptyOrNull(localities) &&
    isEmptyOrNull(cities) &&
    isEmptyOrNull(builders) &&
    isEmptyOrNull(projects) &&
    isEmptyOrNull(listings) &&
    isEmptyOrNull(projectListing);
  const showCityError = !filters.city;

  const newListing = listings.filter(
    (item: any, index: number, self: any) =>
      index === self.findIndex((t: any) => t.name === item.name)
  );
  return showCityError ? (
    <div className="px-4 py-3 bg-gray-100 border-l-4 border-gray-400 rounded">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <FaExclamationCircle
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-700 font-medium">
            Please select a city to start your search. Choose a city to see
            relevant results.
          </p>
        </div>
      </div>
    </div>
  ) : (
    /* //overflow-auto ${
        noResults || data == undefined ? "sm:h-[150px]" : " sm:h-[330px] max-h-[200px] "
      } ` */
    <div className={`px-2  py-2 min-h-[100px]  h-auto w-full  `}>
      {noResults || data == undefined ? (
        <div className="px-1 py-2 flex flex-row items-center justify-center gap-1">
          {mainSearchNoResult}
          <p className=" font-[600] text-black text-base ">
            Please Enter a Valid Location, Project, or Listing
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div>
            {localities?.length > 0 && (
              <h2
                key="localities-heading"
                className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] font-bold xl:text-[16px] not-italic leading-[normal] flex items-center gap-1 sm:gap-1 xl:text-nowrap cursor-pointer"
              >
                <SearchLocationIcon /> <span>Location</span>
              </h2>
            )}

            {localities?.length > 0 && (
              <SubHeading key="localities-subheading" text="Locality" />
            )}
            <ul key="localities-list">
              {localities?.map((locality: any, index: number) => (
                <li
                  onClick={() =>
                    handleAddSearch(`${locality.name}+${locality.stringId}`)
                  }
                  className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic  leading-[normal] flex items-center gap-1 sm:gap-1 xl:text-nowrap cursor-pointer"
                  key={`locality-${index}`}
                >
                  <GrayMapIcon className="min-w-[10px] min-h-[10px] max-w-[10px] max-h-[10px]" />{" "}
                  {locality.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {projects && projects.length > 0 && (
              <h2
                key="projects-heading"
                className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic font-semibold leading-[normal] flex items-center gap-1 sm:gap-1 xl:text-nowrap cursor-pointer sm:text-xl  space-x-2   mb-1"
              >
                {property}{" "}
                <span className="text-[14px] sm:text-[14px] xl:text-[16px]">
                  Projects
                </span>
              </h2>
            )}
            <ul key="projects-list">
              {projects?.map((project: any, index: number) => (
                <li
                  onClick={() => handlePush("project", project.id, project)}
                  className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic  leading-[normal] flex items-center gap-1  xl:text-nowrap cursor-pointer"
                  key={`project-${index}`}
                >
                  <GrayMapIcon className="min-w-[10px] min-h-[10px] max-w-[10px] max-h-[10px]" />{" "}
                  {project.name}
                </li>
              ))}
            </ul>

            {projectListing?.length > 0 && (
              <SubHeading
                key="project-listings-subheading"
                text="Project Listings"
              />
            )}
            <ul key="project-listings-list">
              {projectListing?.map((projectListing: any, index: number) => (
                <li
                  onClick={() =>
                    handlePush("projectListing", projectListing, projectListing)
                  }
                  className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic  leading-[normal] flex items-center gap-1  xl:text-nowrap cursor-pointer"
                  key={`projectListing-${index}`}
                >
                  <GrayMapIcon className="min-w-[10px] min-h-[10px] max-w-[10px] max-h-[10px]" />{" "}
                  {projectListing.name}
                </li>
              ))}
            </ul>
            {newListing?.length > 0 && (
              <SubHeading key="listings-subheading" text="Listings" />
            )}
            <ul key="listings-list">
              {newListing?.map((listing: any, index: number) => (
                <li
                  onClick={() =>
                    handlePush(
                      "listing",
                      {
                        id: listing.id,
                        name: listing.name.split(" in ")[1],
                      },
                      listing
                    )
                  }
                  className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic  leading-[normal] flex items-center gap-1  xl:text-nowrap cursor-pointer"
                  key={`listing-${index}`}
                >
                  <GrayMapIcon className="min-w-[10px] min-h-[10px] max-w-[10px] max-h-[10px]" />{" "}
                  {listing.name}
                </li>
              ))}
            </ul>
            {builders?.length > 0 && (
              <SubHeading key="builders-subheading" text="Builders" />
            )}
            <ul key="builders-list">
              {builders?.map((builder: any, index: number) => (
                <li
                  onClick={() =>
                    handlePush(
                      "builder",
                      {
                        name: builder.name,
                        id: builder.id,
                      },
                      builder
                    )
                  }
                  className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic leading-[normal] flex items-center gap-1  xl:text-nowrap cursor-pointer"
                  key={`builder-${index}`}
                >
                  <GrayMapIcon className="min-w-[10px] min-h-[10px] max-w-[10px] max-h-[10px]" />{" "}
                  {builder.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

const SubHeading = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-1.5 mt-[14px] mb-1">
      <div className="text-[#242424] sm:text-wrap text-[14px] sm:!mb-[10px] sm:text-[14px] xl:text-[16px] not-italic font-semibold leading-[normal] flex items-center gap-1  xl:text-nowrap">
        {text}
      </div>
      <hr className="w-full h-px border-0 bg-[#98A5B8]" />
    </div>
  );
};

const property = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip0_2974_100402)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8554 1.89162C11.0345 1.832 11.2248 1.81372 11.412 1.83815C11.5991 1.86259 11.7784 1.9291 11.9362 2.0327C12.094 2.1363 12.2263 2.2743 12.3231 2.43633C12.42 2.59837 12.4789 2.78024 12.4954 2.96829L12.5004 3.07829V7.64995L15.662 8.28329C15.9255 8.33579 16.1651 8.47179 16.3452 8.67112C16.5253 8.87046 16.6364 9.12252 16.662 9.38995L16.667 9.50829V15.8333H17.5004C17.7128 15.8335 17.9171 15.9149 18.0715 16.0607C18.226 16.2065 18.3189 16.4057 18.3314 16.6178C18.3438 16.8298 18.2748 17.0386 18.1385 17.2015C18.0022 17.3644 17.8088 17.469 17.5979 17.4941L17.5004 17.5H2.50038C2.28798 17.4997 2.08369 17.4184 1.92924 17.2726C1.77479 17.1268 1.68185 16.9275 1.6694 16.7155C1.65695 16.5034 1.72594 16.2946 1.86227 16.1318C1.99859 15.9689 2.19197 15.8642 2.40288 15.8391L2.50038 15.8333H3.33371V5.29995C3.33371 4.79995 3.63038 4.35329 4.08205 4.15495L4.18871 4.11412L10.8554 1.89162ZM10.8337 3.65662L5.00038 5.60079V15.8333H10.8337V3.65662ZM12.5004 9.35079V15.8333H15.0004V9.84995L12.5004 9.35079Z"
        fill="#5F81B2"
      />
    </g>
    <defs>
      <clipPath id="clip0_2974_100402">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
