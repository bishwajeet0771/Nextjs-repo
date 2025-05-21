import React from "react";

export default function PersonalizedProperties() {
  return (
    <div className=" w-full max-w-full  mx-auto pb-32">
      <div className=" justify-center items-center gap-3 flex flex-col pt-[6%]">
        <div className="text-[#202020] text-4xl not-italic font-semibold leading-[130%] tracking-[1.44px]">
          Personalised Property
        </div>
        <div className="text-[color:var(--Blue-grey,#A3AED0)] text-2xl not-italic font-normal leading-[130%] tracking-[0.96px]">
          Experience modern living at its finest!
        </div>
      </div>
      {/* Grids */}
      <div className="max-w-[1500px] m-auto">{/* <HomeCarousel /> */}</div>
    </div>
  );
}
