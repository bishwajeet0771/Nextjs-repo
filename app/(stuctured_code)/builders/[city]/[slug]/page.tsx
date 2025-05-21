import { getPagesSlugs } from "@/app/seo/api";
import React from "react";
import { getBuilderDetailsPageData } from "@/app/utils/api/builder";
import { notFound } from "next/navigation";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import BuilderDetailsPage from "../../_components/details-page/BuildersDetailsPage";
type Props = {
  params: {
    city: string;
    slug: string;
  };
};

async function getBuilderSlug(pathname: string) {
  try {
    const builderJsonData = await redisService.getBuilderSlug(
      SlugsType.BUILDER
    );
    const decodeUrl = decodeURIComponent(pathname);
    return builderJsonData[decodeUrl];
  } catch (error) {
    console.error("Error reading or parsing file:", error);
    return null;
  }
}
export default async function Page({ params: { city, slug } }: Props) {
  const pathname = `/builders/${city}/${slug}`;
  const id = await getBuilderSlug(pathname);
  if (!id) return notFound();
  const data = await getBuilderDetailsPageData(id?.split("_")[1], pathname);
  return (
    <BuilderDetailsPage
      data={{
        ...data,
        data: {
          ...data.data,
          builderCity: city,
          pathname: pathname,
        },
      }}
      id={id?.split("_")[1]}
    />
  );
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("builder-list");
  // Prepare the slugs for static generation
  const builderRess = Object.keys(res);
  const slugs = builderRess.map((data) => {
    const [, , city, slug] = data.split("/");
    return { city, slug };
  });
  return slugs;
}
