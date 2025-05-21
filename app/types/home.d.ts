/* eslint-disable no-unused-vars */
export interface Main {
  projectCount: number;
  project: Project[];
  status: boolean;
}

export interface Project {
  projName: string;
  address: string;
  stateName: StateName;
  cityName: CityName;
  possessionDateNew: string;
  localityName: string;
  pincode: number;
  propTypeList: string;
  projectMediaDTO: ProjectMediaDTO;
}

export enum CityName {
  Banglore = "Banglore",
  Hyderabad = "Hyderabad",
}

export interface ProjectMediaDTO {
  coverUrl: string;
}

export enum StateName {
  AndhraPradesh = "Andhra Pradesh",
  Karnataka = "Karnataka",
}
