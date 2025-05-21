import dynamicImport from "next/dynamic";
const Feature = dynamicImport(() => import("@/app/components/project/feature"));
const Amenties = dynamicImport(
  () => import("@/app/components/project/amenties")
);
const Loans = dynamicImport(() => import("@/app/components/project/loans"));

const About = dynamicImport(() => import("@/app/components/project/about"));
const Navigation = dynamicImport(
  () => import("@/app/components/project/navigation"),
  {
    ssr: false,
  }
);
const ProjectDrawer = dynamicImport(
  () => import("@/app/components/project/Drawer")
);
const LeafMap = dynamicImport(() => import("@/app/components/project/map"));
const ListingRentAvail = dynamicImport(
  () => import("@/app/components/project/listingRentAvail")
);
const ErrorContainer = dynamicImport(
  () => import("@/app/components/project/error/container")
);
const MobileHidden = dynamicImport(
  () => import("@/app/components/molecules/MobileHidden")
);
const FloorplanDrawer = dynamicImport(
  () => import("@/app/components/project/drawers/floorplan")
);

const MasterPlan = dynamicImport(
  () => import("@/app/components/project/masterplan")
);
const ProjectDetailsP = dynamicImport(
  () => import("@/app/components/project/projectDetailsP")
);
const GalleryBlock = dynamicImport(
  () => import("@/app/components/project/galleryBlock")
);
const Specifications = dynamicImport(
  () => import("@/app/components/project/specification")
);
const Banner = dynamicImport(() => import("@/app/components/project/banner"));
const AboutBuilder = dynamicImport(
  () => import("@/app/components/project/aboutBuilder"),
  {
    ssr: false,
  }
);
const FaqWithBg = dynamicImport(() => import("@/app/components/project/faq"));
const NearByCarousel = dynamicImport(
  () => import("@/app/components/project/NearByCarousel"),
  {
    ssr: false,
  }
);
const LoginPopup = dynamicImport(
  () => import("@/app/components/project/modals/LoginPop"),
  {
    ssr: false,
  }
);
const Reviews = dynamicImport(
  () => import("@/app/components/project/reviews"),
  {
    ssr: false,
  }
);
const PartialUnitData = dynamicImport(
  () => import("@/app/components/project/sections")
);
const PropertyDataDisplay = dynamicImport(
  () => import("@/app/components/project/_ui/PricingDetailsSection")
);
const Disclamer = dynamicImport(
  () => import("@/app/components/builder/Disclamer")
);
const BreadCrumbs = dynamicImport(
  () => import("@/app/components/project/breadcrum/BreadCrum")
);
const FloorPlans = dynamicImport(
  () => import("@/app/components/project/newFloorPlan/floor-plan")
);
const ProjectSchema = dynamicImport(
  () => import("@/app/seo/ProjectDetailSchema")
);
const FAQJsonLdScript = dynamicImport(() => import("@/app/seo/Faqjson"));

const ProjectGallery = dynamicImport(
  () => import("@/app/components/project/_ui/modals/GallerySectionModal")
);


const ProjectBrouchersSection = dynamicImport(
  () => import("@/app/components/project/broucher/ProjectBrouchersSections"),
  {
    ssr: false,
  }
);
import {
  getAmenties,
  getAuthorityNames,
  getProjectDetails,
} from "@/app/utils/api/project";
import { notFound } from "next/navigation";
import { getPagesSlugs } from "@/app/seo/api";
import { Metadata, ResolvingMetadata } from "next";
import redisService from "@/app/utils/redis/redis.service";
import { SlugsType } from "@/app/common/constatns/slug.constants";
import { isValidSlugId } from "@/common/utils/slugUtils";
import FirstBlock from "@/app/components/project/firstBlock";
import { BASE_PATH_PROJECT_DETAILS } from "@/app/(new_routes_seo)/utils/new-seo-routes/project.route";
import Overview from "@/app/components/project/overview";

type Props = {
  params: Promise<{ city: string; lt: string; slug: string }>;
};

export default async function page(props: Props) {
  const params = await props.params;
  const { city, lt, slug: name } = params;

  const slug = name.split("-").at(-1);
  if (!slug || !isValidSlugId(slug)) {
    notFound();
  }

  const [projResponse, amenitiesFromDB] = await Promise.all([
    getProjectDetails(slug),
    getAmenties(),
  ]);
  const { basicData: data, nearByLocations, phaseOverview } = projResponse;
  const localitySlug = projResponse.basicData.localityName
    .toLowerCase()
    .replaceAll(" ", "-");
  const projectSlug = name.split("-").slice(0, -1).join("-");
  const projectNameSlug = projResponse.basicData.projectName
    .toLowerCase()
    .replaceAll(" ", "-");

  if (
    localitySlug !== lt ||
    projectSlug !== projectNameSlug ||
    city !== projResponse.basicData.cityName.toLowerCase()
  ) {
    return notFound();
  }
  if (projResponse.basicData.projAuthorityId) {
    const authorityNames = await getAuthorityNames(
      projResponse.basicData.projAuthorityId
    );
    projResponse.basicData.projAuthorityNames = authorityNames;
  }
  const refURls = data?.sourceBuilderUrl?.split(",");
  const url = `${process.env.NEXT_PUBLIC_URL}${BASE_PATH_PROJECT_DETAILS}/${params.city}/${params.lt}/${params.slug}/`;
  const title = `${data?.projectName} ${
    data.availableProperties && data?.availableProperties?.join(" ")
  } for sale in ${data.localityName} ${data.cityName}`;
  const imageUrl = data?.media?.coverImageUrl?.split(",")[1];
  const scrollId = undefined;
  const desc = `${data.projectName} for sale in ${data.localityName}, ${data.cityName}. View Project Details, Price, Check Brochure PDF, Floor Plan, Reviews, Master Plan, Amenities & Contact Details`;

  return (
    <section className="w-full relative break-words ">
      <meta name="robots" content="index, follow" />
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

      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col ">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <BreadCrumbs params={params} />

          <FirstBlock
            projectDetails={data}
            companyName={data.postedByName}
            builderId={data.builderId}
            hasReraStatus={data.reraStatus}
            scrollId={scrollId}
          />
        </div>

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
        {/* <SharePopup /> */}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  // Get the data (mocked here, replace with your actual data fetching logic)
  const res = await getPagesSlugs("project-list");
  await redisService.saveProjectSlug(SlugsType.PROJECT, res);
  const projectRes = Object.keys(res);
  const slugs = [];
  for (let i = 0; i < projectRes.length; i++) {
    const data = projectRes[i];
    if ((data.match(/\//g) || []).length === 5) {
      const [, , , city, lt, slug] = data.split("/");
      if (slug) {
        slugs.push({ city, lt, slug });
      }
    }
  }

  return slugs;

  // Extract project names from the keys
  // const projectRes = Object.keys(res);
  // const slugs = projectRes.map((data) => {
  //   const [staticPath, staticPath2, sta3, city, lt, slug] = data.split("/");
  //   return { city, lt, slug };
  // });
  // return slugs;
}

type SeoProps = {
  params: Promise<{ city: string; lt: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: SeoProps,
  // eslint-disable-next-line no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  let slug = params.slug.split("-").at(-1);
  if (!slug || !isValidSlugId(slug)) {
    notFound();
  }
  const {
    basicData: data,
    phaseOverview,
    nearByLocations,
  } = await getProjectDetails(slug as string);

  // Calculate price range in a readable format
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} L`;
    return `${price.toLocaleString()}`;
  };

  const priceRange = `${formatPrice(data.minPrice)} - ${formatPrice(
    data.maxPrice
  )}`;

  // Get all available configurations
  const configurations = phaseOverview
    .flatMap((phase: any) =>
      Object.values(phase.propTypeOverview).flatMap(
        (type: any) => type.unitTypes
      )
    )
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .join(", ");

  // Get nearby landmarks for description
  const nearbyLandmarks = [
    ...(nearByLocations.school || []).slice(0, 2).map((s: any) => s.name),
    ...(nearByLocations.hospital || []).slice(0, 2).map((h: any) => h.name),
    ...(nearByLocations.train_station || [])
      .slice(0, 1)
      .map((t: any) => t.name),
  ].join(", ");

  // Constructing SEO-friendly title
  const title = `${data?.projectName} ${data.availableProperties?.join(
    " "
  )} for sale ${data.localityName} ${data.cityName}`;

  // Constructing detailed and keyword-rich description
  const description = `${data.projectName} ${data.availableProperties?.join(
    ", "
  )} in ${data.localityName}, ${
    data.cityName
  }. Project Details, Pricing, Brochure, Floor Plans, Reviews, Master Plan, Amenities & Contact Details`;

  // Get all relevant keywords
  const keywords = [
    data.projectName,
    ...(data.availableProperties || []),
    data.localityName,
    data.cityName,
    configurations,
    "Property",
    "Real Estate",
    "Home",
    data.cityName,
    `${data.cityName} Properties`,
    "Buy Property",
    data.postedByName,
    nearbyLandmarks,
    "RERA Approved",
  ].join(", ");
  const canonical = `${process.env.NEXTAUTH_URL}/residential/projects/${params.city}/${params.lt}/${params.slug}`;
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(process.env.NEXTAUTH_URL || ""),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: data.projectName,
      images: data?.media?.coverImageUrl?.split(",")?.map((url) => ({
        url,
        width: 1200,
        height: 630,
      })),
      locale: "en_IN",
      type: "website",
      videos: data.media.walkThrowVideoUrl
        ? [data.media.walkThrowVideoUrl]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [data.media.coverImageUrl.split(",")[0]],
      site: "@getrightproperty",
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "Real Estate",
    other: {
      "price-range": priceRange,
      "property-type": data?.availableProperties?.join(", ") || "",
      "launch-date": data.startDate,
      "possession-date": data.endDate,
      "builder-name": data.postedByName,
      "rera-id": phaseOverview[0]?.reraId,
      "total-units": data.totalUnit.toString(),
      "project-area": data.totalLandArea,
      "project-status": data.projectStatus,
    },
  };
}

export const dynamicParams = true;
export const dynamic = "force-static";
