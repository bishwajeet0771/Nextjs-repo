import { BASE_PATH_LISTING } from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
import Link from "next/link";
import React from "react";
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-") // Allow dots by including . in the character set
    .replace(/(^-|-$)+/g, ""); // Remove leading and trailing hyphens
};

export default function ListingBreadCrumbs({
  params: routes,
  isProject,
  title,
  pathname,
}: {
  params: any;
  isProject: boolean;
  title: string;
  pathname: string;
}) {
  const params = {
    "residential-listings": "residential-listings",
    ...routes,
  };
  const allParams = Object.keys(params || {});
  const isIndependent = title.includes("Independent");
  const titleOfKeys = {
    city: " ",
    lt: `${isIndependent ? "Independent Listings" : ""} `,
  };
  let currentPath = "";
  let breadcrumbPath = "";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: process.env.NEXT_PUBLIC_PROJECT_URL,
      },
      ...allParams.map((key, index) => {
        const isLast = index === allParams.length - 1;
        breadcrumbPath += `/${slugify(params[key])}`;
        return {
          "@type": "ListItem",
          position: index + 2,
          name: isLast ? title : params[key].replace(/-/g, " "),
          item: `${process.env.NEXT_PUBLIC_PROJECT_URL}${
            isProject ? "" : BASE_PATH_LISTING
          }${breadcrumbPath}`,
        };
      }),
    ],
  };

  const siteNavSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Breadcrumb Navigation",
    url: pathname,
    hasPart: [
      {
        "@type": "SiteNavigationElement",
        name: "Home",
        url: "/",
      },
      ...allParams.map((key) => ({
        "@type": "SiteNavigationElement",
        name: params[key].replace(/-/g, " "),
        url: `${isProject ? "" : BASE_PATH_LISTING}${breadcrumbPath}`,
      })),
    ],
  };

  return (
    <>
      <script
        id="ListingBreadCrumbsScript1"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        id="ListingBreadCrumbsScript2"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavSchema),
        }}
      />
      <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
        <Link
          rel="noopener noreferrer"
          href={`/`}
          className="hover:underline cursor-pointer capitalize"
        >
          Home
        </Link>
        {" > "}
        {allParams.map((key, index) => {
          currentPath += `/${slugify(params[key])}`;
          const isLast = index === allParams.length - 1;

          return (
            <React.Fragment key={`${key[index]}`}>
              {!isLast ? (
                <>
                  <Link
                    prefetch={false}
                    href={`${isProject ? "" : BASE_PATH_LISTING}${currentPath}`}
                    // target="_blank"
                    className="hover:underline cursor-pointer capitalize"
                  >
                    {/* <a onTouchStart={() => {}}></a> */}
                    {titleOfKeys[key as keyof typeof titleOfKeys] && (
                      <span>
                        {titleOfKeys[key as keyof typeof titleOfKeys]}
                      </span>
                    )}
                    <span>
                      {index === allParams.length - 2
                        ? params[key].replace(/-/g, " ").replace(/bhk/i, "BHK")
                        : params[key].replace(/-/g, " ")}
                    </span>
                  </Link>
                  {" > "}
                </>
              ) : (
                <span className="capitalize">
                  {title.replace("undefined ", "")}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </p>
    </>
  );
}
