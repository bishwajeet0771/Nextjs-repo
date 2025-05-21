/* eslint-disable no-unused-vars */
import React from "react";
// import Button from "@/app/elements/button";
// import { GradientLocation, Phone, ReraIcon } from "@/app/images/commonSvgs";
import { Search } from "@/app/validations/types/search";
// import { formatDateDDMMYYYY } from "@/app/utils/date";
// import Image from "next/image";
// import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
// import { formatCurrency } from "@/app/utils/numbers";
import { useSetAtom } from "jotai";
import selectedSearchAtom from "@/app/store/search/map";
// import { calculatePerSqPrice } from "@/app/utils/price";

type Props = {
  type: any;
} & Search &
  any;

const ProjectDetailsCard = ({ data }: Props) => {
  const {
    projIdEnc,
    type,
    propIdEnc,

    // projName,
    // minPrice,
    // maxPrice,
    // launchDate,
    // possassionDate,
    // agentListing,
    // ownerListing,
    // coverUrl,
    // postedDate,
    // propTypes,
    // lat = 22.176912,
    // lang = 75.66009,
    // availableFrom,
    // coverImage,
    // ca,
    // sba,
    // propName,
    // bhkName,
    // propTypeName,
    // category,
    // localityName,
    // price,
    // propStatus,
    // pa,
    // projstatus,
    // rerastatus,
  } = data;
  const { data: session } = useSession();

  // const [, { open }] = useReqCallPopup();
  const [, { open: openLogin }] = usePopShortList();
  const { toggleShortlist, shortlistedItems, compareItems, toggleCompare } =
    useShortlistAndCompare();
  const reqId = type === "proj" ? projIdEnc : propIdEnc;
  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some((item) => item.id === reqId && item.status === "Y");

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: reqId,
        status: isItemInShortlist ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => console.log("grp"));
    }
  };
  const isItemCompared =
    compareItems.length > 0 &&
    compareItems.some((item) => item.id === reqId && item.status === "Y");
  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: reqId,
        status: isItemCompared ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => console.log("grp"));
    }
  };
  const setSelected = useSetAtom(selectedSearchAtom);

  return <div />;

  // return (
  //   // <div className=" flex w-full mb-[5%] flex-col shadow-md " id={reqId}>
  //   //   <div className=" flex justify-center items-center w-full  ">
  //   //     <div className="w-full h-[120px]  md:h-[140px] md:max-w-[210px] max-w-[120px] bg-gray-300 relative">
  //   //       {type == "proj" && rerastatus === "Applied" && (
  //   //         <p className="text-[#FFF] text-[12px] absolute left-[0px] top-0 z-10 flex justify-center items-center p-[3px] font-[500] bg-gradient-to-r from-[#148B16] /0 to-[#E5F4FF]/100">
  //   //           {" "}
  //   //           <ReraIcon /> RERA
  //   //         </p>
  //   //       )}
  //   //       <Image
  //   //         src={coverUrl ?? coverImage}
  //   //         width={147}
  //   //         height={147}
  //   //         alt="conver"
  //   //         className="w-full h-full"
  //   //       />
  //   //       <p className="text-[#FFF] text-[10px] md:text-[12px] mt-[-40px] absolute left-[4px] gap-[4px] z-10 flex justify-center rounded-[20px] items-center p-[7px] font-[500] rtm">
  //   //         {" "}
  //   //         {type === "proj" ? projstatus : propStatus}
  //   //       </p>
  //   //     </div>
  //   //     <div className="w-full p-[2%] justify-center  flex flex-col">
  //   //       {type == "proj" ? (
  //   //         <p className="text-[#001F35] text-[12px] md:text-[15px] not-italic font-semibold leading-[normal]">
  //   //           {projName}
  //   //         </p>
  //   //       ) : (
  //   //         <p className="text-[#001F35] text-[15px] font-[600]">
  //   //           {bhkName} {propTypeName} for {category} in {localityName},{" "}
  //   //           <span className="text-[#148B16] text-[16px] font-[700]">
  //   //             {" "}
  //   //             {formatCurrency(price)}
  //   //           </span>
  //   //         </p>
  //   //       )}
  //   //       <p className="text-[#768AA9] text-[10px] md:text-[12px] md:text-sm not-italic font-semibold leading-[normal]">
  //   //         {propTypes && propTypes?.length > 0
  //   //           ? propTypes?.join(" ,")
  //   //           : propName}
  //   //       </p>
  //   //       <div className=" flex justify-between items-start w-full ">
  //   //         <div className=" flex justify-start items-start flex-col mt-auto">
  //   //           {type == "proj" && (
  //   //             <p className="text-[#148B16] text-[10px]  md:text-[15px] not-italic font-extrabold leading-[normal]">
  //   //               {formatCurrency(Number(minPrice))} -{" "}
  //   //               {formatCurrency(Number(maxPrice))}
  //   //             </p>
  //   //           )}
  //   //           {type == "proj" && (
  //   //             <p className="text-[#333] text-[10px]  md:text-[13px] font-[500] ">
  //   //               Possession Date:{" "}
  //   //               <span className=" font-[600]">
  //   //                 {formatDateDDMMYYYY(possassionDate)}
  //   //               </span>
  //   //             </p>
  //   //           )}
  //   //           {propTypeName !== "Plot" ? (
  //   //             <>
  //   //               {type != "proj" && (
  //   //                 <p className="text-[#333] text-[10px]  md:text-[13px] font-[500]">
  //   //                   Super Builtup Area:{" "}
  //   //                   <span className=" font-[600]">{sba} sq.ft</span>
  //   //                 </p>
  //   //               )}

  //   //               {type != "proj" && (
  //   //                 <p className="text-[#333] text-[13px] font-[500]">
  //   //                   Carpet Area:{" "}
  //   //                   <span className=" font-[600]"> {ca} sq.ft </span>₹{" "}
  //   //                   {calculatePerSqPrice(price, sba)}/ sqft
  //   //                 </p>
  //   //               )}
  //   //               <p className="text-[#333] text-[10px]  md:text-[13px] font-[500]">
  //   //                 Available From:{" "}
  //   //                 <span className=" font-[600]">
  //   //                   {formatDateDDMMYYYY(launchDate ?? availableFrom)}
  //   //                 </span>
  //   //               </p>
  //   //             </>
  //   //           ) : (
  //   //             <>
  //   //               {type != "proj" && (
  //   //                 <p className="text-[#333] text-[13px] font-[500]">
  //   //                   Plot Area:{" "}
  //   //                   <span className=" font-[600]"> {pa} sq.ft </span>₹{" "}
  //   //                   {calculatePerSqPrice(price, pa)}/ sqft
  //   //                 </p>
  //   //               )}
  //   //               <p className="text-[#333] text-[10px]  md:text-[13px] font-[500]">
  //   //                 Possession Date:{" "}
  //   //                 <span className=" font-[600]">
  //   //                   {formatDateDDMMYYYY(possassionDate)}
  //   //                 </span>
  //   //               </p>
  //   //             </>
  //   //           )}
  //   //         </div>

  //   //         <div className=" flex justify-end items-end flex-col">
  //   //           <button
  //   //             className="inline-flex justify-center items-center gap-1 p-1 md:p-2 border rounded-[21px] border-solid border-[#0094FF] text-[#202020] text-[10px] md:text-[12px] not-italic font-semibold leading-[normal] my-2 md:mb-1 "
  //   //             onClick={() =>
  //   //               setSelected({
  //   //                 agentListing,
  //   //                 ownerListing,
  //   //                 projName,
  //   //                 lat,
  //   //                 lang,
  //   //               })
  //   //             }
  //   //           >
  //   //             View on Map <GradientLocation />
  //   //           </button>

  //   //           <p className="text-[#202020] text-[10px]  md:text-[12px] font-[400]">
  //   //             Posted By:{" "}
  //   //             <span className=" font-[600]">{getTypeText(type)}</span>
  //   //           </p>
  //   //           <p className="text-[#202020] text-[10px]  md:text-[12px] font-[400]">
  //   //             Date:{" "}
  //   //             <span className=" font-[600]">
  //   //               {formatDateDDMMYYYY(postedDate)}
  //   //             </span>
  //   //           </p>
  //   //         </div>
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   //   <div className="flex justify-between items-center p-[1%] w-full">
  //   //     {type == "proj" && (
  //   //       <div>
  //   //         <p className="text-[#0073C6] text-[8px] md:text-xs not-italic font-medium leading-[normal] underline">
  //   //           Agent Listing Available : {agentListing}{" "}
  //   //         </p>
  //   //         <p className="text-[#4D6677] text-[8px] md:text-xs not-italic font-medium leading-[normal] underline">
  //   //           Owner Listing Available : {ownerListing}{" "}
  //   //         </p>
  //   //       </div>
  //   //     )}

  //   //     <div className="flex justify-end items-end p-[1%] gap-[10px] ml-auto ">
  //   //       <Button
  //   //         onChange={() => onAddingShortList()}
  //   //         title={isItemInShortlist ? "Shortlisted" : "Shortlist"}
  //   //         buttonClass="text-[#FF7A00]  text-[10px] md:text-[12px] font-[700] underline"
  //   //       />
  //   //       <Button
  //   //         onChange={() => onAddingCompare()}
  //   //         title={isItemCompared ? "Remove Compare" : " Add to Compare"}
  //   //         buttonClass="text-[#148B16]  text-[10px] md:text-[12px] font-[700] underline"
  //   //       />

  //   //       <Button
  //   //         onChange={() =>
  //   //           open(type === "proj" ? type : "prop", reqId, "projCard")
  //   //         }
  //   //         title="Request Callback"
  //   //         icon={<Phone className="h-[16px] w-[16px] " />}
  //   //         buttonClass="flex justify-center items-center text-[#FFF] p-[2px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[10px] md:text-[12px] font-[700]"
  //   //       />
  //   //     </div>
  //   //   </div>
  //   // </div>
  // );
};

export default ProjectDetailsCard;
// function getTypeText(type: string) {
//   let text;

//   if (type === "proj") {
//     text = "Builder";
//   } else if (type === "I") {
//     text = "Owner";
//   } else if (type === "A") {
//     text = "Agent";
//   } else {
//     text = "Unknown";
//   }

//   return text;
// }
