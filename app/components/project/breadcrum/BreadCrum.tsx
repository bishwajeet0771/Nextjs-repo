import { slugify } from "@/app/utils/linkRouters/ProjectLink";
import Link from "next/link";
import React from "react";

export default function BreadCrumbs({ params: routes }: { params: any }) {
  const params = {
    "/": "",
    residential: "residential",
    projects: "projects",
    ...routes,
  };
  const allParams = Object.keys(params);
  // const titleOfKeys = {
  //   city: "",
  //   lt: "",
  // };
  let currentPath = "";
  const breadcrumsschema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allParams.map((key, index) => {
      currentPath += `/${slugify(params[key])}`;
      let name = params[key].replace(/-/g, " ");
      const newArray = name.split(" ").slice(0, -1);
      let newName = key !== "slug" ? name : newArray.join(" ");
      if (index === 0) {
        currentPath = "";
        newName = "Home";
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        name: newName,
        item: `${process.env.NEXT_PUBLIC_PROJECT_URL}${currentPath}`,
      };
    }),
  };
  let siteMapPath = "";
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@graph": allParams.map((key, index) => {
      siteMapPath += `/${slugify(params[key])}`;
      let name = params[key].replace(/-/g, " ");
      const newArray = name.split(" ").slice(0, -1);
      let newName = key !== "slug" ? name : newArray.join(" ");
      if (index === 0) {
        siteMapPath = "";
        newName = "Home";
      }
      return {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: newName,
        url: `${process.env.NEXT_PUBLIC_PROJECT_URL}${siteMapPath}`,
      };
    }),
  };
  let currentPath2 = "";
  return (
    <>
      <script
        id="BreadCrumbsScript1"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumsschema),
        }}
      />

      <script
        id="BreadCrumbsScript2"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
      <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
        {allParams.map((key, index) => {
          currentPath2 += `/${slugify(params[key])}`;
          let name = params[key].replace(/-/g, " ");
          const newArray = name.split(" ").slice(0, -1);
          let newName = key !== "slug" ? name : newArray.join(" ");
          if (index === 0) {
            currentPath2 = "";
            newName = "Home";
          }
          return (
            <React.Fragment key={`${key[index]}`}>
              {index < Object.keys(params).length - 1 ? (
                <Link
                  prefetch={false}
                  href={`${process.env.NEXT_PUBLIC_PROJECT_URL}${currentPath2}`}
                  className="hover:underline cursor-pointer capitalize"
                  // target="_blank"
                >
                  <span>{newName}</span>
                </Link>
              ) : (
                  <span className="capitalize">
                    {newName.replace("undefined ", "")}
                  </span>
              )}
              {index < Object.keys(params).length - 1 && " > "}
            </React.Fragment>
          );
        })}
      </p>
    </>
  );
}
