import React from "react";
import AboutBuilder from "@/app/components/project/aboutBuilder";
import GalleryBlock from "@/app/components/project/galleryBlock";
import Amenties from "@/app/components/project/amenties";
import Loans from "@/app/components/project/loans";
// import FaqWithBg from "@/app/components/project/faq";
import About from "@/app/components/project/about";
import Navigation from "@/app/components/property/Navigation";
import Link from "next/link";
import {
  getProjectDetails,
  getReportConstData,
  getListingDetails,
} from "@/app/utils/api/property";
import ProjectDrawer from "@/app/components/project/Drawer";
import RoomDetails from "@/app/components/property/RoomDetails";
import PropertyOverView from "@/app/components/property/Overview";
import RoomFloorplansBlock from "@/app/components/property/Floorplan";
import PropertyBanner from "@/app/components/property/propertyBanner";
import PropertyFirstBlock from "@/app/components/property/fistblock";
import LeafMap from "@/app/components/project/map";
import PropertyMap from "@/app/components/property/map";
// import NearByCarouselProperty from "@/app/components/property/carousel";
import LoginPopup from "@/app/components/project/modals/LoginPop";
import MobileHidden from "@/app/components/molecules/MobileHidden";
import PriceBreakup from "@/app/components/property/pricingbreakup/PriceBreakup";
import { notFound } from "next/navigation";
import CompareError from "@/app/components/property/actions/Error";
import NearByCarouselProjProperty from "@/app/components/property/carousel/ProjectCarouse";
import { getAmenties } from "@/app/utils/api/project";

type Props = { params: { slug: string } };
export default async function ProjectDetails({ params: { slug } }: Props) {
  const {
    listing: data,
    nearByLocations,
    totalPrice,
  } = await getListingDetails(slug);
  const projData = await getProjectDetails(data.projIdEnc);
  const issueData = await getReportConstData();
  const TITLE_OF_PROP = data.projIdEnc
    ? data.propName
    : `${data.bhkName ?? ""} ${data.propTypeName} For
  ${data.cg === "S" ? " Sale" : " Rent"} In ${data.ltName}`;
  const amenitiesFromDB = await getAmenties();
  if (!data.propIdEnc) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="mt-[70px] sm:mt-[90px] w-full sm:pb-[2%] flex xl:text-ellipsis items-center justify-center flex-col">
        <div className="p-[1%] sm:p-[1%] sm:py-0 xl:p-[1%] w-full sm:w-[94%]">
          <p className="text-[12px] sm:text-[16px] text-[#565D70] font-[500] mb-[1%] mt-1 ">
            <span className="hover:underline cursor-pointer ">Home</span>{" "}
            {" > "}
            <Link href={"/project/banglore"} className="text-nowrap" prefetch={false}>
              <span className="hover:underline cursor-pointer">
                Property In {data.ctName}
              </span>
            </Link>{" "}
            {" > "}
            <span className="text-nowrap">
              {data.bhkName} {data.propTypeName} In {data.ltName}
            </span>
          </p>
          {/* Top Cover Image Card */}
          <PropertyFirstBlock
            projectDetails={data}
            projName={data.propName}
            totalPrice={totalPrice}
            isOkWithBrokerContact={!!data.isOkWithBrokerContact}
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
              {" "}
              <PropertyBanner {...projData} projIdEnc={data.projIdEnc} />
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
                  {/* <FaqWithBg data={projData.faqs} projName={data.propName} slug={slug} /> */}
                </div>
              )}{" "}
            </>
            {/* )} */}
          </>
        )}
        {!data.projIdEnc && (
          <PropertyMap
            lat={data?.lat ?? 0}
            lang={data?.lang ?? 0}
            projName={TITLE_OF_PROP}
            projId={data.propIdEnc}
            type="prop"
            mapData={nearByLocations}
          />
        )}

        {/* <NearByCarouselProperty
          projName={data.propName}
          lat={projData?.lat ?? data.lat}
          lng={projData?.lang ?? data.lang}
          projId={data.projIdEnc}
          cg={data.cg}
          propTypeName={data.propTypeName}
          bhkId={data.bhkId ?? 41}
          // query={""}
        /> */}
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
        <LoginPopup />
        <ProjectDrawer projName={TITLE_OF_PROP} />
        <CompareError />
      </div>
    </div>
  );
}

// export async function generateStaticParams() {
//   // const slugs = ["96ed572a1630741b975b7950bf0c2f99"];
//   const { projResult } = await getParams();

//   return projResult.map((slug: string) => ({
//     slug,
//   }));
// }

// async function getParams() {
//   let data = await axios.get(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/all/active/ids?identifier=project`
//   );

//   return data.data;
// }
