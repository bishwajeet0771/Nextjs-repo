import React from "react";
import dynamic from "next/dynamic";
import { MERGERPROJECT } from "@/app/validations/types/project";
import Feature from "@/app/components/project/feature";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
import FirstBlock from "@/app/components/project/firstBlock";
import Overview from "@/app/components/project/overview";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/project/navigation";
import ProjectDrawer from "@/app/components/project/Drawer";
import LeafMap from "@/app/components/project/map";
import ListingRentAvail from "@/app/components/project/listingRentAvail";
import ErrorContainer from "@/app/components/project/error/container";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import FloorplanDrawer from "@/app/components/project/drawers/floorplan";
import MasterPlan from "@/app/components/project/masterplan";
const ProjectDetailsP = dynamic(
  () => import("@/app/components/project/projectDetailsP")
);

import GalleryBlock from "@/app/components/project/galleryBlock";
import Specifications from "@/app/components/project/specification";
import Banner from "@/app/components/project/banner";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import FaqWithBg from "@/app/components/project/faq";
import NearByCarousel from "@/app/components/project/NearByCarousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
// import FAQJsonLdScript from "@/app/seo/Faqjson";
import Reviews from "@/app/components/project/reviews";
import PartialUnitData from "@/app/components/project/sections";
import PropertyDataDisplay from "@/app/components/project/_ui/PricingDetailsSection";
import Disclamer from "@/app/components/builder/Disclamer";
import BreadCrumbs from "@/app/components/project/breadcrum/BreadCrum";
import FloorPlans from "@/app/components/project/newFloorPlan/floor-plan";
import ProjectSchema from "@/app/seo/ProjectDetailSchema";
import FAQJsonLdScript from "@/app/seo/Faqjson";
// import FloorPlans from "@/app/components/project/newFloorPlan/floor-plan";
const ProjectGallery = dynamic(
  () => import("@/app/components/project/_ui/modals/GallerySectionModal")
);
const SharePopup = dynamic(
  () => import("@/app/(dashboard)/searchOldPage/components/SharePopup")
);
const ProjectBrouchersSection = dynamic(
  () => import("@/app/components/project/broucher/ProjectBrouchersSections"),
  {
    ssr: false,
  }
);
type Props = {
  projResponse: MERGERPROJECT;
  amenitiesFromDB: any;
  slug: string;
  scrollId?: string;
  params: any;
};

export default async function ProjectsDetailsPage({
  projResponse,
  amenitiesFromDB,
  slug,
  scrollId,
  params,
}: Props) {
  const { basicData: data, nearByLocations, phaseOverview } = projResponse;
  const refURls = data?.sourceBuilderUrl?.split(",");
  const url = `${process.env.NEXT_PUBLIC_URL}${BASE_PATH_PROJECT_DETAILS}/${params.city}/${params.lt}/${params.slug}/`;
  const title = `${data?.projectName} ${
    data.availableProperties && data?.availableProperties?.join(" ")
  } for sale in ${data.localityName} ${data.cityName}`;
  const imageUrl = data?.media?.coverImageUrl?.split(",")[1];
  const desc = `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`;

  return (
    <section className="w-full relative break-words ">
      <meta name="robots" content="index, follow" />
      {/* CEHOUT  MEANS CHNAGE OR MERGE */}
      {/* <link rel="canonical" href={url} /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl || ""} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl || ""} />
      <FAQJsonLdScript data={data} />
      <ProjectSchema projectData={{ ...projResponse, url, desc }} />
      {/* <QAJsonLdScript data={data} />
      <PropertyJsonLdScript data={data} />
      <ArticleJsonLdScript data={data} /> */}
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col ">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <BreadCrumbs params={params} />

          {/* Top Cover Image Card */}
          <FirstBlock
            projectDetails={data}
            companyName={data.postedByName}
            builderId={data.builderId}
            hasReraStatus={data.reraStatus}
            scrollId={scrollId}
          />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation
            isBrochure={
              !!data?.media?.projBroucherUrl ||
              phaseOverview?.some(
                (item: { phaseBrochureUrl: string | null }) =>
                  item.phaseBrochureUrl
              )
            }
            detailsData={{ ...data, nearByLocations }}
            slug={slug}
            scrollId={scrollId}
          />
        </MobileHidden>
        <Overview {...data} slug={slug} PhaseOverview={phaseOverview} />
        <ListingRentAvail
          projName={data.projectName}
          r={data.rentListing}
          s={data.saleListing}
          slug={slug}
        />
        {/* About */}
        <About
          id="about"
          heading="about"
          projName={data.projectName}
          content={data.about}
          maxLines={12}
        />
        {/* Property Details */}
        <ProjectDetailsP
          projName={data.projectName}
          data={data.phases}
          slug={slug}
          projData={data}
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

        {!data.partialUnitData ? (
          <FloorPlans
            phases={data.phases}
            projName={data.projectName}
            partialUnitData={data.partialUnitData}
            phaseOverview={phaseOverview}
            slug={slug}
            postedById={data.builderId}
          />
        ) : (
          <PartialUnitData
            partialUnitData={data.partialUnitData}
            projName={data.projectName}
            phaseList={data.phases}
            data={data}
            type="partial"
          />
        )}
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
        <div id="near-by" className="scroll-mt-[180px]" />
        {data.lat && data.lang && (
          <LeafMap
            lat={data.lat}
            lang={data.lang}
            projName={data.projectName}
            type="proj"
            mapData={nearByLocations}
          />
        )}
        <ProjectBrouchersSection
          projName={data.projectName}
          phaseOverviewData={phaseOverview}
          singleBroucher={data.media?.projBroucherUrl}
          broucherImage={data.media?.projectPlanUrl}
        />
        <ErrorContainer data={data.specificationList}>
          <Specifications
            data={data.specificationList}
            projName={data.projectName}
          />
        </ErrorContainer>
        <ErrorContainer data={data.highlights}>
          <Feature data={data.highlights} projName={data.projectName} />
        </ErrorContainer>
        <Banner projName={data.projectName} projIdEnc={slug} />
        <ErrorContainer data={data.banks}>
          <div id="bank-approvals" className="w-full h-auto scroll-mt-[150px]">
            <Loans type="proj" banks={data.banks} name={data.projectName} />
          </div>
        </ErrorContainer>

        <AboutBuilder id={data.builderId} />
        {data.wbtp && (
          <About
            id="why-buy-this-project"
            heading="Why Buy"
            projName={`${data.projectName} ?`}
            content={data.wbtp}
            maxLines={12}
          />
        )}
        <Reviews projName={data.projectName} projIdEnc={slug} />
        <div
          id="faq"
          className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
        >
          <FaqWithBg
            data={data.faqs}
            slug={slug}
            projName={data.projectName}
            postedById={data.builderId}
          />
        </div>
        <NearByCarousel
          projName={data.projectName}
          lat={data.lat}
          lng={data.lang}
          builderId={data.builderId}
          company={data.companyName}
          projId={slug}
          slug={slug}
        />
        {refURls && refURls.length > 0 && <Disclamer refUrls={refURls} />}

        <ProjectDrawer projName={data.projectName} />
        <FloorplanDrawer />
        <LoginPopup />
        <ProjectGallery />
        <SharePopup />
      </div>
    </section>
  );
}
