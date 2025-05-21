import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
import { calculatePerSqPrice } from "@/app/utils/price";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  // FaBuilding,
  // FaCompass,
  // FaCalendarAlt,
  // FaCar,
  // FaBath,
  // FaExpandArrowsAlt,
} from "react-icons/fa";
import Button from "../../../../elements/button";

import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import Link from "next/link";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";

// interface PropertyCardProps {
//   property: {
//     propName: string;
//     phaseName?: string;
//     localityName: string;
//     cityName: string;
//     stateName: string;
//     price: number;
//     sba: string;
//     ca: string;
//     propStatus: string;
//     facing: string;
//     bhkName: string;
//     propTypeName: string;
//     coverImage: string;
//     parking: number;
//     bathroom: number;
//     propertyAge: string;
//     postedByName: string;
//     sqftPrice: number;
//     availableFrom: string;
//     category: string;
//     pa: string;
//     ownership: string;
//     availableFor: string;
//     balcony: string;
//     approvedById: string;
//     coverParking: string;
//     propIdEnc: string;
//     postedBy: string;
//     postedById: number;
//     projIdEnc: string | null;
//   };
// }

export function PropertyCard({ property }: any) {
  // Format the available from date
  // const availableDate = new Date(property.availableFrom);
  /*   const formattedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(availableDate) */

  // Extract the first image URL from the comma-separated list
  const coverImageUrl = property?.coverImage?.split(",")[0];
  let type = "prop";
  // Format price function
  const formatPrice = (price: number): string => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lac`;
    } else {
      return price.toLocaleString("en-IN");
    }
  };
  // const getApprovedFirstName = (item: string) => {
  //   if (item.includes(" - ")) {
  //     return item.split(" - ")[0];
  //   } else if (item.includes(" – ")) {
  //     return item.split(" – ")[0];
  //   } else if (item.includes("–")) {
  //     return item.split("–")[0];
  //   } else if (item.includes("-")) {
  //     return item.split("-")[0];
  //   }
  // };
  const [, { open }] = useReqCallPopup();
  /*   const getApproveNames = () => {
    let idsString = property.approvedById ? property.approvedById.split(",") : [];
    if (!approvedData) return "N/A";
    const authorityNames = [];
    for (const item of approvedData as any) {
      if (idsString.includes(item.cid.toString())) {
        authorityNames.push(getApprovedFirstName(item.constDesc));
      }
    }

    return authorityNames.join(", ");
  }; */

  return (
    <div className="rounded-lg overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-lg border border-gray-200">
      <div className="relative h-64 w-full">
        <span className="absolute top-3 left-3 z-10 bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded-md">
          {property.propStatus}
        </span>
        <span className="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-md">
          {property.propTypeName || "Plot"}
        </span>
        <Image
          src={coverImageUrl || "/placeholder.svg?height=400&width=600"}
          alt={`Cover image of ${property.bhkName} ${
            property.propTypeName
          } for ${property.category} in ${property.localityName}, ${
            property.cityName
          } at ${property.propName}. Price: ₹${formatPrice(
            property.price
          )}. Address: ${property.address || property.localityName}`}
          title={`Cover image of ${property.bhkName} ${
            property.propTypeName
          } for ${property.category} in ${property.localityName}, ${
            property.cityName
          } at ${property.propName}. Price: ₹${formatPrice(
            property.price
          )}. Address: ${property.address || property.localityName}`}
          fill
          className="object-cover"
        />
        {/*   <div className="flex flex-row justify-between  mb-4 absolute bottom-1 left-1 w-full">
          <div className="flex flex-col justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-[12px] xl:text-base not-italic font-semibold leading-[normal] capitalize">
            <p className="text-sm text-white-500">Price</p>
            <p className="font-bold text-lg">₹{formatPrice(property.price)}</p>
            <p className="text-xs text-white-500">₹{property.sqftPrice}/sq.ft</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-[12px] xl:text-base not-italic font-semibold leading-[normal] capitalize">
            <p className="text-sm text-gray-500">Property Type</p>
            <p className="font-medium">{property.propTypeName}</p>
          </div>
        </div> */}
      </div>

      <div className="p-4 border-b">
        <div className="space-y-1">
          <h2 className="font-bold text-xl text-wrap">
            <Link
              prefetch={false}
              href={generateListingLinkUrl({
                city: property.cityName,
                locality: property.localityName,
                projName: property.projIdEnc ? property.propName : "",
                category:
                  property.category === "Sale" ? "for-sale" : "for-rent",
                phase: property.phaseName,
                propIdEnc: property.propIdEnc,
                bhkUnitType: property.bhkName
                  ? `${property.bhkName + " " + property.propTypeName}`
                  : "" + " " + property.propTypeName,
              })}
              /*  href={`/residential/projects/${
                          property.city?.toLowerCase() || "unknown"
                        }/${
                          property.locality?.toLowerCase() || "unknown"
                        }/${property.projName
                          ?.toLowerCase()
                          .replace(/ /g, "-")}-${property.projIdEnc}`} */
              className="text-xl font-bold mb-2 text-blue-600 hover:cursor-pointer"
            >
              {property.bhkName} {property.propTypeName} for {property.category}{" "}
              in {property.localityName}{" "}
              {property.phaseName
                ? property.phaseName
                : property.propName
                ? property.propName
                : ""}
            </Link>
          </h2>
          <p className="text-[#148B16] text-[12px] sm:text-[12px] xl:text-base not-italic font-bold leading-[normal] capitalize">
            {formatCurrency(property.price)}
            {property.category === "Rent" ? "" : ","}{" "}
            {property.category !== "Rent" && (
              <span className="text-[#616D75] text-[12px] sm:text-[12px] xl:text-base not-italic font-bold leading-[normal] capitalize">
                ₹{" "}
                {calculatePerSqPrice(
                  property.price,
                  property.propTypeName === "Plot" ? property.pa : property.sba
                )}
                /- sq.ft
              </span>
            )}
          </p>

          <div className="flex items-center text-gray-500 text-sm">
            <FaMapMarkerAlt className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">
              {property.localityName}, {property.cityName}, {property.stateName}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <div className="flex items-center gap-2 xl:gap-x-4 xl:gap-y-0 self-stretch flex-wrap">
          {property.propTypeName != "Plot" ? (
            <>
              <DownSectionCard
                label="Super Builtup Area"
                value={`${formatNumberWithSuffix(property.sba, false)} sq.ft`}
              />
              <DownSectionCard
                label="Carpet Area"
                value={`${formatNumberWithSuffix(property.ca, false)} sq.ft`}
              />

              {property.propStatus !== "Under Construction" && (
                <DownSectionCard
                  label={"Property age"}
                  value={property.propertyAge ?? "N/A"}
                />
              )}
            </>
          ) : (
            <DownSectionCard
              label="Total Area"
              value={`${formatNumberWithSuffix(property.pa, false)} sq.ft`}
            />
          )}
          <DownSectionCard label={"OwnerShip"} value={property.ownership} />
          {property.category == "Rent" && (
            <DownSectionCard
              label={"Available For"}
              value={property.availableFor}
            />
          )}

          <div className="flex flex-nowrap gap-2 xl:gap-x-4">
            {/* <DownSectionCard label={"Approved By"} value={approvedById ? approvedById.split(",").map((item:string)=>item.split(' – ')[0]).join(', ') : null} /> */}

            {/*  <DownSectionCard
                        label={"Approved By"}
                        value={property.approvedById ? getApproveNames() : null}
                      /> */}

            <DownSectionCard
              label={"Bathrooms"}
              value={property.bathroom && `${property.bathroom} No's`}
            />
            <DownSectionCard
              label={"Balcony"}
              value={property.balcony && `${property.balcony} No's`}
            />
            {property.propTypeName != "Plot" && (
              <DownSectionCard
                label={"Parkings"}
                value={
                  property.parking &&
                  `${property.parking} No's (${property.coverParking})`
                }
              />
            )}

            {property.category == "Rent" && (
              <DownSectionCard label={"Security Deposit"} value={`4,333`} />
            )}
          </div>
        </div>

        {/* <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-gray-100 rounded-md">
            <FaExpandArrowsAlt className="h-4 w-4 mb-1 text-gray-500" />
            <span className="text-xs font-medium">{property.sba} sq.ft</span>
            <span className="text-xs text-gray-500">Super Built-up</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-100 rounded-md">
            <FaBath className="h-4 w-4 mb-1 text-gray-500" />
            <span className="text-xs font-medium">{property.bathroom}</span>
            <span className="text-xs text-gray-500">Bathroom</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-100 rounded-md">
            <FaCar className="h-4 w-4 mb-1 text-gray-500" />
            <span className="text-xs font-medium">{property.parking}</span>
            <span className="text-xs text-gray-500">Parking</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <FaCompass className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.facing} Facing</span>
          </div>
          {property.propertyAge && <div className="flex items-center">
            <FaCalendarAlt className="h-4 w-4 mr-1 text-gray-500" />
            <span>{property.propertyAge}</span>
          </div>}
          <div className="flex items-center col-span-2 mt-1">
            <FaBuilding className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-500 truncate">By: {property.postedByName}</span>
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-2 p-4 border-t">
        <Link
          prefetch={false}
          href={generateListingLinkUrl({
            city: property.cityName,
            locality: property.localityName,
            projName: property.projIdEnc ? property.propName : "",
            category: property.category === "Sale" ? "for-sale" : "for-rent",
            phase: property.phaseName,
            propIdEnc: property.propIdEnc,
            bhkUnitType: property.bhkName
              ? `${property.bhkName + " " + property.propTypeName}`
              : "" + " " + property.propTypeName,
          })}
          className="px-4 pt-3 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors"
        >
          View Details
        </Link>
        <Button
          title="Request  Callback"
          buttonConClass="flex-1 bg-bgSecondary bg-primary hover:bg-primary/90 text-white px-4 sm:px-2 lg:px-4 py-2 rounded-lg text-center text-sm  sm:text-[10px] lg:text-sm font-medium transition-colors"
          buttonClass=""
          onChange={() => {
            open({
              modal_type:
                type === "proj"
                  ? "PROJECT_REQ_CALLBACK"
                  : "PROPERTY_REQ_CALLBACK",
              postedByName:
                type === "proj" ? property.builderName : property.postedBy,
              postedId: property.builderId,
              reqId: property.projIdEnc
                ? property.projIdEnc
                : property.propIdEnc,
              source: type === "proj" ? "projCard" : "propCard",
              title:
                type === "proj"
                  ? property.projName
                  : `${property.bhkName ?? ""} ${property.propTypeName} for
                ${property.cg === "R" ? "Rent" : "Sale"} in ${
                      property.localityName
                    }`,
            });
            // pushHistory();
          }}
        />
        {/*  <Button
                title="Request  Callback"
                buttonConClass="flex-1 bg-bgSecondary bg-primary hover:bg-primary/90 text-white px-4 sm:px-2 lg:px-4 py-2 rounded-lg text-center text-sm  sm:text-[10px] lg:text-sm font-medium transition-colors"
                buttonClass=""
                onChange={() => {
                  open({
                    modal_type: "PROPERTY_REQ_CALLBACK",
                    postedByName: property.postedBy,
                    postedId: property.postedById,
                    reqId: property.propIdEnc, 
                    source: "propCard",
                    title: property.propName,
                  });
                          }}
                        /> */}
      </div>
    </div>
  );
}
const DownSectionCard = ({
  label,
  value,
  Icon,
}: {
  label: string;
  value: any;
  Icon?: React.JSX.Element;
}) => {
  return value ? (
    <div className="flex flex-col justify-center items-start ">
      <h5 className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap underline inline-flex">
        {Icon} {label}:
      </h5>
      <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-sm not-italic font-semibold">
        {value}
      </p>
    </div>
  ) : null;
};
