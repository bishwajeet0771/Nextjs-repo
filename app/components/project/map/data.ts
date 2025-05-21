import {
  AtmIcon,
  BankIcon,
  BusIcon,
  ClinikIcon,
  CommuteIcon,
  HospitalIcon,
  MallIcon,
  MarketIcon,
  PostOfficeIcon,
  RestaurentIcon,
  SchoolIcon,
  TrainIcon,
  // nearbyLocationIcon,
} from "@/app/images/commonSvgs";
import { MdLocalAirport, MdTrain } from "react-icons/md";
export interface Area {
  name: string;
  Icon?: any;
  lat?: number;
  lng?: number;
  projName?: string;
  key?: string;
  type?: "proj" | "prop";
}
export const areas: Area[] = [
  {
    name: "Commute",
    Icon: CommuteIcon,
    key: "transit_station",
  },
  {
    name: "Train",
    Icon: TrainIcon,
    key: "train_station",
  },
  {
    name: "Bus",
    Icon: BusIcon,
    key: "bus_station",
  },

  {
    name: "Hospital",
    Icon: HospitalIcon,
    key: "hospital",
  },

  {
    name: "School",
    Icon: SchoolIcon,
    key: "school",
  },

  {
    name: "Market",
    Icon: MarketIcon,
    key: "supermarket",
  },

  {
    name: "Restaurant",
    Icon: RestaurentIcon,
    key: "restaurant",
  },
  {
    name: "Restaurant",
    Icon: RestaurentIcon,
    key: "food",
  },

  {
    name: "Bank",
    Icon: BankIcon,
    key: "bank",
  },

  {
    name: "Clinic",
    Icon: ClinikIcon,
    key: "clinic",
  },

  {
    name: "ATM",
    Icon: AtmIcon,
    key: "atm",
  },

  {
    name: "Post Office",
    Icon: PostOfficeIcon,
    key: "post_office",
  },

  {
    name: "Mall",
    Icon: MallIcon,
    key: "shopping_mall",
  },
  {
    name: "Airport",
    Icon: MdLocalAirport,
    key: "airport",
  },
  {
    name: "Metro",
    Icon: MdTrain,
    key: "subway_station",
  },
];
export const areasMap = areas.reduce((map, area) => {
  map.set(area.key, { name: area.name, Icon: area.Icon });
  return map;
}, new Map());
