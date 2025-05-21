import {
  BASE_PATH_LISTING,
  BASE_PATH_PROJECT_LISTING,
} from "@/app/(new_routes_seo)/utils/new-seo-routes/listing.route";
// import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import Link from "next/link";
import React, { ReactNode, useMemo } from "react";

// Simple slugify function without memoization
const slugify = (name: string): string => {
  if (!name) {
    return "";
  } else {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
};

type ListingLinkProps = {
  // Keep all props from LinkProps
  routeParams: {
    city: string;
    locality: string;
    projName?: string;
    phase?: string;
    bhkUnitType: string;
    propIdEnc: string;
    category: "for-sale" | "for-rent";
  };
  target?: "_blank" | "_self" | "_parent" | "_top";
  children: ReactNode;
  className?: string;
};
const slugifyBHKUnitType = (bhkUnitType: string): string => {
  return bhkUnitType
    .toLowerCase() // Convert to lowercase
    .replace(/\+/g, "-with-") // Replace '+' with 'with'
    .replace(/\//g, "-or-") // Replace '/' with 'or'
    .replace(/[^a-z0-9.]+/g, "-") // Replace non-alphanumeric characters, but keep decimals
    .replace(/-+/g, "-") // Merge multiple hyphens into one
    .replace(/(^-|-$)/g, ""); // Remove leading or trailing hyphens
};

// Function to create URL externally
export const generateListingLinkUrl = (
  routeParams: ListingLinkProps["routeParams"]
): string => {
  const { city, locality, projName, phase, bhkUnitType, propIdEnc, category } =
    routeParams;

  let url = `${
    projName ? BASE_PATH_PROJECT_LISTING : BASE_PATH_LISTING
  }/${category}/${slugify(city)}/${slugify(locality)}`;
  if (projName) url += `/${slugify(projName)}`;
  if (phase && phase !== "null" && phase !== undefined)
    url += `/${slugify(phase)}`;
  url += `/${slugifyBHKUnitType(bhkUnitType)}/listing-${propIdEnc}`;
  return url;
};

export default function ListingLink({
  routeParams,
  children,

  ...rest
}: ListingLinkProps) {
  const href = useMemo(() => {
    // Redirect to project details page
    return generateListingLinkUrl(routeParams);
  }, [routeParams]);

  return (
    <Link prefetch={false} {...rest} href={href}>
      {children}
    </Link>
  );
}
