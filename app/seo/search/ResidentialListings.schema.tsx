import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import WebPageSchama from "../common/WebPageSchama";
import { ListingSearchSchema } from "./listing-search.schema";
import { baseURL } from "@/app/utils/api/api";
import OrganizationSchema from "../OraganisationSchema";
import LocalBusinessJsonLdScript from "../Localjson";

type Props = {
  properties: any;
  page: number | null;
  totalPages: number;
  urls: string[];
  pageUrl: string;
};

export default function ResidentialListingsSchema({
  properties,
  page,
  totalPages,
  urls,
  pageUrl,
}: Props) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: properties.map((property: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_URL}${createProjectLinkUrl({
        city: property.city || "Bengaluru",
        slug: property.projName,
        locality: property.locality || "Whitefield",
        projIdEnc: property.projIdEnc,
      })}`,
    })),
    totalItems: totalPages, // Total number of items
    nextPage:
      page && page < totalPages
        ? `${process.env.NEXT_PUBLIC_URL}/residential?page=${page + 1}`
        : null, // URL for the next page
    previousPage:
      page && page > 1
        ? `${process.env.NEXT_PUBLIC_URL}/residential?page=${page - 1}`
        : null, // URL for the previous page
    currentPage: `${process.env.NEXT_PUBLIC_URL}/residential?page=${page}`, // Current page number
  };
  const viewActionJsonLd = {
    "@context": "https://schema.org",
    "@graph": urls.map((item: any) => ({
      "@type": "SiteNavigationElement",
      name: item?.split("/").at(-1).split("-").slice(0, -1).join(" "),
      url: item,
    })),
  };
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessJsonLdScript />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(viewActionJsonLd),
        }}
      />
      <WebPageSchama path={pageUrl} />
      <ListingSearchSchema properties={properties} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": baseURL,
                  name: "Home",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": `${baseURL}/residential-listings${
                    page ? `?page=${page}` : ""
                  }`,
                  name: "Residential Projects",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
