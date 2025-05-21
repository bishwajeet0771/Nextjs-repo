"use client";
import Button from "@/app/elements/button";
import {
  EndDate,
  IdIcon,
  SecurityIcon,
  StartDate,
  TotalLandArea,
} from "@/app/images/commonSvgs";
import ProjBasicDetails from "@/app/components/project/projBasicDetails";
import PropertyTypeDetailsCrad from "@/app/components/project/propertyTypeDetailsCrad";
import React from "react";
import { PhaseList } from "@/app/validations/types/project";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import { isSingleLetterOrNumber } from "@/app/utils/letters";
import { sqftToAcres } from "@/app/utils/landarea";
import { currentPhaseAtom } from "@/app/store/vewfloor";
import { useHydrateAtoms } from "jotai/utils";
import { useAtom } from "jotai";

import NoProperties from "./notfound";
import SubHeading from "./headings/SubHeading";
type Props = {
  data: PhaseList[];
  slug: string;
  projName: string;
  PhaseOverview: any;
  isPartialData: boolean;
  projData: any;
};
const styles = {
  box: "flex flex-col items-start sm:gap-[8px] xl:gap-[10px] p-4 sm:border sm:shadow-[0px_4px_10px_0px_rgba(202,233,255,0.30)] mb-3 rounded-[10px] border-solid border-[#92B2C8] bg-[#fff] xl:mr-[46px] sm:mr-[20px] ",
};

export default function ProjectDetailsP({
  projName,
  PhaseOverview,
  data: phaseList,
  isPartialData,
  slug,
}: Props) {
  useHydrateAtoms([[currentPhaseAtom, PhaseOverview[0].phaseId]], {
    dangerouslyForceHydrate: true,
  });
  const [currentPhase, setFloorPhase] = useAtom(currentPhaseAtom);
  const handlePhaseChange = (phaseId: number) => {
    setFloorPhase(phaseId);
  };
  const selectedPhase = PhaseOverview?.find(
    (phase: any) => phase.phaseId === currentPhase
  );
  const propertyTypeOrder = ["apt", "rowHouse", "villa", "vlmt", "plot"];
  const orderedPropertyTypes =
    selectedPhase &&
    propertyTypeOrder.filter(
      (propertyType) =>
        selectedPhase.propTypeOverview &&
        Object.keys(selectedPhase.propTypeOverview).includes(propertyType)
    );
  const formatter = new Intl.NumberFormat("en-in", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      className="w-[95%] sm:w-[90%] mb-[3%] sm:mb-[0%] scroll-mt-[150px] sm:mt-[50px]"
      id="property-details"
    >
      <h2 className="text-h2 sm:text-[22px] xl:text-[28px] font-bold mb-[12px] break-words  ">
        <strong>
          <span className="text-[#001F35]">Property Details Of </span>
          <span className="text-green-800">{projName}</span>{" "}
        </strong>
      </h2>
      <SubHeading
        text="Know about your dream project and its details; where comfort meets
        luxury, where every details matters"
      />

      <div className=" sm:flex justify-start items-center mt-[2%] mb-[1%]">
        {PhaseOverview && PhaseOverview?.length > 1 && (
          <>
            <p className="text-[14px] lg:text-[24px] font-[500] text-[#333] mr-[20px] ">
              Select one of the phase to see project details
            </p>
            <div className=" flex justify-start items-start flex-wrap gap-[10px] mt-1 sm:mt-0">
              {PhaseOverview?.map((phase: any) => {
                return (
                  <Button
                    key={phase.phaseId}
                    title={
                      isSingleLetterOrNumber(phase.phaseName)
                        ? `Phase: ${phase.phaseName}`
                        : phase.phaseName
                    }
                    onChange={() => handlePhaseChange(phase.phaseId)}
                    buttonClass={` mb-[5px] text-[14px] sm:text-[18px]  xl:text-[20px] bg-[#ECF7FF] p-[8px] xl:px-[8px] capitalize  whitespace-nowrap text-[#000] rounded-[8px] ${
                      currentPhase === phase.phaseId
                        ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                        : " font-[400]"
                    } `}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      {orderedPropertyTypes?.length === 0 && (
        <NoProperties
          phase={
            phaseList?.find((phase: any) => phase.phaseId == currentPhase)
              ?.phaseName as any
          }
          className={"mb-6"}
        />
      )}
      {phaseList?.length > 1 && (
        <div className="flex justify-start items-start flex-wrap w-full">
          {selectedPhase && (
            <>
              <ProjBasicDetails
                Id="rera-start-date"
                key="rera-start-date"
                icon={<EndDate />}
                title="RERA Start Date"
                value={formatDateDDMMYYYY(selectedPhase.launchDate)}
                className={styles.box}
              />
              <ProjBasicDetails
                Id="rera-end-date"
                key="rera-end-date"
                icon={<EndDate />}
                title="RERA End Date"
                value={formatDateDDMMYYYY(selectedPhase.possassionDate)}
                className={styles.box}
              />
              <ProjBasicDetails
                key="possessionDate"
                icon={<StartDate />}
                title="Expected Completion Date"
                value={formatDateDDMMYYYY(selectedPhase.expectedCompletion)}
                className={styles.box}
                Id="possession-date"
              />
              <ProjBasicDetails
                Id="all-unit-types"
                key="landArea"
                icon={<TotalLandArea />}
                title="Land Area"
                value={
                  selectedPhase.landArea
                    ? `${formatter.format(
                        sqftToAcres(selectedPhase.landArea)
                      )} Acres`
                    : null
                }
                className={styles.box}
              />
              <ProjBasicDetails
                key="reraStatus"
                icon={<SecurityIcon />}
                title="RERA STATUS"
                value={
                  selectedPhase.rerastatus === "Not Applied"
                    ? "Upcoming"
                    : selectedPhase.rerastatus
                }
                className={styles.box}
              />

              {selectedPhase.reraId && (
                <ProjBasicDetails
                  key="reraId"
                  icon={<IdIcon />}
                  title={
                    selectedPhase.rerastatus === "Applied"
                      ? "Acknowledgement Number"
                      : "RERA ID"
                  }
                  value={selectedPhase.reraId}
                  className={styles.box}
                />
              )}
              <ProjBasicDetails
                Id="promoter-name"
                key="promoter-name"
                icon={<TotalLandArea />}
                title="Promoter Name"
                value={selectedPhase.phasePromoter}
                className={styles.box}
              />
            </>
          )}
        </div>
      )}

      <div className="flex justify-start items-start sm:gap-[4%] flex-wrap mt-[3%] sm:mt-[1%]">
        {selectedPhase && (
          <>
            {orderedPropertyTypes.map((propertyTypeKey: any) => {
              const enable =
                selectedPhase.propTypeOverview[propertyTypeKey].unitTypes
                  ?.length > 0;

              return (
                enable && (
                  <PropertyTypeDetailsCrad
                    phase={currentPhase}
                    key={propertyTypeKey}
                    cg={selectedPhase.propTypeOverview[propertyTypeKey]}
                    propertyType={propertyTypeKey}
                    isPartialData={isPartialData}
                    slug={slug}
                  />
                )
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
