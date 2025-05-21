/* eslint-disable no-unused-vars */
import React from "react";
import Feature from "@/app/components/project/feature";
// import Reviews from "@/app/components/project/reviews";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import FirstBlock from "@/app/components/project/firstBlock";
import Overview from "@/app/components/project/overview";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/project/navigation";
import Link from "next/link";
import {
  getAmenties,
  getOverViewData,
  getProjectDetails,
} from "@/app/utils/api/project";
import ProjectDetailsP from "@/app/components/project/projectDetailsP";
import ProjectDrawer from "@/app/components/project/Drawer";
import LeafMap from "@/app/components/project/map";
// import ListingRentAvail from "@/app/components/project/listingRentAvail";
import ErrorContainer from "@/app/components/project/error/container";
import MobileHidden from "@/app/components/molecules/MobileHidden";
// import { notFound } from "next/navigation";
import FloorplanDrawer from "@/app/components/project/drawers/floorplan";
import MasterPlan from "@/app/components/project/masterplan";
// import FloorplansBlock from "@/app/components/project/floorplansBlock";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Specifications from "@/app/components/project/specification";
import Banner from "@/app/components/project/banner";
import AboutBuilder from "@/app/components/project/aboutBuilder";
// import FaqWithBg from "@/app/components/project/faq";
import NearByCarousel from "@/app/components/project/NearByCarousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
// import axios from "axios";
// import PartialUnitData from "@/app/components/project/sections";
import { Metadata } from "next";
import type { ResolvingMetadata } from "next";
import FAQJsonLdScript from "@/app/seo/Faqjson";
import QAJsonLdScript from "@/app/seo/Qnajson";
import PropertyJsonLdScript from "@/app/seo/Productjson";
import ArticleJsonLdScript from "@/app/seo/ArticleJson";
import PropertyDataDisplay from "@/app/components/project/_ui/PricingDetailsSection";
// const FloorplansBlock = dynamic(
//   () => import("@/app/components/project/floorplansBlock"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const GalleryBlock = dynamic(
//   () => import("@/app/components/project/galleryBlock"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const MasterPlan = dynamic(
//   () => import("@/app/components/project/masterplan"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: true,
//   }
// );
// const NearByCarousel = dynamic(
//   () => import("@/app/components/project/NearByCarousel"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const Specifications = dynamic(
//   () => import("@/app/components/project/specification"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const LoginPopup = dynamic(
//   () => import("@/app/components/project/modals/LoginPop"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const Banner = dynamic(() => import("@/app/components/project/banner"), {
//   loading: () => <SectionSkeleton />,
//   ssr: false,
// });
// const AboutBuilder = dynamic(
//   () => import("@/app/components/project/aboutBuilder"),
//   {
//     loading: () => <SectionSkeleton />,
//     ssr: false,
//   }
// );
// const FaqWithBg = dynamic(() => import("@/app/components/project/faq"), {
//   loading: () => <SectionSkeleton />,
//   ssr: false,
// });

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  const [projectDetailsData, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug),
    getAmenties(),
  ]);

  let overview = null;

  const {
    basicData: data,
    nearByLocations,
    phaseOverview,
  } = projectDetailsData;
  if (!data.partialUnitData) {
    overview = await getOverViewData(slug);
  }

  return (
    <section className="w-full relative break-words">
      {/* <!-- Facebook Meta Tags --> */}
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_URL}/abc/${data.cityName}/${data.localityName}/${slug}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={`${data.projectName} ${data.availableProperties?.join(
          " "
        )} for sale in ${data.localityName} ${data.cityName}`}
      />
      <meta
        property="og:description"
        content={`${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`}
      />
      <meta property="og:image" content={data.media?.coverImageUrl} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="getrightproperty.com" />
      <meta
        property="twitter:url"
        content={`${process.env.NEXT_PUBLIC_URL}/abc/${data.cityName}/${data.localityName}/${slug}`}
      />
      <meta
        name="twitter:title"
        content={`${data.projectName} ${data.availableProperties?.join(
          " "
        )} for sale in ${data.localityName} ${data.cityName}`}
      />
      <meta
        name="twitter:description"
        content={`${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`}
      />
      <meta name="twitter:image" content={data.media?.coverImageUrl} />
      <FAQJsonLdScript data={data} />
      <QAJsonLdScript data={data} />
      <PropertyJsonLdScript data={data} />
      <ArticleJsonLdScript data={data} />
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col ">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%]">
            <Link
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer"
              href={"/"}
            >
              Home
            </Link>{" "}
            {" > "}
            <Link
              rel={"noopener noreferrer"}
              href={"/project/banglore"}
              prefetch={false}
            >
              <span className="hover:underline cursor-pointer">
                {data.cityName}
              </span>
            </Link>{" "}
            {" > "}
            <Link href={"/project/banglore/whitefield"} prefetch={false}>
              <span className="hover:underline cursor-pointer">
                {`${data.localityName} `}
              </span>
            </Link>{" "}
            {" > "}
            <span>{data.projectName}</span>
          </p>
          {/* Top Cover Image Card */}
          <FirstBlock
            projectDetails={data}
            companyName={data.postedByName}
            builderId={data.builderId}
            hasReraStatus={data.reraStatus}
          />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation
            isBrochure={!!data?.media?.projBroucherUrl}
            detailsData={data}
            slug={slug}
          />
        </MobileHidden>
        <Overview {...data} slug={slug} PhaseOverview={phaseOverview} />
        {/* <ListingRentAvail
          projName={data.projectName}
          r={data.rentListing}
          s={data.saleListing}
        /> */}
        {/* About */}
        <About
          id="about"
          heading="about"
          projName={data.projectName}
          content={data.about}
        />
        {/* Property Details */}
        <ProjectDetailsP
          projData={data}
          projName={data.projectName}
          data={data.phases}
          slug={slug}
          PhaseOverview={phaseOverview}
          isPartialData={data.partialUnitData!!}
        />
        <MasterPlan
          projName={data.projectName}
          media={data?.media?.projectPlanUrl}
        />
        {data.partialUnitData && (
          <PropertyDataDisplay
            unitData={data.partialUnitData}
            projName={data.projectName}
            phaseList={data.phases}
          />
        )}

        {/* {!data.partialUnitData ? (
          <FloorplansBlock
            partialUnitData={data.partialUnitData}
            overview={overview}
            projName={data.projectName}
            data={data.phases}
            slug={slug}
            PhaseOverview={phaseOverview}
            phaseList={data.phases}
          />
        ) : (
          <PartialUnitData
            partialUnitData={data.partialUnitData}
            projName={data.projectName}
            phaseList={data.phases}
            data={data}
            type="partial"
          />
        )} */}

        <GalleryBlock
          {...data.media}
          projName={data.projectName}
          media={data.media}
        />
        <ErrorContainer data={data.amenityList}>
          <Amenties
            data={data.amenityList}
            projName={data.projectName}
            amenitiesFromDB={amenitiesFromDB}
          />
        </ErrorContainer>

        {data.lat && data.lang && (
          <LeafMap
            lat={data.lat}
            lang={data.lang}
            projName={data.projectName}
            type="proj"
            mapData={nearByLocations}
          />
        )}
        <ErrorContainer data={data.specificationList}>
          <Specifications
            data={data.specificationList}
            projName={data.projectName}
          />
        </ErrorContainer>
        <ErrorContainer data={data.highlights}>
          <Feature data={data.highlights} projName={data.projectName} />
        </ErrorContainer>
        <Banner projName={data.projectName} projIdEnc={data.projIdEnc} />

        <ErrorContainer data={data.banks}>
          <div id="loans" className="w-full h-auto scroll-mt-[150px]">
            <Loans type="proj" banks={data.banks} name={data.projectName} />
          </div>
        </ErrorContainer>

        <AboutBuilder id={data.builderId} />
        {/* Why Buy This  */}
        {data.wbtp && (
          <About
            id="whyBuy"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
          />
        )}
        <div
          id="faq"
          className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
        >
          {/* <FaqWithBg data={data.faqs} projName={data.projectName} SLUG  /> */}
        </div>
        <NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
          company={data.companyName}
        />
        <ProjectDrawer projName={data.projectName} />
        <FloorplanDrawer />
        <LoginPopup />
        {/* <BaseSucess /> */}
      </div>
    </section>
  );
}
// VALIDATIONS OF PAGE & SEO
// export const fetchCache = "force-cache";
// export const revalidate = 120;

// export async function generateStaticParams() {
//   const { projResult } = await getParams();
//   const slugs = projResult.map((slug: string) => ({
//     slug: slug,
//   }));
//   return slugs;
// }

// async function getParams() {
//   let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all/active/ids?identifier=project`;
//   let data = await axios.get(url);
//   return data.data;
// }

type SeoProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: SeoProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const { basicData: data } = await getProjectDetails(slug);
  return {
    title: `${data?.projectName} ${
      data.availableProperties && data?.availableProperties?.join(" ")
    } for sale in ${data.localityName} ${data.cityName}`,
    description: `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`,
  };
}
