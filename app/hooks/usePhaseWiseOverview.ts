"use client";
import { currentPhaseAtom } from "../store/vewfloor";
import { useAtom } from "jotai";

export default function usePhaseWiseOverview(PhaseOverview: any) {
  const [currentPhase, setFloorPhase] = useAtom(currentPhaseAtom);
  const handlePhaseChange = (phaseId: number) => {
    setFloorPhase(phaseId);
  };
  const phaseList = PhaseOverview?.map((phase: any) => {
    return {
      phaseId: phase.phaseId,
      phaseName: phase.phaseName,
    };
  });
  const hasReraStatus =
    PhaseOverview &&
    PhaseOverview.some(
      (phase: any) =>
        phase.rerastatus === "Recieved" || phase.rerastatus === "Applied"
    );
  return {
    phaseList,
    PhaseOverview,
    handlePhaseChange,
    currentPhase,
    setCurrentPhase: setFloorPhase,
    hasReraStatus,
  };
}
