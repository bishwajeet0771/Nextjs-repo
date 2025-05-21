import { isReraverified } from "@/app/utils/dyanamic/projects";
import Image from "next/image";
import React from "react";

type Props = { src: string; rera: string };

export default function LeftSection({ src, rera }: Props) {
  const verified = isReraverified(rera);
  return (
    <div className="relative">
      <Image
        src={src}
        width={304}
        height={214}
        alt="projectCard"
        className="h-[162px] w-full  xl:h-[230px] xl:w-[304px] object-cover"
        quality={100}
      />
      {verified && <Rera />}
    </div>
  );
}

const Rera = () => {
  return (
    <p className="absolute top-0 left-[0.8px]">
      <Image src={"/r.svg"} alt="rera" width={100} height={100} />
    </p>
  );
};
