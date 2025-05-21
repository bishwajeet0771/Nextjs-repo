import {
  formatDate,
  // formatDateDDMMYYYY
} from "@/app/utils/date";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { Divider } from "@mantine/core";
import React from "react";

type Props = any;

export default function ListingData({
  propTypes,
  possassionDate,
  launchDate,
  landArea,
  type,
  availableFrom,
  ca,
  sba,
  propertyAge,
  propStatus,
  propTypeName,
  pa,
}: Props) {
  return (
    <div className="flex mb-2  sm:max-w-full xl:w-[450px] gap-1 flex-col items-start  pl-[11px]  py-[2px] rounded border-[0.5px] border-solid border-[#616D75] bg-[#F5F5F5]">
      {type === "proj" && (
        <div className="mt-[2px] hidden md:block">
          <h5 className="text-[#001F35] text-sm font-medium">
            Property Available:
          </h5>
          <p className="text-[#242424]  text-base not-italic font-semibold">
            {propTypes && propTypes?.length > 0 ? propTypes?.join(", ") : ""}
          </p>
        </div>
      )}

      {/* down section start here */}
      {type === "proj" ? (
        <div className="flex items-center gap-2 xl:gap-4 self-stretch">
          {type === "proj" && (
            <div className="mt-[2px] block md:hidden">
              <h5 className="text-[#001F35] text-wrap text-[12px] xl:text-sm font-medium">
                Listing Available
              </h5>
              <p className="text-[#242424]  text-wrap text-[12px] xl:text-base not-italic font-semibold">
                {propTypes && propTypes?.length > 0
                  ? propTypes?.join(", ")
                  : ""}
              </p>
            </div>
          )}
          <Divider
            orientation="vertical"
            color="#7BA0BB"
            className="flex md:hidden"
          />
          <DownSectionCard
            label="Start Date"
            value={formatDate(launchDate, true)}
          />
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard
            label="End Date"
            value={formatDate(possassionDate, true)}
          />
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard
            label={type == "proj" ? "Project Land Area" : "Property Age"}
            value={
              type == "proj"
                ? `${landArea ?? 0} Acres`
                : `${propertyAge ?? 0} Years`
            }
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 xl:gap-4 self-stretch">
          {propTypeName != "Plot" ? (
            <>
              <DownSectionCard
                label="Super Builtup Area"
                value={`${formatNumberWithSuffix(sba)} sq.ft`}
              />
              <Divider orientation="vertical" color="#7BA0BB" />
              <DownSectionCard
                label="Carpet Area"
                value={`${formatNumberWithSuffix(ca)} sq.ft`}
              />
              <Divider orientation="vertical" color="#7BA0BB" />
            </>
          ) : (
            <>
              <DownSectionCard
                label="Total Area"
                value={`${formatNumberWithSuffix(pa)} sq.ft`}
              />
              <Divider orientation="vertical" color="#7BA0BB" />
            </>
          )}

          {propStatus == "Under Construction" ? (
            <DownSectionCard
              label="Possession Date"
              value={formatDate(possassionDate, true)}
            />
          ) : (
            <DownSectionCard
              label="Property Age"
              value={
                type == "proj"
                  ? `${formatNumberWithSuffix(landArea) ?? 0} Acres`
                  : `${propertyAge ?? `0 Years`} `
              }
            />
          )}
          <Divider orientation="vertical" color="#7BA0BB" />
          <DownSectionCard
            label="Available From"
            value={formatDate(availableFrom, true)}
          />
        </div>
      )}
    </div>
  );
}
const DownSectionCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-start ">
      <p className="text-[#001F35] text-[12px] sm:text-[14px] xl:text-sm not-italic font-medium text-wrap">
        {label}:
      </p>
      <p className="text-[#242424] text-[12px] sm:text-[14px] xl:text-sm not-italic font-semibold">
        {value}
      </p>
    </div>
  );
};
