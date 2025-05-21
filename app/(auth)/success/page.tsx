import React from "react";

export default function Success() {
  return (
    <div className="w-full flex justify-center items-center flex-col mt-5 ">
      <h1 className="text-[#148B16] font-[700] text-[32px] text-center w-[100%] !max-w-[500px] !mb-[1%]">
        Congratulations !
      </h1>
      
      <p className="text-[#666] font-[500] text-[28px] text-center w-[100%] !max-w-[500px] !mb-[6%]">
        Your account for individual has been created successfully
      </p>

      <p className="text-[#767270] font-[500] text-[28px] text-center w-[100%] !max-w-[500px] !mb-[6%]">
        You will redirected to homepage in 5 Sec.
      </p>
    </div>
  );
}
