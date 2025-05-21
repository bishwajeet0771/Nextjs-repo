import React from "react";
// import { Checkbox } from "@mantine/core";
import clsx from "clsx";
type Props = {
  issueData: any;
  reportIssuseFun: any;
  reportStatus: number[];
  errorMsg: boolean;
};

export default function ReportOptions({
  issueData,
  reportIssuseFun,
  reportStatus,
  errorMsg,
}: Props) {
  return (
    <div>
      <hr className="bg-blue-300 w-[98%] mb-2 h-[2px]" />
      <p
        className={clsx(
          "text-black-900 font-montserrat text-base  font-semibold leading-normal",
          errorMsg && "text-red-500"
        )}
      >
        {errorMsg ? "Select at Least one CheckBox" : "Select issue from below:"}
      </p>

      <div className="flex flex-row flex-wrap my-[1%] justify-start items-start gap-[1%] w-full ">
        {issueData?.map((x: any) => {
          return (
            <div
              className="flex flex-row  justify-start items-center m-2"
              key={x.cid}
            >
              {/* <Checkbox
                key={x.cid}
                label={x.constDesc}
                color={`${
                  reportStatus.includes == x.cid ? "#0073C6" : "green"
                }`}
                classNames={{
                  label: `text-[13px] leading-normal capitalize font-feature-settings-[clig off]  ${
                    reportStatus.find((item) => item === x.cid)
                      ?
                        "!text-[#0073C6] !font-bold"
                      : "!text-[#242424]"
                  }`,
                }}
                checked={reportStatus.includes(x.cid)}
                onClick={() => reportIssuseFun(x.cid)}
              /> */}
        
              <input 
                name="commonField" 
                id={x.cid} 
                type="checkbox"
                checked={reportStatus.includes(x.cid)}
                onClick={() => reportIssuseFun(x.cid)}
                className=" select-none mr-[6px] "
              />

              <label 
                htmlFor={x.cid}
                className={`text-[13px] leading-normal capitalize font-feature-settings-[clig off] select-none ${
                    reportStatus.find((item) => item === x.cid)
                      ? /*  reportStatus.includes(x.cid) */
                        "!text-[#0073C6] !font-bold"
                      : "!text-[#242424]"
                  }`} 
                style={{ color:`${ reportStatus.includes == x.cid ? "#0073C6" : "green"}` }}
              >
                {x.constDesc}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
