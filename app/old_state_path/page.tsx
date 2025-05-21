// import React from "react";
// import Feature from "@/app/components/project/feature";
// import Reviews from "@/app/components/project/reviews";
// import Amenties from "@/app/components/project/amenties";
// import Loans from "@/app/components/project/loans";
// import FirstBlock from "@/app/components/project/firstBlock";
// import Overview from "@/app/components/project/overview";
// import About from "@/app/components/project/about";
// import Navigation from "@/app/components/project/navigation";
// import Link from "next/link";
// import { getAmenties, getProjectDetails } from "@/app/utils/api/project";
// import ProjectDetailsP from "@/app/components/project/projectDetailsP";
// import ProjectDrawer from "@/app/components/project/Drawer";
// import LeafMap from "@/app/components/project/map";
// import ListingRentAvail from "@/app/components/project/listingRentAvail";
// import ErrorContainer from "@/app/components/project/error/container";
// import MobileHidden from "@/app/components/molecules/MobileHidden";
// import { notFound } from "next/navigation";
// import FloorplanDrawer from "@/app/components/project/drawers/floorplan";
// import MasterPlan from "@/app/components/project/masterplan";
// import FloorplansBlock from "@/app/components/project/floorplansBlock";
// import GalleryBlock from "@/app/components/project/galleryBlock";
// import Specifications from "@/app/components/project/specification";
// import Banner from "@/app/components/project/banner";
// import AboutBuilder from "@/app/components/project/aboutBuilder";
// import FaqWithBg from "@/app/components/project/faq";
// import NearByCarousel from "@/app/components/project/NearByCarousel";
// import LoginPopup from "@/app/components/project/modals/LoginPop";
// import axios from "axios";
// import PartialUnitData from "@/app/components/project/sections";
// import { Metadata } from "next";
// import type { ResolvingMetadata } from "next";
// import FAQJsonLdScript from "@/app/seo/Faqjson";
// import QAJsonLdScript from "@/app/seo/Qnajson";
// import PropertyJsonLdScript from "@/app/seo/Productjson";
// import ArticleJsonLdScript from "@/app/seo/ArticleJson";
// import { extractID, getPagesSlugs } from "../seo/api";
// import fs from "fs";
// import path from "path";
// import { cookies, headers } from "next/headers";
// import db from "../config/level";
// import { builderSlugs } from "@/static/builderSlugs";
// import { builderSlugsMap } from "@/static/builderSlugsMap";
// import {
//   getBuilderDetails,
//   getBuilderDetailsPageData,
// } from "../utils/api/builder";
// import BuilderPage from "../builder/[slug]/Page/BuilderPage";
// type Props = {
//   params: { state: string };
// };
// async function getBuilderSlug(pathname: string) {
//   const staticDir = path.join(process.cwd(), "static");
//   const filePath = path.join(staticDir, "builderSlugs.json");

//   try {
//     // Read the JSON file asynchronously
//     const jsonData = await fs.readFileSync(filePath, "utf-8");
//     const builderJsonData = JSON.parse(jsonData);
//     return builderJsonData[pathname];
//   } catch (error) {
//     console.error("Error reading or parsing file:", error);
//     return null;
//   }
// }
// export default async function Page({ params: { state } }: Props) {
//   const pathname = `/${state}`;
//   const id = await getBuilderSlug(pathname);
//   console.log(id, pathname);
//   if (!id) {
//     notFound();
//   }
//   const data = await getBuilderDetailsPageData(id);
//   return <BuilderPage data={data} />;
// }
// //  builder0 = state / project0 project in locality

// export async function generateStaticParams() {
//   // Get the data (mocked here, replace with your actual data fetching logic)
//   const res = await getPagesSlugs("builder-list");

//   // Convert the `res` object into a regular object (not a Map)
//   const resObject = { ...res };

//   const staticDir = path.join(process.cwd(), "static");
//   const filePath = path.join(staticDir, "builderSlugs.json");

//   // Ensure the 'static' directory exists
//   if (!fs.existsSync(staticDir)) {
//     fs.mkdirSync(staticDir);
//   }

//   // Convert the object to a JSON string
//   const jsonContent = JSON.stringify(resObject, null, 2);

//   // Write the JSON content to the file
//   fs.writeFileSync(filePath, jsonContent);

//   console.log(`JSON data has been saved to ${filePath}`);

//   // Prepare the slugs for static generation
//   const builderRess = Object.keys(resObject);
//   const slugs = builderRess.map((data) => ({
//     state: data.replace(/\//g, ""),
//   }));
//   console.log(slugs);
//   return slugs;
// }

// import React from "react";

export default function Page() {
  return <div>Page</div>;
}
