import { homeSearchFiltersAtom } from "@/app/store/home";
import { useAtomValue } from "jotai";
import React from "react";

type Props = {};

export default function Alert({}: Props) {
  const state = useAtomValue(homeSearchFiltersAtom)
  return (
    <div className="absolute top-5 right-5 z-20">
      <div className="sm:inline-flex text-[12px] sm:text-base justify-center items-center gap-2.5 rounded text-[#242424] not-italic font-medium leading-[normal] p-1.5 sm:p-2.5 bg-[#ffefd7]">
        <p>Showcasing Exclusive Projects and Listings from {state?.city?.split("+")[0] || 'Loading...'} </p>
      </div>
    </div>
  
   /*   <div className="absolute top-5 right-5 ">
     <div className="sm:inline-flex text-[12px] sm:text-base justify-center items-center gap-2.5 rounded text-[#242424]  not-italic font-medium leading-[normal] p-1.5 sm:p-2.5 bg-[#ffefd7] ">
       <p>Showcasing Exclusive Projects and Listings from {state?.city?.split("+")[0]} </p>
     </div>
   </div> */
  );
}
