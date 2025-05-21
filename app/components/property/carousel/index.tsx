"use client";
import React, { Fragment } from "react";
import ProjectCarousel from "../../property/carousel/PropertyCard";
import useNearby from "@/app/hooks/property/useNearBy";
import { listingProps } from "@/app/data/projectDetails";
// import { slugify } from "../BreadCrumb/ListingBreadcrumb";

export default function NearByCarouselProperty({
  projName,
  lat,
  lng,
  projId,
  cg,
  propTypeName,
  bhkId,
  builderName,
  builderId,
 
}: {
  projName: string;
  lat: string;
  lng: string;
  projId?: string;
  cg: string;
  propTypeName: string;
  bhkId: number;
  builderName: string;
  builderId: number;

}) {
  const { data, mutate } = useNearby({
    lat,
    lng,
    projId,
    cg,
    bhkId,
    propType: listingProps[propTypeName.trim() as keyof typeof listingProps],
  });
  const listingType = cg === "R" ? "Rent" : "Sale";
  const builderQueryNameAndId = encodeURIComponent(`${builderName}+${builderId}`);
/*   const cityIdmaking=cityID.trim()
  const cityQueryNameAndID=encodeURIComponent(`${location}+${cityIdmaking}`); */
  return (
    <div
      className="flex flex-col justify-start items-start w-[100%] mt-[20px] sm:mt-[50px] scroll-mt-[220px]"
      id="similarListing"
    >
      <ProjectCarousel
        type="prop"
        title={
          <Fragment>
            Other {listingType} listings in{" "}
            <span className="text-[#148B16]">{projName}</span>
          </Fragment>
        }
        projName={""}
        content={
          propTypeName === "Independent House/Building"
            ? `Check some similar nearby ${listingType.toLowerCase()} listings available`
            : `See some more ${listingType.toLowerCase()} listings available in ${projName}`
        }
        data={
          data != undefined && data.projListing != undefined
            ? data.projListing
            : []
        }
        mutate={mutate}
        ct="proj"
        url={`/search/listing?sf=builderIds=${builderQueryNameAndId}`}
       
       /*  url={`/search?sf=builderIds=${builderQueryNameAndId}-city=${cityQueryNameAndID}`} */
      />
      <ProjectCarousel
        type="prop"
        title={
          <Fragment>
            Nearby Similar {listingType} Listings of{" "}
            <span className="text-green-800">{projName}</span>
          </Fragment>
        }
        content={`Check some similar nearby ${listingType.toLowerCase()} listings available`}
        data={
          data != undefined && data.otherListing != undefined
            ? data.otherListing
            : []
        }
        mutate={mutate}
        ct="other"
        url={`/search/listing?sf=lat=${lat}-lng=${lng}`}
        
      />
    </div>
  );
}
