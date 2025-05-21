import Link from "next/link";
import React, { memo } from "react";
import { FaHome, FaChevronRight } from "react-icons/fa";
interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  pageUrl: string;
  is2lakhUrls?: boolean;
}

export const trimFromWord = (str: string, word: string) => {
  const index = str.indexOf(word);
  return index !== -1 ? str.substring(index + word.length) : "";
};

const ListingSearchBreadCrumbs: React.FC<BreadcrumbProps> = ({
  pageUrl,
  is2lakhUrls = false,
}) => {
  function trimStringUrl(str: string, word: string) {
    const index = str.indexOf(word);
    return index !== -1 ? str.substring(0, index + word.length) : str;
  }

  let newParams: string[] = is2lakhUrls ? ["Home", "Residentail Listings"] : [];
  if (pageUrl === "/search") {
    newParams = ["Home", "Project Search"];
  } else if (pageUrl === "/search/listing") {
    newParams = ["Home", "Listing Search"];
  } else if (pageUrl.includes("/residential/")) {
    newParams = pageUrl.split("/");
  } else if (pageUrl === "/residential-listings") {
    newParams = ["Home", "Residential Listings"];
  } else if (pageUrl.includes("/residential-listings/")) {
    newParams = pageUrl.split("/");
  } else if (pageUrl.includes("/residential/listings/")) {
    newParams = pageUrl.split("/").filter(Boolean);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: newParams.map((item, index) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@id":
            index === 0
              ? process.env.NEXT_PUBLIC_URL
              : `${process.env.NEXT_PUBLIC_URL}${trimStringUrl(pageUrl, item)}`,
          name: item.replace("-", " ") || "Home",
        },
      };
    }),
  };

  return (
    <nav
      aria-label="Project Search Breadcrumbs"
      className="w-full px-[8px] sm:px-[10px] lg:px-[14px] py-[6px] md:py-[10px] xl:py-4 bg-gray-100 rounded-md shadow-sm max-w-[100%] overflow-x-auto "
    >
      <script
        id="ListingBreadCrumbsScript3"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <ol className="flex items-center space-x-1 md:space-x-3  text-sm text-gray-600 pr-[10px] ">
        {newParams.map((item: any, index: number) => {
          let url = index === 0 ? "/" : trimStringUrl(pageUrl, item);
          return (
            <li key={item + index.toString()} className="flex items-center">
              {index !== 0 && (
                <FaChevronRight
                  className="h-4 w-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              )}

              {index !== newParams.length - 1 ? (
                <Link
                  rel="noopener noreferrer"
                  prefetch={false}
                  // target="_blank"
                  href={url}
                  className={`ml-2 text-sm font-semibold text-gray-700 hover:text-blue-500 transition-all duration-200 text-nowrap first-letter:capitalize `}
                  aria-current={
                    index === newParams.length - 1 ? "page" : undefined
                  }
                >
                  {item ? item.replaceAll("-", " ") : "Home"}
                </Link>
              ) : (
                <span
                  className={`ml-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-all duration-200 text-nowrap first-letter:capitalize `}
                >
                  {item.replaceAll("-", " ") ?? (
                    <FaHome
                      className="h-5 w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default memo(ListingSearchBreadCrumbs);
