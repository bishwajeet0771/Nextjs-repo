export interface Search {
  projIdEnc: string;
  builderId: number;
  projName: string;
  minPrice: string;
  maxPrice: string;
  launchDate: string;
  possassionDate: string;
  postedDate: string;
  agentListing: number;
  ownerListing: number;
  lat: number;
  lang: number;
  coverUrl: string;
  propTypes?: string[];
  availableFrom: string;
  coverImage: string;
}
