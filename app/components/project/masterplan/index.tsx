import React, { Suspense } from "react";
import SubHeading from "../headings/SubHeading";
import FullScreenMasterPlanModal from "../_ui/modals/MasterPlanModal";
import DownloadMasterPlanButton from "./DownloadMasterPlanButton";

export default function MasterPlan({
  projName,
  media,
}: {
  projName: string;
  media: string;
}) {
  return (
    <div
      className="w-[95%] sm:max-h-[678px] pb-[14px] xl:max-h-[689px] sm:w-[90%] md:mb-[3%] sm:mb-[5%] scroll-mt-[150px] sm:pt-[30px] "
      id="master-plan"
    >
      <div
        className="flex justify-between w-full items-cente mb-[8px] sm:mb-[32px] flex-wrap  scroll-mt-[170px]"
        id="view-master-plan"
      >
        <div>
          <h2 className=" sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words text-wrap sm:text-nowrap w-[85%]">
            <strong>
              <span className="text-[#001F35]">Master Plan Of</span>{" "}
              <span className="text-green-800">{projName}</span>
            </strong>
          </h2>

          <SubHeading text="Crafting tomorrow's landscapes, today's masterpiece: your vision, our expertise." />
        </div>
        <div
          className="h-full flex justify-center items-center scroll-mt-[160px]"
          id="download-master-plan"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <DownloadMasterPlanButton media={media} />
          </Suspense>
          {/* <button
            className="  items-center justify-center gap-2.5 p-2 md:p-5 rounded-[10px] bg-[#0073C6] text-white md:text-2xl text-[12px] sm:text-[16px] not-italic font-bold leading-[normal] tracking-[0.96px] max-h-[50%] mt-5 md:mt-0 h-[60px]  inline-flex"
            onClick={handleDownload}
          >

            >
              <path
                d="M14 21L6.5 13.5L8.6 11.325L12.5 15.225V3H15.5V15.225L19.4 11.325L21.5 13.5L14 21ZM5 27C4.175 27 3.469 26.7065 2.882 26.1195C2.295 25.5325 2.001 24.826 2 24V19.5H5V24H23V19.5H26V24C26 24.825 25.7065 25.5315 25.1195 26.1195C24.5325 26.7075 23.826 27.001 23 27H5Z"
                fill="white"
              />
            </svg>
            Download Master Plan
          </button> */}
        </div>
      </div>
      <div className="relative">
        <FullScreenMasterPlanModal
          imageUrl={media}
          title={`${projName}`}
          // altText={`Master Plan of ${projName}`}
        />
        {/* <MasterPlanPopup
          url={media}
          onDownload={handleDownload}
          projName={projName}
        /> */}
      </div>
    </div>
  );
}
