import { LIstingResponse } from "@/app/validations/property";
import { Main as M } from "@/app/validations/types/project";
import { isValidSlugId } from "@/common/utils/slugUtils";
import axios from "axios";
import { notFound } from "next/navigation";
import { generateListingLinkUrl } from "../../linkRouters/ListingLink";

const getProjectDetails = async (slug: string): Promise<M | any> => {
  if (slug) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/listing/project/data?projIdEnc=${slug}`
      // {
      //   cache: "no-cache",
      // }
      // {
      //   next: { revalidate: 30 },
      // }
    );
    const data = await response.json();

    return data as M;
  }
};

const getListingDetails = async (
  slug: string,
  pathname?: string
): Promise<LIstingResponse> => {
  if (!isValidSlugId(slug)) {
    notFound();
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/fetch/listing/data?propIdEnc=${slug}`,
      {
        next: { tags: [slug] },
      }
    );
    const data = await response.json();
    if (!data || !data.status) {
      console.log(
        "status false from backend redirecting from next server 404."
      );
      return notFound();
    }
    if (
      pathname &&
      (process.env.ENVIRONMENT === "production" ||
        process.env.ENVIRONMENT === "test")
    ) {
      const originalPath = generateListingLinkUrl({
        city: data.listing.ctName,
        locality: data.listing.ltName,
        bhkUnitType: data.listing.bhkName
          ? `${data.listing.bhkName} ${data.listing.propTypeName}`
          : data.listing.propTypeName,
        propIdEnc: data.listing.propIdEnc,
        category: data.listing.cg === "S" ? "for-sale" : "for-rent",
        phase: data.listing.phaseName,
        projName: data.listing.projIdEnc ? data.listing.propName : null,
      });
      if (originalPath !== pathname) {
        console.log(
          "path not mached what come from front-end and backe-end redirecting from next server 404."
        );
        throw new Error(originalPath);
      }
    }
    const filterOtherDetails =
      data.listing.otherPrice &&
      Object?.keys(data.listing.otherPrice).filter(
        (item) =>
          ![
            "otherCharge",
            "price",
            "securetyType",
            "clubHouseTill",
            "securityMonth",
            "security",
          ].includes(item)
      );
    const ac = filterOtherDetails?.reduce(
      (a: any, b: any) =>
        b !== "price" &&
        !(
          b === "clubHouseCharge" &&
          data.listing.otherPrice.clubHouseCharge === "A"
        ) &&
        data.listing.otherPrice[b] !== "NA" &&
        data.listing.otherPrice[b] !== "A"
          ? Number(a) +
            (b === "otherCharge"
              ? parseOtherCharge(data.listing.otherPrice[b])
              : Number(data.listing.otherPrice[b] || "0"))
          : Number(a),
      0
    );

    const otherCharges =
      data.listing.otherPrice &&
      parseOtherCharge(data.listing.otherPrice.otherCharge);
    return { ...data, totalPrice: ac + otherCharges };
  } catch (error: any) {
    // console.log(error);
    notFound();
    // (error.message as string);
  }
};

const getNearByLocations = async (slug: string): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/get-nearby?projIdEnc=${slug}`
  );
  const data = await response.json();
  return data;
};
const getReportConstData = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/getConstantList`,
    ["propReport"]
  );
  return res.data;
};

/* export const getCommonData = async (key:any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}common/get/locality-name/id?id=${key}`,
    
  );
  return res.data;
}; */
export {
  getProjectDetails,
  getListingDetails,
  getNearByLocations,
  getReportConstData,
};

function parseOtherCharge(otherChargeString: string): number {
  let sum = 0;

  if (otherChargeString) {
    const charges: string[] = otherChargeString.split(",");
    charges.forEach((charge: string) => {
      const parts: string[] = charge.split("|");
      if (parts.length === 2) {
        const value: number = parseFloat(parts[1].trim());
        if (!isNaN(value)) {
          sum += value;
        }
      }
    });
  }

  return sum;
}
