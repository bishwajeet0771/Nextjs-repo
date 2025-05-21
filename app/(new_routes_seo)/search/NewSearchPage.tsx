import React from "react";
import dynamic from "next/dynamic";
import { ProjectSeachSchema } from "@/app/seo/search/Project-search-schema";
import ProjectSearchBreadCrumbs from "./components/ProjSearchBreadCrums";
const ProjSearchMainFilterSection = dynamic(
  () => import("./components/filters/ProjSearchMainFilterSection")
);
import { ListingSearchSchema } from "@/app/seo/search/listing-search.schema";
import Mainsection from "./components/Mainsection";
// const Mainsection = dynamic(() => import("./components/Mainsection"));
type Props = {
  serverData: any;
  frontendFilters: any;
  pageUrl: string;
  preDefinedFilters: string | null;
};
export default function NewSearchPage({
  serverData,
  frontendFilters,
  pageUrl,
  preDefinedFilters = null,
}: Props) {
  const isListing = false;
  return (
    <section className="pt-[70px] min-h-[calc(100vh)] relative ">
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}${pageUrl}`} />
      {serverData &&
        (!frontendFilters.listedBy ? (
          <ProjectSeachSchema properties={serverData} pageUrl={pageUrl} />
        ) : (
          <ListingSearchSchema properties={serverData} pageUrl={pageUrl} />
        ))}
      <div className="relative md:fixed top-0 md:top-[70px] z-auto md:z-10 w-full ">
        <ProjectSearchBreadCrumbs key="newSearchPage1" pageUrl={pageUrl} />
        <ProjSearchMainFilterSection
          isListing={isListing}
          frontendFilters={frontendFilters}
          key="newSearchFilter1"
        />
      </div>

      <div className=" sm:min-w-full xl:m-0 flex justify-between items-start flex-wrap-reverse sm:flex-nowrap relative md:pt-[184px] xl:pt-[226px] ">
        <Mainsection
          frontendFilters={frontendFilters}
          serverData={serverData}
          preDefinedFilters={preDefinedFilters}
        />
      </div>
    </section>
  );
}
