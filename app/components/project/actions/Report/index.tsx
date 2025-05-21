import React from "react";
import ReportModal from "./Modal";

type Props = {
  slug:string
};

export default function ReportSection({slug}: Props) {
  return <ReportModal slug={slug} />;
}
