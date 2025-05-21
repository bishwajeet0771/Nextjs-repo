import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import Link from "next/link";
import React, { ReactNode, useMemo } from "react";

// Simple slugify function without memoization
export const slugify = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

type ProjectLinkProps = {
  // Keep all props from LinkProps
  routeParams: {
    city: string;
    slug: string;
    locality: string;
    projIdEnc: string;
  };
  target?: "_self" | "_self" | "_parent" | "_top";
  children: ReactNode;
  className?: string;
};

// Function to create URL externally
export const createProjectLinkUrl = (
  routeParams: ProjectLinkProps["routeParams"]
): string => {
  const { city, slug, locality } = routeParams;
  return `${BASE_PATH_PROJECT_DETAILS}/${city ? slugify(city) : ""}/${
    locality ? slugify(locality) : ""
  }/${slug ? slugify(slug) : ""}-${routeParams.projIdEnc}`;
};

export default function ProjectLink({
  routeParams,
  children,
  ...rest
}: ProjectLinkProps) {
  // Memoize the href to avoid recalculating it unnecessarily
  const href = useMemo(() => {
    // Redirect to project details page
    return createProjectLinkUrl(routeParams);
  }, [routeParams]);

  return (
    <Link prefetch={false} {...rest} href={href} rel="noopener noreferrer">
      {children}
    </Link>
  );
}
