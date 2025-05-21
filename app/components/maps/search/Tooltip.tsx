import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import { formatCurrency } from "@/app/utils/numbers";
import Image from "next/image";
import React from "react";
import { BiSolidBuildings, BiSolidMapPin, BiSolidUser } from "react-icons/bi";

type PropertyType = {
  propType: string;
  minPrice: number | string;
  maxPrice: number | string;
};

type PhaseData = {
  phaseName: string;
  propertyTypes: PropertyType[];
};

type TooltipProjProps = {
  projName: string;
  city: string;
  state: string;
  locality: string;
  postedByName: string;
  phases: PhaseData[];
  coverUrl: string;
  type: string;
  reqId: string;
};

// function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//     minimumFractionDigits: 0
//   }).format(amount);
// }

export const onClickRedirect = (data: any) => {
  // console.log(data)
  let url;
  if (data.type == "proj") {
    url = createProjectLinkUrl({
      city: data.city,
      locality: data.locality,
      slug: data.projName,
      projIdEnc: data.reqId,
    });
    window.open(url, "_self");
  } else {
    url = generateListingLinkUrl({
      city: data.cityName,
      locality: data.localityName,
      projName: data.projIdEnc ? data.propName : null,
      category: data.category === "Sale" ? "for-sale" : "for-rent",
      phase: data.phaseName,
      propIdEnc: data.reqId,
      bhkUnitType: data.bhkName
        ? `${data.bhkName + " " + data.propTypeName}`
        : "" + " " + data.propTypeName,
    });

    window.open(url, "_self");
  }
};

export default function TooltipProj({ data }: { data: TooltipProjProps }) {
  const { projName, city, locality, phases, postedByName, coverUrl } = data;
  return (
    <div
      className="bg-white text-xs cursor-pointer rounded-lg overflow-hidden w-full max-w-[100%] "
      onClick={(e) => {
        e.stopPropagation();
        onClickRedirect(data);
      }}
    >
      <div className="space-y-1 p-2 flex w-full gap-[6px] ">
        <Image
          src={coverUrl}
          alt="listing cover Image"
          quality={80}
          height={630}
          width={1200}
          className=" w-[80px] xl:w-[100px] h-[80px] xl:h-[100px] border-[0.5px] border-gray border-solid rounded-[10px] "
          unoptimized
        />

        <div className="w-full mt-0 pt-0">
          {/* Header */}
          <div className="border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-[4px] text-sm !font-montserrat">
              <BiSolidBuildings size={16} className="text-blue-600" />
              {projName}
            </h3>
            <div className="flex items-center gap-1 text-gray-700">
              <BiSolidMapPin size={14} className="text-emerald-600" />
              <p className="text-[12px] font-medium !m-0 !p-0 !font-montserrat ">
                {locality}, {city}
              </p>
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <BiSolidUser size={14} className="text-purple-600" />
              <p className="text-[12px] font-medium !m-0 !p-0 !font-montserrat">
                Builder:{" "}
                <span className="text-gray-500 ml-0.5">{postedByName}</span>
              </p>
            </div>
          </div>

          {/* Phases */}
          <div className="space-y-1 mt-1">
            {phases.map((phase, index) => (
              <div
                key={phase.phaseName + index.toString()}
                className="bg-gray-100 rounded px-1 py-0.5"
              >
                {phase.phaseName && (
                  <p className="font-semibold text-gray-800 text-xs !m-0 !p-0 mb-1 !font-montserrat">{`Phase: ${phase.phaseName}`}</p>
                )}
                <div className="flex w-full ">
                  {phase.propertyTypes.map((property, index) => {
                    return (
                      <div
                        key={property.propType + index.toString()}
                        className="flex justify-between items-center text-xs bg-white p-1 rounded border border-gray-200"
                      >
                        <span className="text-gray-800 font-medium !font-montserrat">
                          {property.propType}
                        </span>
                        <span className="text-emerald-700 font-semibold text-nowrap !font-montserrat ml-[4px] ">
                          {formatCurrency(Number(property.minPrice) || 0)} -{" "}
                          {formatCurrency(Number(property.maxPrice) || 0)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
