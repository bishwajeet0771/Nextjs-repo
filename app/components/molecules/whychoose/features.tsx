import { data } from "@/app/data/whychoose";
import Image from "next/image";
import React from "react";

export default function Features() {
  return data.map((item, index) => (
    <Card key={"Features" + item.name} index={index} {...item} />
  ));
}
type Props = {
  src: string;
  name: string;
  desc: string;
  index: number;
};

export function Card({ src, desc, name, index }: Props) {
  return (
    <div
      className={`relative h-[400px] flex justify-center items-center w-[30%] box-border`}
    >
      <div
        className={`group w-[287px] pt-[53px] pb-[50px] bg-[100%_100%] box-border shadow-2xl rounded-[30px] transition-all duration-200 hover:w-[310px] `}
      >
        <div className={`flex flex-col justify-center items-center gap-[32px]`}>
          <div className="inline-flex flex-col items-center justify-center gap-[14px] relative flex-[0_0_auto]">
            <Image
              className="relative w-[158.68px] transition-all duration-200 h-[143.48px] group-hover:w-[163.68px] group-hover:h-[153.48px]"
              alt="Group"
              src={src}
              width={158.68}
              height={143.48}
            />
            <div className="relative w-[140.85px] h-[13.01px] bg-[#cbd4e138] rounded-[70.42px/6.51px] blur-[4.1px]" />
          </div>
          <p
            className={`relative [font-family:'Montserrat-Medium',Helvetica] font-normal text-transparent text-[24px] text-center tracking-[0.96px] leading-[31.2px] mt-[${
              index === 1 ? "30px" : ""
            }]`}
          >
            <span className="font-medium text-[#666666]">
              {name}
              <br />
            </span>
            <span className="[font-family:'Montserrat-Bold',Helvetica] font-bold text-[#0072c5]">
              {desc}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
