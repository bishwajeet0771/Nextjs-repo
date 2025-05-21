import { BASE_PATH_BUILDER_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/builder.route";
import Link from "next/link";
import React, { ReactNode, useMemo } from "react";

// Simple slugify function
const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Function to generate the URL based on routeParams
export const generateBuilderUrl = (routeParams?: {
  city?: string;
  slug: string;
  type?: string;
  id?: number;
  statusId?: number;
}): string => {
  const { city, slug, type, id, statusId } = routeParams || {};

  if (type === "project") {
    if (!id) {
      return `/search`;
    }
    return (
      "/search?sf=builderIds=" +
      encodeURIComponent(`${slug}+${id}`).replaceAll("%20", "+")
    );
  } else if (type === "projStatus") {
    if (!id) {
      return `/search`;
    }
    return `/search?sf=projStatus=${statusId}-builderIds=${encodeURIComponent(
      `${slug}+${id}`
    ).replaceAll("%20", "+")}`;
  } else if (city && slug) {
    // Redirect to builder details page
    return `${BASE_PATH_BUILDER_DETAILS}/${slugify(city)}/${slugify(slug)}`;
  } else if (city) {
    // Redirect to city-specific builder details
    return `${BASE_PATH_BUILDER_DETAILS}/${slugify(city)}`;
  } else {
    // Default redirect to /search
    return `/search`;
  }
};

type BuilderLinkProps = {
  routeParams?: {
    city?: string;
    slug: string;
    type?: string; // Add type to routeParams
    id?: number; // Add id to routeParams
    statusId?: number;
  };
  children: ReactNode;
  className?: string;
};

export default function BuilderLink({
  routeParams,
  children,
  ...rest
}: BuilderLinkProps) {
  // Memoize the href to avoid recalculating it unnecessarily
  const href = useMemo(() => generateBuilderUrl(routeParams), [routeParams]);

  return (
    <Link prefetch={false} rel="noopener noreferrer" {...rest} href={href}>
      {children}
    </Link>
  );
}
