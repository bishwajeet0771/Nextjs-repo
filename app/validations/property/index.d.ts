export interface Main {
  propIdEnc: string;
  propName: string;
  propTypeName: string;
  projIdEnc: string;
  postedById: number;
  postedByType: string;
  cg: string;
  stateName: string;
  ctName: string;
  ltName: string;
  pinCode: number;
  address: string;
  bhkName: string;
  facingName: string;
  tower: string;
  block: string;
  atFloor: number;
  totalFloor: number;
  unitNumber: string;
  nobt: number;
  nobl: number;
  furnshName: string;
  flooringType: string;
  availablityStatus: string;
  availableFrom: string;
  possassionDate: string;
  ca: string;
  sba: string;
  noocp: number;
  noobp: number;
  noccp: number;
  nocbp: number;
  price: number;
  otherPrice: OtherPrice;
  agrementduration: string;
  noticemonth: string;
  preferedTenent: string;
  isOkWithBrokerContact: number;
  projMedia: ProjMedia;
  amenities: number[];
  phaseName: string;
  otherRooms: string;
  ownershipName: string;
  ageofBuilding: string;
  plotArea: string;
  ga: number;
  ta: string;
  ba: string;
  length: number;
  width: number;
  isCornerPlot: number;
  cunstructionStatus: number;
  cunstructionType: string;
  boundryWallEnclose: string;
  approvedByName: string[];
  usp: string;
  ispetFriendly: number;
  availavleFor: string;
  lat: string;
  lang: string;
  postedByName: string;
  agreementType: string;
  isBasement: "Y" | "N";
  noOfOpenSide: number;
  bhkId: number;
  isUsed: string;
  aptTypeName:string;
  projAuthorityNames: string[];
  isPetFirendly: number;
  foodAllowedType: "Y" | "N"
}
export interface LIstingResponse {
  listing: Main;
  nearByLocations: any;
  totalPrice: any;
}

export interface OtherPrice {
  [key: string]: string;
}

export interface ProjMedia {
  coverImageUrl: string;
  floorPlanUrl: string;
}
