import React from "react";
import dynamic from "next/dynamic";
import "@mantine/carousel/styles.css";
const AboutBuilder = dynamic(
  () => import("@/app/components/project/aboutBuilder")
);
const GalleryBlock = dynamic(
  () => import("@/app/components/project/galleryBlock")
);
const Amenties = dynamic(() => import("@/app/components/project/amenties"));
const Loans = dynamic(() => import("@/app/components/project/loans"));
const FaqWithBg = dynamic(() => import("@/app/components/project/faq"));
const About = dynamic(() => import("@/app/components/project/about"));
const Navigation = dynamic(
  () => import("@/app/components/property/Navigation")
);
const ProjectDrawer = dynamic(() => import("@/app/components/project/Drawer"));
const RoomDetails = dynamic(
  () => import("@/app/components/property/RoomDetails")
);
const PropertyOverView = dynamic(
  () => import("@/app/components/property/Overview")
);
const RoomFloorplansBlock = dynamic(
  () => import("@/app/components/property/Floorplan")
);
const PropertyBanner = dynamic(
  () => import("@/app/components/property/propertyBanner")
);
const PropertyFirstBlock = dynamic(
  () => import("@/app/components/property/fistblock")
);
import LeafMap from "@/app/components/project/map";
import ListingSchema from "@/app/seo/listing/listing.schema";
const PropertyMap = dynamic(() => import("@/app/components/property/map"));
const NearByCarouselProperty = dynamic(
  () => import("@/app/components/property/carousel")
);
const LoginPopup = dynamic(
  () => import("@/app/components/project/modals/LoginPop")
);
const MobileHidden = dynamic(
  () => import("@/app/components/molecules/MobileHidden")
);
const PriceBreakup = dynamic(
  () => import("@/app/components/property/pricingbreakup/PriceBreakup")
);
const CompareError = dynamic(
  () => import("@/app/components/property/actions/Error")
);
const NearByCarouselProjProperty = dynamic(
  () => import("@/app/components/property/carousel/ProjectCarouse")
);
const ListingBreadCrumbs = dynamic(
  () => import("@/app/components/property/BreadCrumb/ListingBreadcrumb")
);
const ProjectGallery = dynamic(
  () => import("@/app/components/project/_ui/modals/GallerySectionModal")
);

type Props = {
  data: any;
  totalPrice: number;
  projData: any;
  issueData: any;
  amenitiesFromDB: any;
  nearByLocations: any;
  TITLE_OF_PROP: string;
  params: any;
  pathname: string;
};

export default function ListingDetailsPage({
  data,
  projData,
  totalPrice,
  issueData,
  amenitiesFromDB,
  nearByLocations,
  TITLE_OF_PROP,
  params,
  pathname,
}: Props) {
  const title = `${data?.bhkName ?? ""} ${data?.propTypeName} For
  ${data?.cg === "S" ? " Sale" : " Rent"} In
  ${data?.ltName}${data?.projIdEnc ? `, ${data?.propName}` : ""}`;

  console.log(title);

  const newTitle = `${data?.bhkName ?? ""} ${data?.propTypeName} For
  ${data?.cg === "S" ? " Sale" : " Rent"} In
  ${data?.ltName} at ${data.propName}`;

  return (
    <div className="w-full">
      <ListingSchema
        listingData={{
          listing: data,
          nearByLocations: nearByLocations,
          faqData: projData?.faqs,
          title: title,
          url: pathname,
        }}
      />
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_URL}${pathname}`}
      />
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <ListingBreadCrumbs
            params={params}
            isProject={!!data.projIdEnc}
            title={title}
            pathname={pathname}
          />

          {/* Top Cover Image Card */}
          <PropertyFirstBlock
            projectDetails={data}
            projName={data.propName}
            totalPrice={totalPrice}
            isOkWithBrokerContact={data.isOkWithBrokerContact}
            isUsed={data.isUsed}
          />
        </div>
        {/* Navigations Container */}
        <MobileHidden>
          <Navigation
            detailsData={data}
            projData={!!data.projIdEnc}
            relateProjData={projData}
            projName={data.propName}
            lat={projData?.lat ?? data.lat}
            lng={projData?.lang ?? data.lang}
            projId={data.projIdEnc}
            cg={data.cg}
            propTypeName={data.propTypeName}
            bhkId={data.bhkId ?? 41}
            nearByLocations={nearByLocations}
          />
        </MobileHidden>
        {/* Overview */}
        <PropertyOverView data={data} issueData={issueData.propReport} />
        {/* About */}
        {data.usp && (
          <About
            type="prop"
            id="about"
            heading="about Listing"
            projName={"Listing"}
            content={data.usp}
            showProjName={false}
            newTitle={newTitle}
          />
        )}
        {/* Property Details */}
        <RoomDetails data={data} />
        {/* Floor Plan Block */}
        <RoomFloorplansBlock data={data} />
        <GalleryBlock
          media={data.projMedia}
          type="prop"
          coverUrl={""}
          projReviewVideoUrl={""}
          otherImgUrl={[]}
          projectVideoIUrl=""
          coverImageUrl={""}
          projectPlanUrl={""}
          walkThrowVideoUrl={""}
          projBroucherUrl={""}
          newTitle={newTitle}
        />
        {data?.amenities?.length > 0 && (
          <Amenties
            projName="Listing"
            type="prop"
            data={data?.amenities?.map((item: any) => {
              return { id: item, name: String(item) };
            })}
            amenitiesFromDB={amenitiesFromDB}
          />
        )}

        {data.projIdEnc && (
          <>
            <LeafMap
              lat={projData.lat}
              lang={projData.lang}
              projName={data.propName}
              projId={data.projIdEnc}
              type="prop"
              mapData={nearByLocations}
            />
            {/* {data.postedById === projData.builderId && ( */}
            <>
              <PropertyBanner
                {...projData}
                cityName={data.ctName}
                localityName={data.ltName}
                projIdEnc={data.projIdEnc}
              />
              {/* <ErrorContainer data={projData.banks}> */}
              {data.cg === "S" &&
                data.postedById === projData.builderId &&
                projData.banks.length > 0 && (
                  <Loans
                    type="prop"
                    banks={projData.banks}
                    name={data.propName}
                  />
                )}
              {/* About Builder */}
              <AboutBuilder type="proj" id={projData.builderId} />
              {data.postedById === projData.builderId && (
                <div
                  id="faq"
                  className="scroll-mt-[70px] m-auto w-[95%] sm:w-[90%] flex justify-start items-start"
                >
                  <FaqWithBg
                    data={projData.faqs}
                    projName={data.propName}
                    slug={data.projIdEnc}
                    postedById={projData.builderId}
                  />
                </div>
              )}{" "}
            </>

            {/* )} */}
          </>
        )}
        {!data.projIdEnc && (
          <>
            <div id="location-map" className="mt-10 scroll-mt-[180px]" />
            <PropertyMap
              lat={data?.lat ?? 0}
              lang={data?.lang ?? 0}
              projName={TITLE_OF_PROP}
              projId={data.propIdEnc}
              type="prop"
              mapData={nearByLocations}
            />
          </>
        )}

        <NearByCarouselProperty
          projName={data.propName}
          lat={projData?.lat ?? data.lat}
          lng={projData?.lang ?? data.lang}
          projId={data.projIdEnc}
          cg={data.cg}
          propTypeName={data.propTypeName}
          bhkId={data.bhkId ?? 41}
          builderName={data?.postedByName}
          builderId={projData?.builderId}

          // query={""}
        />
        {/* {data.projIdEnc && data.postedById === projData.builderId && ( */}
        <NearByCarouselProjProperty
          projName={""}
          lat={projData?.lat}
          lng={projData?.lang}
          projId={data.projIdEnc}
          builderId={projData?.builderId}
          company={projData?.companyName}
          nearBy={{
            title: `Other Projects by ${data.postedByName}`,
          }}
        />
        {/* )} */}
        <PriceBreakup
          otherPrice={data.otherPrice}
          price={data.price}
          type={data.cg === "S" ? "Selling" : "Rent"}
        />
        <ProjectGallery />
        <LoginPopup />
        <ProjectDrawer projName={TITLE_OF_PROP} />
        <CompareError />
        {/*   <SharePopup /> */}
      </div>
    </div>
  );
}
