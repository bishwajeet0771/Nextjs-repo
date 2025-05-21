import React from "react";
import ReportModal from "./Modal";

type Props = {
  issueData:any
};

export default function ReportSectionProperty({issueData}: Props) {
  return <ReportModal issueData={issueData} />;
}
