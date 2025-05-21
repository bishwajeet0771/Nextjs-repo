"use client";
import Button from "@/app/components/atoms/buttons/variansts";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
// import { NearByDataAtom } from "@/app/store/nearby";
// import { useSetAtom } from "jotai";
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
  const handleOpen = () => {
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
    <Button className="!text-xl" onClick={handleOpen}>
      Request Callback
    </Button>
  );
}
