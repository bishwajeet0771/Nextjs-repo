export interface MERGERPROJECT {
  basicData: Main;
  nearByLocations: any;
  phaseOverview: any;
}
export interface Main {
  projectName: string;
  projIdEnc: string;
  builderId: number;
  projectStatus: string;
  postedBy: string;
  minPrice: number;
  maxPrice: number;
  basePrice: number;
  totalLandArea: string;
  totalUnit: number;
  startDate: string;
  endDate: string;
  lat: string;
  lang: string;
  address: string;
  localityName: string;
  cityName: string;
  stateName: string;
  pinCode: number;
  media: Media;
  availableProperties: string[];
  phaseList: PhaseList[];
  amenityList: AmenityList[];
  specificationList: SpecificationList[];
  highlights: string[];
  wbtp: string;
  faqs: FAQ[];
  about: string;
  banks: Bank[];
  floorPlanCount: number;
  saleListing: string;
  rentListing: string;
  state: string;
  companyName: string;
  postedByName: string;
  reraStatus: boolean;
  phases: any;
  partialUnitData: any;
  nearByLocations: {[key:string]:any};
  projAuthorityId?:string
  projAuthorityNames?:string[]
  sourceBuilderUrl?:string
}

export interface AmenityList {
  name: string;
  id: number;
}

export interface Bank {
  bankid: number;
  constDesc: string;
  bankName: string;
}

export interface FAQ {
  qnaId: null;
  faqQuestion: string;
  faqAnswer: string;
}

export interface Media {
  coverUrl: string;
  projReviewVideoUrl: string;
  projectVideoIUrl: string;
  otherImgUrl: string[];
  coverImageUrl: string;
  projectPlanUrl: string;
  walkThrowVideoUrl: string;
  projBroucherUrl: string;
  projName?: string;
  videoUrl?: string;
  media: any;
  type?: "proj" | "prop";
  newTitle?:string;
}

export interface PhaseList {
  phaseId: number;
  phaseName: string;
  slug: string;
}

export interface SpecificationList {
  specId: number;
  specName: string;
  values: string[];
}
