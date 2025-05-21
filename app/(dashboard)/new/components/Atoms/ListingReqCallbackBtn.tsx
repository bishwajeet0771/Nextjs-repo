import Button from "@/app/components/atoms/buttons/variansts";
import { preventBackButton } from "@/app/components/molecules/popups/req";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { CallIcon } from "@/app/images/commongsSvgs2";
import React from "react";

type Props = {
  builderName: string;
  projName: string;
  reqId: string;
  builderId: number;
};

export default function ListingReqBtn({
  builderName,
  projName,
  reqId,
  builderId,
}: Props) {
  const [, { open }] = useReqCallPopup();
  const handleOpen = (e: any) => {
    e.preventDefault();
    preventBackButton();
    open({
      modal_type: "PROPERTY_REQ_CALLBACK",
      postedByName: builderName,
      postedId: builderId,
      reqId: reqId,
      source: "propCard",
      title: projName,
    });
  };

  return (
    <>
      <Button
        className="flex justify-center right-1  items-center text-[#FFF] ml-1 p-[3px] md:p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] xl:text-[12px] md:text-[12px] font-[700] text-nowrap sm:hidden max-h-[25px] mt-[12px] mb-[6px] pr-1" /* z-[1000] */
        onClick={handleOpen}
      >
        <CallIcon className="w-[16px] h-[16px]" />
        Contact
      </Button>
      <Button
        className="hidden sm:inline-flex justify-center mt-2 items-center gap-2.5 rounded border p-1 xl:p-2 border-solid border-[#0073C6] bg-[#0073c6] text-white text-[12px] xl:text-sm not-italic font-bold leading-[normal]  max-h-[38px] capitalize mt-[12px] mb-[6px] " /* z-[1000] */
        onClick={handleOpen}
      >
        Request Callback
      </Button>
    </>
  );
}
