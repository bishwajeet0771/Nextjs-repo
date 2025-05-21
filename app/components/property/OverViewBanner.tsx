"use client";
import {
  // PriceBag,
  // Phone,
  // SVGBackground,
  WhatsAppButton,
} from "@/app/images/commonSvgs";
import React from "react";
import Button from "../../elements/button";
import RequestCallBackModal from "../molecules/popups/req";
import { formatCurrency } from "@/app/utils/numbers";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
// import { useParams } from "next/navigation";
import { Main } from "@/app/validations/property";
// import { calculatePerSqPrice } from "@/app/utils/price";
// import ListItem from "./pricingbreakup";
import { usePricingPop } from "@/app/hooks/property/usePricingPop";
import { useMediaQuery } from "@mantine/hooks";
import { parseOtherCharge } from "./pricingbreakup/PriceBreakup";
import { get_posted_by } from "@/app/utils/dyanamic/projects";
import Image from "next/image";
export default function PropertyOverviewBanner({
  price,
  propTypeName,
  // plotArea,
  // sba,
  propName,
  bhkName,
  cg,
  otherPrice,
  ltName,
  postedByName,
  postedByType,
  propIdEnc,
  postedById,
}: Main) {
  const [, { open }] = useReqCallPopup();
  const [collapsed, { open: toggle }] = usePricingPop();
  const filterOtherDetails =
    otherPrice &&
    Object?.keys(otherPrice).filter(
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
  const sum = filterOtherDetails?.reduce(
    (a, b) =>
      b !== "price" &&
      !(b === "clubHouseCharge" && otherPrice.clubHouseCharge === "A") &&
      otherPrice[b] !== "NA" &&
      otherPrice[b] !== "A"
        ? Number(a) +
          (b === "otherCharge"
            ? parseOtherCharge(otherPrice[b])
            : Number(otherPrice[b] || "0"))
        : Number(a),
    0
  );
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <div className="flex justify-start items-center w-full flex-col md:flex-row bg-[#f0f9ff] scroll-mt-40 max-w-screen-m">
      {/* <PriceBag className="w-[100px] h-[120px]  sm:w-[151px] xl:w-[237px]  sm:h-[169px] xl:h-[263px] mt-2 sm:mt-0" />*/}
      
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/pricebag-mobile.webp`}
        width={100}
        height={120}
        alt="price OverView"
        className="w-[100px] sm:hidden h-[120px] sm:h-[169px] mt-2 sm:mt-0"
        unoptimized
        title="price OverView"
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/pricebag-laptop.webp`}
        width={151}
        height={169}
        alt="price OverView"
        className=" sm:max-w-[151px] hidden sm:flex xl:hidden  sm:w-[151px]   sm:h-[169px] mt-2 sm:mt-0"
        unoptimized
        title="price OverView"
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/project-detail/pricebag.webp`}
        width={237}
        height={263}
        alt="price OverView"
        className="   xl:max-w-[237px]  xl:w-[237px] xl:h-[263px] hidden xl:flex  mt-2 sm:mt-0"
        unoptimized
        title="price OverView"
      />   
      <div className="flex justify-center sm:justify-between items-center w-[100%] flex-row sm:ml-[3%] p-[2%] flex-wrap">
        <div className="flex  flex-col text-left">
          <h3 className="text-[#212C33] sm:text-[24px] xl:text-[34px] font-[600]  md:text-start text-center">
            {" Total "}
            {cg === "S" ? "Selling" : "Rent"} Price{" "}
            {otherPrice?.otherCharge && (
              <span className="sm:text-[16px] xl:text-[24px]">
                (Including Other Charges)
              </span>
            )}
          </h3 >
          <p className="text-[#001F35] sm:text-[24px]  xl:text-[36px] whitespace-nowrap font-[700] mt-1">
            <span className="text-[#001F35] sm:text-[24px]  xl:text-[36px] whitespace-nowrap font-[700] mt-1">
              {cg === "S"
                ? formatCurrency(
                    price + parseOtherCharge(otherPrice?.otherCharge) + sum
                  )
                : formatCurrency(
                    price + parseOtherCharge(otherPrice?.otherCharge) + sum
                  )}
            </span>
          </p>
          <Button
            title="Request  Callback"
            buttonClass="text-[#FFF] text-[12px] sm:text-[22px] xl:text-[28px] font-[600] bg-[#0073C6] hidden md:block  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px]  mt-3"
            onChange={() =>
              open({
                title: `${bhkName ?? ""} ${propTypeName} For ${
                  cg === "S" ? " Sell" : " Rent"
                } In ${ltName}`,
                modal_type: "PROPERTY_REQ_CALLBACK",
                postedByName: get_posted_by(postedByType),
                postedId: postedById,
                reqId: propIdEnc,
                source: "propBanner",
              })
            }
          />
        </div>
        {!isMobile ? (
          <div className="flex justify-end items-center flex-col mt-3">
            {otherPrice && (
              <button
              aria-label={collapsed ? "Hide Price Break Up" : "Show Price Break Up"}
              name={collapsed ? "Hide Price Break Up" : "Show Price Break Up"} 
              title={collapsed ? "Hide Price Break Up" : "Show Price Break Up"}
                onClick={toggle}
                className="text-[#FFF] text-[12px] sm:text-[24px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px] "
              >
                {collapsed ? "Hide Price Break Up" : "Show Price Break Up"}{" "}
                {/*   {config.priceIcon} */}
              </button>
            )}
            <WhatsAppButton
              className="cursor-pointer"
              onClick={""}
              name={`${bhkName ?? ""} ${propTypeName} For${
                cg === "S" ? " Sell" : " Rent"
              } ${propName ? `In ${propName}` : ""}`}
              type="prop"
            />
          </div>
        ) : (
          <>
            <div className="flex justify-center sm:justify-start items-center w-full space-x-2">
              <Button
                title="Request  Callback"
                buttonClass="  text-[#FFF] text-[12px] sm:text-[28px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px]  mt-3"
                onChange={() =>
                  open({
                    title: `${bhkName ?? ""} ${propTypeName} For
                ${cg === "S" ? " Sell" : " Rent"} In ${ltName}`,
                    modal_type: "PROPERTY_REQ_CALLBACK",
                    postedByName,
                    postedId: postedById,
                    reqId: propIdEnc,
                    source: "propBanner",
                  })
                }
              />
              <button
              aria-label={collapsed ? "Hide Price Break Up" : "Show Price Break Up"}
              name={collapsed ? "Hide Price Break Up" : "Show Price Break Up"} 
              title={collapsed ? "Hide Price Break Up" : "Show Price Break Up"}
                onClick={toggle}
                className="  text-[#FFF] text-[12px] sm:text-[24px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[8px]  mt-3"
              >
                {collapsed ? "Hide Price Break Up" : "Show Price Break Up"}{" "}
                {config.priceIcon}
              </button>
            </div>
            <WhatsAppButton
              className="cursor-pointer"
              onClick={""}
              name={`${bhkName ?? ""} ${propTypeName} For${
                cg === "S" ? " Sell" : " Rent"
              } ${propName ? `In ${propName}` : ""}`}
              type="prop"
            />
          </>
        )}
      </div>
      <RequestCallBackModal />
    </div>
  );
}

// const PriceBreakUp = ({
//   otherPrice,
//   price,
// }: {
//   otherPrice: Main["otherPrice"];
//   price: string;
// }) => {
//   const filterOtherDetails =
//     otherPrice &&
//     Object?.keys(otherPrice).filter(
//       (item) =>
//         ![
//           "otherCharge",
//           "price",
//           "securetyType",
//           "clubHouseTill",
//           "securityMonth",
//         ].includes(item) && otherPrice[item] !== "NA"
//     );

//   const sum = filterOtherDetails?.reduce(
//     (a, b) =>
//       b !== "price" &&
//       !(b === "clubHouseCharge" && otherPrice.clubHouseCharge === "A")
//         ? Number(a) +
//           (b === "otherCharge"
//             ? parseOtherCharge(otherPrice[b])
//             : Number(otherPrice[b] || "0"))
//         : Number(a),
//     0
//   );

//   function parseOtherCharge(otherChargeString: string): number {
//     let sum = 0;

//     if (otherChargeString) {
//       const charges: string[] = otherChargeString.split(",");
//       charges.forEach((charge: string) => {
//         const parts: string[] = charge.split("|");
//         if (parts.length === 2) {
//           const value: number = parseFloat(parts[1].trim());
//           if (!isNaN(value)) {
//             sum += value;
//           }
//         }
//       });
//     }

//     return sum;
//   }
//   const otherChangeTotal = parseOtherCharge(otherPrice?.otherCharge);
//   const chargesArray = otherPrice?.otherCharge?.split(",");
//   return (
//     <>
//       <div className="max-w-[90%] mx-auto p-6 bg-white rounded-lg shadow my-10">
//         <h2 className="text-[#202020] text-[32px] not-italic font-semibold leading-[normal] uppercase;">
//           PRICE BREAKUP
//         </h2>
//         <div className=" border-t border-gray-400 mt-4 space-y-4 py-5 ">
//           <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase mb-[30px]">
//             PRICE / SQ.FT
//           </h3>
//           <ListItem
//             label="Price/SQ.FT"
//             value={price}
//             className="max-w-[747px] border-none"
//           />
//         </div>

//         {sum > 0 && (
//           <>
//             <SVGBackground width={"100%"} className="my-8" />
//             <div className="w-full grid md:grid-cols-2 justify-between items-center">
//               <div className=" space-y-4 py-8 ">
//                 <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase mb-[30px]">
//                   applicable charges
//                 </h3>
//                 {filterOtherDetails?.map((key, i) => {
//                   return (
//                     <ListItem
//                       key={i}
//                       value={
//                         key === "security"
//                           ? Number(otherPrice[key]) *
//                             Number(otherPrice.securityMonth ?? 1)
//                           : key === "clubHouseCharge" &&
//                             otherPrice.clubHouseCharge === "A"
//                           ? "Lifetime"
//                           : (otherPrice[key] as string)
//                       }
//                       label={
//                         key === "clubHouseCharge"
//                           ? `${displayNameMap[key]} ${
//                               otherPrice.clubHouseCharge !== "A"
//                                 ? `(${otherPrice?.clubHouseTill} year)`
//                                 : ""
//                             } `
//                           : key === "security"
//                           ? `Security Deposit ${
//                               otherPrice.securetyType === "F"
//                                 ? "Fixed"
//                                 : otherPrice.securetyType === "M"
//                                 ? "Multiple Of Rent"
//                                 : "NA"
//                             }`
//                           : displayNameMap[key]
//                       }
//                       className={
//                         filterOtherDetails?.length - 1 === i
//                           ? "border-none"
//                           : ""
//                       }
//                     />
//                   );
//                 })}
//               </div>
//               <SideCard price={sum + otherChangeTotal} />
//             </div>
//           </>
//         )}

//         {otherPrice?.otherCharge && (
//           <>
//             <SVGBackground width={"100%"} className="my-8" />
//             <div className="w-full grid md:grid-cols-2 justify-between ">
//               <div className="   space-y-4 py-8 ">
//                 <h3 className="text-[#034AB6] text-[28px] not-italic font-bold leading-[normal] underline uppercase mb-[30px]">
//                   Other charges
//                 </h3>
//                 {chargesArray.map((charge, index) => {
//                   const [chargeName, chargeValue] = charge.split("|");
//                   return (
//                     <ListItem
//                       key={index}
//                       label={chargeName.trim()}
//                       value={chargeValue.trim()}
//                     />
//                   );
//                 })}
//               </div>
//               <OtherSideCard price={sum + otherChangeTotal + Number(price)} />
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// const SideCard = ({ price }: { price: number }) => {
//   return (
//     <div
//       className=" text-[#4D6677] flex w-96 h-[197px] justify-center items-center shrink-0 pt-7 pb-[27px] px-[27px] border-[color:var(--White-1,#F1F1F1)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[20px] border-[0.6px] border-solid;
//   background: var(--White-2, #fafafa) flex-col text-center ml-auto"
//     >
//       <p className="text-[color:var(--Pending,#F3A700)] text-center text-[22px] not-italic font-medium leading-[normal]">
//         The sum of total of your other charges you included in the &rdquo;Other
//         Charges Applicable&rdquo; is
//       </p>
//       <div className="mt-2 flex justify-center items-baseline text-[color:var(--newly-Added,#00ADE3)] text-[26px] not-italic font-bold leading-[normal] underline">
//         <span className="text-3xl font-bold">₹ {price}</span>
//       </div>
//     </div>
//   );
// };

// const OtherSideCard = ({ price }: { price: number }) => {
//   return (
//     <div
//       className=" text-[#4D6677] flex w-96 h-[197px] justify-center items-center shrink-0 pt-7 pb-[27px] px-[27px] border-[color:var(--White-1,#F1F1F1)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[20px] border-[0.6px] border-solid;
//   background: var(--White-2, #fafafa) flex-col text-center ml-auto mt-4"
//     >
//       <p className="text-[#343A44] text-center text-[20px] not-italic font-medium leading-[normal]">
//         The sum of total of your other charges you included in the &rdquo;Other
//         Charges Applicable&rdquo; is
//       </p>
//       <div className="text-[#148B16] text-[32px] not-italic font-semibold leading-[normal]">
//         <span className="text-3xl font-bold mt-1">₹ {price}</span>
//       </div>
//     </div>
//   );
// };

// type DisplayNameMap = {
//   [key: string]: string;
// };
// const displayNameMap: DisplayNameMap = {
//   clubHouseCharge: "Club House Subscription",
//   mncCharge: "Maintenance & Corpus Fund",
//   taxGovtCharge: "Tax & Government Charges",
//   ownershipCharge: "Ownership Transfer Fees",
//   legalCharge: "Legal Charges",
//   otherCharge: "otherCharge",
//   elctCharge: "Electricity Charges",
//   waterCharge: "Water Charges",
//   maintananceChargess: "Maintenance Charges",
//   securetyType: "securetyType",
//   security: "Security Deposit",
//   securityMonth: "securityMonth",
// };

const config = {
  priceIcon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="29"
      viewBox="0 0 28 29"
      fill="none"
      className="hidden sm:flex h-[24px] w-[24px] xl:h-[34px] xl:w-[34px]"
    >
      <path
        d="M11.3296 4.74772C12.0074 4.17022 12.3469 3.88089 12.7016 3.71172C13.1063 3.51834 13.5492 3.41797 13.9977 3.41797C14.4463 3.41797 14.8892 3.51834 15.2939 3.71172C15.6486 3.88089 15.9881 4.17022 16.6659 4.74772C17.3647 5.34272 18.0741 5.64372 19.0074 5.71722C19.8952 5.78839 20.3397 5.82456 20.7107 5.95522C21.5671 6.25856 22.2414 6.93172 22.5436 7.78922C22.6742 8.15906 22.7104 8.60355 22.7816 9.49255C22.8551 10.4259 23.1549 11.1341 23.7499 11.8329C24.3286 12.5107 24.6179 12.8502 24.7871 13.2049C25.1791 14.0251 25.1791 14.9782 24.7871 15.7972C24.6179 16.1519 24.3286 16.4914 23.7511 17.1692C23.1734 17.8182 22.8318 18.6433 22.7816 19.5107C22.7104 20.3986 22.6742 20.8431 22.5436 21.2141C22.394 21.637 22.1516 22.0212 21.8343 22.3383C21.517 22.6555 21.1326 22.8976 20.7096 23.0469C20.3397 23.1776 19.8952 23.2137 19.0062 23.2849C18.0729 23.3584 17.3647 23.6582 16.6659 24.2532C15.9881 24.8319 15.6486 25.1212 15.2939 25.2904C14.8892 25.4838 14.4463 25.5841 13.9977 25.5841C13.5492 25.5841 13.1063 25.4838 12.7016 25.2904C12.3469 25.1212 12.0074 24.8319 11.3296 24.2544C10.6805 23.6767 9.85549 23.3351 8.98807 23.2849C8.10023 23.2137 7.65573 23.1776 7.28473 23.0469C6.86174 22.8973 6.47759 22.655 6.16045 22.3376C5.8433 22.0203 5.6012 21.636 5.4519 21.2129C5.32123 20.8431 5.28507 20.3986 5.2139 19.5096C5.16385 18.6427 4.82266 17.818 4.24557 17.1692C3.6669 16.4914 3.37757 16.1519 3.20723 15.7972C3.01403 15.3924 2.91386 14.9495 2.91406 14.5009C2.91426 14.0524 3.01483 13.6095 3.2084 13.2049C3.37757 12.8502 3.6669 12.5107 4.2444 11.8329C4.85107 11.1201 5.14157 10.4061 5.2139 9.49139C5.28507 8.60356 5.32123 8.15905 5.4519 7.78805C5.60147 7.36507 5.84382 6.98092 6.16116 6.66377C6.47851 6.34663 6.86282 6.10453 7.2859 5.95522C7.65573 5.82456 8.10023 5.78839 8.98923 5.71722C9.85612 5.66717 10.6807 5.32481 11.3296 4.74772Z"
        stroke="#0073C6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 9.25H17.5M10.5 12.491H17.5M15.4583 20.9167L10.5 15.732H12.25C16.1397 15.732 16.1397 9.25 12.25 9.25"
        stroke="#0073C6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
