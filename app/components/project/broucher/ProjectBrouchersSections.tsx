import { memo } from "react";
import BrocherContent from "./BrocherContent";

interface PhaseOverview {
  phaseId: number;
  phaseName: string | null;
  phaseBrochureUrl: string | null;
}

const ProjectBrouchersSection = ({
  projName,
  phaseOverviewData,
  singleBroucher,
  broucherImage,
}: {
  projName: string;
  phaseOverviewData: PhaseOverview[];
  singleBroucher: string;
  broucherImage: string;
}): JSX.Element | null => {
  const isBrocherAvail =
    singleBroucher || phaseOverviewData.some((phase) => phase.phaseBrochureUrl);
  if (!isBrocherAvail) return null;
  return (
    <BrocherContent
      projName={projName}
      phaseOverviewData={phaseOverviewData}
      singleBrocher={singleBroucher}
      broucherImage={broucherImage}
    />
  );
};

export default memo(ProjectBrouchersSection);
