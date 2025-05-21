import { TringleIcons } from "@/app/images/commonSvgs";
import React from "react";

type Props = {};
const backImg = `${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/market-trends/banner.jpg`

export default function NewsBanner({}: Props) {
  return (
    <div className="relative p-[10px] md:p-[3%] w-full h-[140px] md:h-[160px] lg:h-[200px] flex flex-col justify-start items-start bg-gradient-to-r from-gray-500 to-[#cccccc] overflow-hidden animate-gradient">
      <div
        style={{ backgroundImage: `url(${backImg})` }}
        className={`absolute inset-0  bg-cover bg-center opacity-30`}
      />

      {/* <TringleIcons number={1} className={"w-[60px] h-[60px] md:w-[160px] md:h-[160px] absolute top-[20px] left-[20px] "} /> */}
      <TringleIcons
        number={2}
        className={
          " w-[30px] h-[30px] md:w-[50px] md:h-[50px] absolute bottom-[0px] left-[15%] md:rotate-45 "
        }
      />
      <TringleIcons
        number={3}
        className={
          " w-[40px] h-[40px] md:w-[100px] md:h-[100px] absolute top-[20px] right-[20px] md:top-[50px] md:right-[80px] "
        }
      />
      <TringleIcons
        number={4}
        className={
          " w-[30px] h-[30px] md:w-[80px] md:h-[80px] absolute top-[-10px] left-[30%] md:top-[-20px] md:left-[50%] rotate-45"
        }
      />
      <TringleIcons
        number={5}
        className={
          " w-[20px] h-[20px] md:w-[60px] nd:h-[60px] absolute top-[40px] right-[100px] md:top-[50px] md:right-[200px] "
        }
      />
      <TringleIcons
        number={6}
        className={
          "w-[60px] h-[60px] md:w-[160px] md:h-[160px] absolute top-[20px] left-[40%] rotate-45"
        }
      />

      <div className="relative flex flex-col items-start justify-start h-full ml-0 md:ml-[30px] xl:ml-[40px] ">
        <p className="border-0 py-[4px] px-[6px] md:py-[6px] md:px-[8px] bg-blue-500 text-[10px] md:text-[12px] text-white mr-auto mb-[8px] md:mb-[16px] ">
          Residential
        </p>
        <h2 className="text-[16px] md:text-[22px] xl:text-[28px] text-white leading-[22px] md:leading-[26px] xl:leading-[30px] shadow-[2px 2px 5px rgba(0, 0, 0, 1)] mb-[8px] md:mb-[16px] font-bold ">
          Karnataka Govt. slashes stamp duty for properties priced under Rs 45
          lakh
        </h2>
        <span className="text-[11px] text-[#cccccc] font-semibold">
          Research Analyst
        </span>
        <span className="text-[11px] text-[#cccccc] font-semibold">
          getrightproperty.com
        </span>
      </div>
    </div>
  );
}
