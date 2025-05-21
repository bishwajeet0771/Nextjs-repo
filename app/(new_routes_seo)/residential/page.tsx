import React, { memo } from "react";
import ResidentialPage from "./_components/ResidentialDetailPage";
import axios from "axios";
import { ResidentialProjectSchama } from "@/app/seo/search/ResidentialProject.shcema";
import { Metadata } from "next";
import NotFound from "../not-found";
import Head from "next/head";
type Props = {
  searchParams: {
    page: number;
  };
};
export default async function page({ searchParams: { page } }: Props) {
  const LoadingSpinner = memo(function LoadingSpinner() {
    return (
      <div className="flex items-center gap-2">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <span className="font-bold">Loading results...</span>
      </div>
    );
  });
  const isValidPage = !isNaN(page) && page > 0;
  /* let url = `https://www.getrightproperty.com/common/marg-project-details`; */
  let url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/srp/margdataurl/searchproj?page=${
    page ? (!isValidPage ? 0 : page - 1) : 0
  }`;

  const { data } = await axios.get(url);
  let totalpages= Math.ceil(data?.totalCount / 40)
  
  return (
    <>

         
         
      <>
        <link
          rel="canonical"
          href={`https://www.getrightproperty.com/residential${
            page ? `?page=${page}` : ""
          }`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://www.getrightproperty.com/residential"
        />
        <meta
          name="twitter:title"
          content="Top Residential Projects in Bangalore | Premium Apartments & Villas | Get Right Property"
        />
        <meta
          name="twitter:description"
          content="Explore top-rated residential properties in Bangalore. Compare locations, prices, and amenities. Trusted by thousands of homebuyers."
        />
        <meta
          name="twitter:image"
          content="https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp"
        />
        {page != 0  && <link rel="prev" href={`https://www.getrightproperty.com/residential${
                     page ? `?page=${Number(page) - 1}` : ''
              }`} />}
          {page != totalpages &&<link rel="next" href={`https://www.getrightproperty.com/residential${
     
             page ? `?page=${Number(page) + 1}` : ''

              }`} />}
        {/* Viewport and Charset 
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />*/}
      </>
      
      <ResidentialProjectSchama
        pageUrl="/residential"
        properties={data?.data}
        urls={data?.urls}
        page={page ? parseInt(page as any) : null}
        totalPages={data.totalCount}
      />
      {data ? (
        data.data && data.data.length < 1 ? (
          <NotFound />
        ) : (
          <>
          
          <ResidentialPage data={data} totalCount={data?.totalCount} />
        </>
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Top Residential Projects in Bangalore | Premium Apartments Villas",
  description:
    "Discover premium residential projects in Bangalore. Explore top apartments, villas & gated communities by trusted builders. Find your dream home with Get Right Property.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Top Residential Projects in Bangalore | Premium Apartments Villas",
    url: "https://www.getrightproperty.com/residential",
    type: "website",
    images:
      "https://media.getrightproperty.com/staticmedia-images-icons/grp-logo/grp-logo-tm.webp",
    description:
      "Explore top-rated residential properties in Bangalore. Compare locations, prices, and amenities. Trusted by thousands of homebuyers.",
  },
};
