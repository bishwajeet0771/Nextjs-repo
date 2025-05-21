// import {
//   // List,
//   NumberFormatter,
// } from "@mantine/core";
import React from "react";
// import { TbH4 } from "react-icons/tb";
import { pluralizeOrSingularize } from "@/app/utils/plural";
import { formatCurrency } from "@/app/utils/numbers";
import ListItem from "./ListItem";
type Props = {
  title: string;
  Icon: any;
  type: "price" | "otherprice" | "applicableprice";
  data?: any;
  otherPrice?: any;
};

export default function Card({ Icon, title, type, data, otherPrice }: Props) {
  const dynamicCompo = (() => {
    switch (type) {
      case "price":
        return (
          <h4 className="text-[#242424] ml-4 xl:ml-0  xl:text-2xl not-italic font-bold leading-[normal]">
            {formatCurrency(data)}
          </h4>
        );
      case "applicableprice":
        return (
          <ul className="w-full">
            {data.map((key: any) => {
              return (
                <ListItem
                  key={key}
                  value={
                    key === "clubHouseCharge" &&
                    otherPrice.clubHouseCharge === "A"
                      ? "Lifetime"
                      : key == "clubHouseCharge" && otherPrice.clubHouseTill
                      ? `${formatCurrency(otherPrice.clubHouseCharge)}/ ${
                          otherPrice.clubHouseTill
                        } ${pluralizeOrSingularize(
                          parseInt(otherPrice.clubHouseTill),
                          "Years"
                        )}`
                      : otherPrice[key] === "A"
                      ? "As Per Actuals"
                      : otherPrice[key] === "NA"
                      ? "Already Included"
                      : (formatCurrency(otherPrice[key]) as string)
                  }
                  label={displayNameMap[key]}
                />
              );
            })}
          </ul>
        );
      case "otherprice":
        return data.map((charge: string, index: number) => {
          const [chargeName, chargeValue] = charge.split("|");
          return (
            <ListItem
              key={`card_${charge[index]}`}
              label={chargeName.trim()}
              value={formatCurrency(chargeValue.trim())}
            />
          );
        });
      default:
        return null;
    }
  })();
  return (
    <div className="flex w-full mb-[16px] flex-col justify-center items-start gap-1 xl:gap-3.5 px-[9px] py-1.5 xl:py-2.5 border rounded-[10px] border-solid border-[#9AB1BC] ">
      <h4 className="flex  w-full items-center gap-2.5 pl-2.5 xl:pr-[298px] py-2.5 rounded-lg bg-[#ecebf5] text-[#001F35] text-[16px] xl:text-xl not-italic font-medium leading-[normal] capitalize">
        <Icon />
        <span> {title}</span>
      </h4>
      {dynamicCompo}
    </div>
  );
}

type DisplayNameMap = {
  [key: string]: string;
};
const displayNameMap: DisplayNameMap = {
  clubHouseCharge: "Club House Subscription",
  mncCharge: "Maintenance & Corpus Fund",
  taxGovtCharge: "Tax & Government Charges",
  ownershipCharge: "Ownership Transfer Fees",
  legalCharge: "Legal Charges",
  otherCharge: "otherCharge",
  elctCharge: "Electricity Charges",
  waterCharge: "Water Charges",
  maintananceChargess: "Maintenance Charges",
  // securetyType: "securetyType",
  // security: "Security Deposit",
  // securityMonth: "securityMonth",
};
