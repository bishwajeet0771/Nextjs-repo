import Image from "next/image";
import React from "react";

type Props = {};

export default function Cards({}: Props) {
  return (
    <div className="flex flex-col justify-center items-start gap-2.5 rounded border shadow-[0px_4px_26px_0px_rgba(194,194,194,0.41)_inset,0px_4px_10px_0px_rgba(194,194,194,0.25)] p-3 border-solid border-[#C5C2DD] bg-white">
      <div>
        <Image
          src={"/home/card.jpg"}
          width={500}
          height={500}
          alt=""
          className="w-[100px] h-[100px]"
        />
      </div>
      <div>
        <p className="text-[#00223A] text-xl not-italic font-medium  tracking-[0.4px]">
          Best in
        </p>
        <p className="text-[#242424] text-xl not-italic font-bold">
          Property Listing
        </p>
      </div>
    </div>
  );
}
