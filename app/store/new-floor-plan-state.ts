import { atom } from "jotai";

// Phase-related atoms
export const currentPhaseAtom = atom<string>("");

// Property type atom
export const selectedPropertyTypeAtom = atom<string>("apartment");

// Modal state atom for floor plans
export const modalStateAtom = atom<{
  isOpen: boolean;
  unit: any;
  type: 'floorplan' | "overview"
  isPartialUnit?: boolean
}>({
  isOpen: false,
  unit: null,
  type: "floorplan",
  isPartialUnit: false
});

// Unit filter atoms
export const unitFiltersAtom = atom({
  unitNumber: "",
  bhkName: "",
  towerName: "",
  floor: "",
  facingName: "",
  block: "",
  plotArea: "",
  length: "",
  width: "",
});

// Selected floor atom
export const selectedFloorAtom = atom<any>({});

// Fullscreen modal state
export const fullScreenModalStateAtom = atom<{
  isOpen: boolean;
  unit: any;
}>({
  isOpen: false,
  unit: null,
});
