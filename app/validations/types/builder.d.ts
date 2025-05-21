export interface Main {
  data: Data;
  message: string;
  status: boolean;
}

export interface Data {
  logo: string | null;
  companyName: string;
  builderAddress: string;
  mission: string;
  vision: string;
  ceoName: string;
  founderName: string;
  citiesName: string[];
  officecontact: string;
  companyStartDate: string;
  otherBuilder: OtherBuilder[];
  builderProjects: BuilderProject[];
  newProject: number;
  onGoingProject: number;
  completedProject: number;
  email: string;
  mobile: number;
  logoUrl: string | null;
  shortListed: "Y" | "N";
  stateName: string;
  cityName: string;
  pinCode: string;
  mdname: string;
  userName: string;
  localityName: string;
  builderCity: string;
  projectAvailableCities: {
    [key: string]: string;
  };
  id: string;
}

export interface BuilderProject {
  projectName: string;
  projIdEnc: string;
  minPrice: number;
  maxPrice: number;
  startDate: string;
  endDate: string;
  localityName: string;
  cityName: string;
  pinCode: number;
  availableProperties: string[];
}

export interface OtherBuilder {
  name: string;
  logo: string;
}
