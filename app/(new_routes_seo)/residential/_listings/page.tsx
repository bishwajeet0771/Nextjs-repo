import React from "react";
import { getSearchData } from "@/app/(new_routes_seo)/in/utils/api";
import NewSearchPage from "../../search/NewSearchPage";

type Props = {
  params: {
    cg: string;
    city: string;
    lt: string;
  };
};

// eslint-disable-next-line no-unused-vars
export default async function Page({ params: { cg, city } }: Props) {
  const severData = await getSearchData(``);
  const pathname = `/residential/listings`;
  const pageUrl = `${process.env.NEXT_PUBLIC_URL}/${pathname}`;
  return (
    <NewSearchPage
      pageUrl={pageUrl}
      serverData={severData}
      frontendFilters={{
        listedBy: "All",
      }}
      preDefinedFilters={""}
    />
  );
}
