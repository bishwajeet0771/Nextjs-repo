import { preventBackButton } from "@/app/components/molecules/popups/req";
import Button from "@/app/elements/button";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
// import { NearByDataAtom } from "@/app/store/nearby";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
// import { useSetAtom } from "jotai";
// import { useSearchParams } from "next/navigation";
import React from "react";

// type Props = {
//   a: number;
//   o: number;
//   B: number;
//   type: "proj" | "prop";
//   reqId: string;
// };

export default function CardDownSection({
  a,
  o,
  B,
  type,
  reqId,
  projName,
  builderName,
  bhkName,
  propTypeName,
  // ltName,
  cg,
  builderId,
  // postedById,
  // postedByName,
  postedBy,
  localityName,
  projIdEnc,
}: any) {
  const isMobile = useMediaQuery("(max-width: 601px)");
  // const name =
  //   type === "proj"
  //     ? projName
  //     : `${bhkName ?? ""} ${propTypeName} for
  //   ${cg === "R" ? "Rent" : "Sale"} in ${ltName}`;
  const [, { open }] = useReqCallPopup();
  // const setPopReqData = useSetAtom(NearByDataAtom);

  const handleOpen = () => {
    preventBackButton();
    open({
      modal_type:
        type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
      postedByName: type === "proj" ? builderName : postedBy,
      postedId: builderId,
      reqId: reqId,
      source: type === "proj" ? "projCard" : "propCard",
      title:
        type === "proj"
          ? projName
          : `${bhkName ?? ""} ${propTypeName} for
      ${cg === "R" ? "Rent" : "Sale"} in ${localityName}`,
    });
  };

  return (
    <div className="bg-[#DDF0FD] flex items-start gap-1 xl:gap-auto xl:px-[17px] xl:py-[9px] w-full p-2 justify-between flex-wrap sm:flex-nowrap">
      <div className="flex gap-[9px]">
        {type === "proj" && (
          <>
            <CountListing
              type="Agent"
              value={a}
              projIdEnc={projIdEnc}
              projName={projName}
            />
            <CountListing
              type="Owner"
              value={o}
              projIdEnc={projIdEnc}
              projName={projName}
            />
            <CountListing
              type="Builder"
              value={B}
              projIdEnc={projIdEnc}
              projName={projName}
            />
          </>
        )}
      </div>

      {/* right section */}
      <div className=" right-1">
        <Button
          onChange={handleOpen}
          title={`${
            type === "proj"
              ? isMobile
                ? "Contact"
                : "Request Callback"
              : "Request Callback"
          }`}
          buttonClass="flex justify-end right-1  self-end text-[#FFF] ml-1 p-[3px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] xl:text-[12px] md:text-[12px] font-[700] text-nowrap"
        />
      </div>
    </div>
  );
}
type CountListProps = {
  value: number;
  type: "Agent" | "Owner" | "Builder";
  projIdEnc: string;
  projName: string;
};
const CountListing = ({ type, value, projIdEnc, projName }: CountListProps) => {
  const handleAgentOwner = (type: "A" | "I" | "B") => {
    window.open(
      `/search/listing?sf=projIdEnc=${projIdEnc}-listedBy=${type}-projName=${projName}`,
      "_self"
    );
  };

  return (
    value > 0 && (
      <button
        title={`Click to view ${type} Listing`}
        onClick={() =>
          handleAgentOwner(
            type === "Owner" ? "I" : type === "Builder" ? "B" : "A"
          )
        }
        className={clsx(
          "flex flex-col justify-start  items-start gap-2 p-1 rounded border-[0.4px] border-solid",
          type === "Owner"
            ? "bg-[#FFF6ED] text-[#D66700] border-[#FF7A00]"
            : "bg-[#f0fff0]",
          value > 0
            ? "text-[#148B16] border-[#148B16] cursor-pointer"
            : "text-gray-400 border-[#5e5f5e] opacity-50 cursor-none"
        )}
      >
        <p
          className={`text-[12px] text-nowrap  xl:text-xs not-italic font-bold leading-[normal] ${
            value > 0 ? "underline" : ""
          }`}
        >
          {type} Listing : {value}
        </p>
      </button>
    )
  );
};
