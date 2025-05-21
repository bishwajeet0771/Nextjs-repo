"use client";

import { useAtomValue } from "jotai";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { projSearchStore } from "../../../store/newSearchProjectStore";
import Link from "next/link";

type Props = {
  serverFilterData?: Record<string, any>;
};

function PageTitle({ serverFilterData }: Props) {
  const state = useAtomValue(projSearchStore);

  const paramsData = useParams();
  const path = usePathname();

  function cleanHeading(id: string[]) {
    const sanitizedName = id.map((part) => {
      if (part.includes("PJ")) {
        return;
      }
      return part;
    });
    return sanitizedName
      .join(" ")
      .replace(/\b\d*(B|C|G|L|P|CG|SCG|RCG|PJ)\b/g, "")
      .replace(/\s+/g, " ");
  }

  // const getTitle = (pageUrl: string) => {
  //   if (paramsData && Object.keys(paramsData).length > 0) {
  //     if (paramsData.slug) {
  //       const slug = paramsData.slug as string;
  //       const id = slug?.split("-");
  //       return cleanHeading(id);
  //     } else {
  //       const pageTitle = `Residential Projects For ${
  //         paramsData.bhk_unit_type ? paramsData.bhk_unit_type : ""
  //       } ${paramsData.lt ? paramsData.lt + " for" : ""} ${
  //         state.cg !== "S" ? "Rent" : "Sale"
  //       } in ${paramsData.project ? paramsData.project : "Bengaluru"} ${
  //         paramsData.city ? paramsData.city : paramsData.city ?? ""
  //       }`;
  //       return pageTitle.replaceAll("-", " ");
  //     }
  //   } else if (pageUrl === "/search") {
  //     return "Project Search";
  //   } else if (pageUrl === "/search/listing") {
  //     return "Listing Search";
  //   } else if (pageUrl === "/residential-listings") {
  //     return "Residential Projects";
  //   }
  // };

  const getTitle = (pageUrl: string) => {
    const isListing = path.includes("/residential-listings/");
    if (paramsData && Object.keys(paramsData).length > 0) {
      if (paramsData.slug) {
        const slug = paramsData.slug as string;
        const id = slug?.split("-");
        const isProject = !(slug.includes("rent") || slug.includes("sale"))
          ? "Property For Sale | Rent"
          : "";
        return `${isProject}  ${cleanHeading(id)}`;
      } else {
        let firstString = paramsData.bhk_unit_type
          ? paramsData.bhk_unit_type
          : paramsData.phase
          ? paramsData.phase
          : `Residential ${isListing ? "Listings" : "Projects"}`;
        const pageTitle = `${firstString} For ${
          serverFilterData?.cg === "R" || state.cg === "R" ? "Rent" : "Sale"
        } in ${paramsData.project ?? ""} ${paramsData.lt ?? ""} ${
          paramsData.city ?? "Bengaluru"
        }`;

        return pageTitle.replaceAll("-", " ");
      }
    } else if (paramsData && Object.keys(paramsData).length === 0) {
      let firstString = `Residential ${isListing ? "Listings" : "Projects"}`;

      const pageTitle = `${firstString} For ${
        state.cg === "R" ? "Rent" : "Sale"
      } in Bengaluru`;
      return pageTitle;
    } else if (pageUrl === "/search") {
      return "Search Results for";
    } else if (pageUrl === "/search/listing") {
      return "Search Results for";
    } else if (pageUrl === "/residential-listings") {
      return "Residential Projects";
    } else if (pageUrl === "/residential/projects") {
      return "Search Results For 'Residential Projects In Bengaluru'";
    }
  };

  const [hideHeading, setHideHeading] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setHideHeading(true);
    };

    window.addEventListener("click", handlePopState);
    return () => window.removeEventListener("click", handlePopState);
  }, []);

  const getParagraph = () => {
  
  };
  return (
    <div>
     { !hideHeading ? (
    <div className=" text-[16px] md:text-[18px] ml-[8px] xl:text-[20px] mb-[6px] capitalize flex flex-wrap ">
      <span className="mr-[6px]">Search Results for</span>
      <h1 className="font-bold text-[16px] md:text-[18px] xl:text-[20px] ">
        {getTitle(path)}
      </h1>
    </div>
  ) : (
    <h1 className="font-bold text-[16px] md:text-[18px] xl:text-[20px] mb-[6px] ml-[8px] capitalize flex gap-[6px]  ">
      Find your dream home, where comfort meets convenience.
    </h1>
  )}
    
{/*       {getParagraph()} */}
    </div>
  );
}

export default PageTitle;
