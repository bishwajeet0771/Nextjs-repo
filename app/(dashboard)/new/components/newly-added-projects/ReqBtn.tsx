"use client";
import Button from "@/app/components/atoms/buttons/variansts";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import React from "react";

type Props = {
  builderName: string;
  projName: string;
  reqId: string;
  builderId: number;
};

export default function ReqBtn({
  builderName,
  projName,
  reqId,
  builderId,
}: Props) {
  const [, { open }] = useReqCallPopup();
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // e.stopPropagation();
    e.preventDefault();

    open({
      modal_type: "PROJECT_REQ_CALLBACK",
      postedByName: builderName,
      postedId: builderId,
      reqId: reqId,
      source: "projCard",
      title: projName,
    });
  };
  return (
    <Button
      className="!text-[12px] h-[24px] sm:h-auto xl:!text-[14px] !p-[4px] !sm:p-[6px] "
      onClick={handleOpen}
    >
      Request Callback
    </Button>
  );
}
