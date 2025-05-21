import React from "react";

import {
  TotalLandArea,
  callIconSvg,
  // completedProjIconSvg,
  emailIconSvg,
  lacationIconSvg,
  // newLaunchProjIconSvg,
  // onGoingProjIconSvg,
} from "@/app/images/commonSvgs";
import { Data } from "@/app/validations/types/builder";
import Card from "./management-section/BuilderPageManagementCard";
import BuilderProjectsCount from "../common/BuilderProjectsCount";
import About from "@/app/components/project/about";

// type Props = {};

export default function BuilderPageAboutProjectDetailsAndAddress({
  mission,
  builderAddress,
  officecontact,
  email,
  stateName,
  cityName,
  pinCode,
  userName,
  citiesName,
  // localityName,
  // mobile,
  // companyName,
  // newProject,
  // onGoingProject,
  // completedProject,
  // builderProjects,
  id,
}: Data) {
  return (
    <React.Fragment>
      <BuilderProjectsCount builderName={userName} id={id} />
      <About
        id="whyBuy"
        heading="About Builder"
        projName={userName}
        content={mission}
        className="!mb-[14px] sm:!mb-[40px] !mt-[0px] !ml-0 sm:w-full"
        maxLines={7}
      />
      <div
        className="flex w-full flex-col justify-center items-start gap-3.5 sm:gap-8 border border-[color:var(--blue-stroke,#4D6677)] shadow-[0px_4px_31.5px_0px_rgba(91,143,182,0.19)] p-4 sm:p-8 rounded-[7px] border-solid bg-[#FCFCFC] mb-5 sm:mb-[40px] xl:mb-[80px]
  "
      >
        <div className="flex flex-row sm:flex-row gap-3.5 xl:justify-center xl:items-center sm:gap-10 xl:gap-16 flex-wrap ">
          <Card
            Icon={emailIconSvg}
            title="Email"
            content={email}
            type="email"
          />
          <Card
            Icon={callIconSvg}
            title="Contact"
            content={`${officecontact}`}
            type="mobile"
          />

          <Card
            Icon={<TotalLandArea className="!w-[18px] !h-[18px]" />}
            title="State"
            content={stateName}
            type="text"
          />
          <Card
            Icon={<TotalLandArea className="!w-[18px] !h-[18px]" />}
            title="City"
            content={cityName}
            type="text"
          />

          <Card
            Icon={<TotalLandArea className="!w-[18px] !h-[18px]" />}
            title="PIN Code"
            content={pinCode}
            type="text"
          />
        </div>

        <Card
          Icon={lacationIconSvg}
          title="Address"
          content={`${builderAddress}`}
          type="text"
        />
        <Card
          Icon={lacationIconSvg}
          title="Operating Cities"
          content={citiesName && citiesName.join(", ")}
          type="text"
          textClassName="capitalize"
        />
      </div>
      {/* <ProjectDrawer /> */}
    </React.Fragment>
  );
}
