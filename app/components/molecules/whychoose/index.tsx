import React from "react";
import Features from "./features";
const WhyCHoose = () => {
  return (
    <div className="flex justify-center lg:items-start items-center md:items-center flex-col lg:gap-[37px] gap-[0px] md:gap-[0px] w-[100%] h-auto md:h-screen p-[5%]">
      <p className="font-normal text-[28px] sm:text-2xl md:text-[36px] text-center lg:text-[64px] lg:text-start w-[100%] md:w-[100%]">
        <span className="text-[#1f1f1f]">Why Choose</span>
        <span className=" font-bold text-[#138b16]"> Get Right Property?</span>
      </p>

      <div className=" w-[100%] flex justify-between items-center lg:flex-row flex-col md:flex-col">
        <div className="flex items-center w-[100%] lg:w-[38%] md:w-[100%] ">
          <p className="relative [font-family:'Montserrat-Medium',Helvetica] font-normal lg:text-[32px] md:text-[24px] text-[24px] text-center md:text-center lg:text-start">
            <span className="font-medium text-[#767270] leading-[45.1px]">
              Choose us for real estate because we offer expert guidance, a vast
              property selection and commitment to your dreams.
            </span>
            <br />
            <br />
            <span className="[font-family:'Montserrat-SemiBold',Helvetica] font-semibold text-[#767270]">
              Trust in our experience to find your perfect home!
            </span>
          </p>
        </div>
        <div className="relative lg:w-[50%]  w-[100%] flex justify-between items-center mt-[32px] md:mt-[32px]">
          <div className="min-w-[800px] md:w-[100%] flex justify-between items-center overflow-x-scroll scrollbar-hide md:overflow-hidden">
            <Features />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyCHoose;
