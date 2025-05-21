import { overviewAtom } from "@/app/store/overview";
import { useSetAtom } from "jotai";
import React from "react";

export default function ShowUnitsButton({ cg }: any) {
  const setData = useSetAtom(overviewAtom);
  const handleShowUnits = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setData(cg);
  };
  return (
    <button
      className="text-[#0073C6] text-right text-[12px] sm:text-base font-semibold leading-[normal] underline "
      onClick={handleShowUnits}
    >
      Show all
    </button>
  );
}
