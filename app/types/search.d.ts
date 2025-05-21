export interface SearchFilter {
  current: number | null;
  localities: string[];
  propType: number | null;
  bhk: number[];
  bathroom: number[];
  parking: number[];
  amenities: number[];
  listedBy?: null | string;
  reraVerified: number[];
  areaValue: [number, number];
  bugdetValue: [number, number];
  builderIds: string[];
  city: string | null;
  facing: number[];
  furnish: number | null;
  propStatus: string | null;
  projStatus: string | number | null;
  pnb: number | null;
  sortByfield: string | null;
  sortType: number | null;
  cg?: string | null;
  projIdEnc: string | null;
  lat: number | null;
  lng: number | null;
  projName?: string | null;
  isUsed? :string | null;
  phaseId?:number[];
}
