// import { Bathrooms } from "@/app/images/commonSvgs";
// import { title } from "process";

export const SEARCH_FILTER_DATA = {
  projectstatus: [
    {
      cid: 106,
      constDesc: "On Going",
      Label: "Under Construction",
    },
    {
      cid: 107,
      constDesc: "Completed",
      Label: "Ready to Move",
    },
    {
      cid: 108,
      constDesc: "New Launch",
      Label: "New Launch / Upcoming",
    },
  ],
  listingStatus: [
    {
      cid: "U",
      constDesc: "On Going",
      Label: "Under Construction",
    },
    {
      cid: "R",
      constDesc: "Completed",
      Label: "Ready to Move",
    },
  ],
  bhkDetails: [
    { title: "1 RK", value: 40 },
    { title: "1 BHK", value: 41 },
    { title: "1.5 BHK", value: 42 },
    { title: "2 BHK", value: 43 },
    { title: "2.5 BHK", value: 44 },
    { title: "3 BHK", value: 45 },
    { title: "3 BHK + Servant", value: 46 },
    { title: "3.5 BHK", value: 47 },
    { title: "3.5 BHK + Servant", value: 48 },
    { title: "4 BHK", value: 49 },
    { title: "4 BHK + Servant", value: 680 },
    { title: "4.5 BHK", value: 681 },
    { title: "4.5 BHK + Servant", value: 682 },
    { title: "5 BHK", value: 683 },
    { title: "5 BHK + Servant", value: 684 },
    { title: "5.5 BHK", value: 685 },
    { title: "5.5 BHK + Servant", value: 686 },
    // { title: "5+ BHK", value: 688 },
    // { title: "6 BHK", value: 689 },
    { title: "6+ BHK", value: 690 },
  ],
  rerastatus: [
    {
      cid: 101,
      constDesc: "Recieved",
      constGroup: "rerastatus",
      constType: "CON",
      constParentGroup: "rerastatus",
      parentGroupId: 100,
      seq: 1,
    },
    {
      cid: 102,
      constDesc: "Applied",
      constGroup: "rerastatus",
      constType: "CON",
      constParentGroup: "rerastatus",
      parentGroupId: 100,
      seq: 2,
    },
    {
      cid: 103,
      constDesc: "Not Applied",
      constGroup: "rerastatus",
      constType: "CON",
      constParentGroup: "rerastatus",
      parentGroupId: 100,
      seq: 3,
    },
    {
      cid: 104,
      constDesc: "Ready To Move /  Not Applicable",
      constGroup: "rerastatus",
      constType: "CON",
      constParentGroup: "rerastatus",
      parentGroupId: 100,
      seq: 4,
    },
  ],
  listedBy: [
    {
      cid: 1,
      constDesc: "Owner",
      constGroup: "listedBy",
      constType: "IN",
      constParentGroup: "listedBy",
      parentGroupId: 100,
      seq: 1,
      value: "I",
    },
    {
      cid: 2,
      constDesc: "Builder",
      constGroup: "listedBy",
      constType: "CON",
      constParentGroup: "listedBy",
      parentGroupId: 100,
      seq: 2,
      value: "B",
    },
    {
      cid: 3,
      constDesc: "Agent",
      constGroup: "listedBy",
      constType: "CON",
      constParentGroup: "listedBy",
      parentGroupId: 100,
      seq: 3,
      value: "A",
    },
  ],
  amenities: [
    {
      cid: 324,
      constDesc: "Borewell",
      constGroup: "Overlooking",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 54,
    },
    {
      cid: 327,
      constDesc: "Park",
      constGroup: "Overlooking",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 57,
    },
    {
      cid: 307,
      constDesc: "Wifi",
      constGroup: "Property Features",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 37,
    },
    {
      cid: 310,
      constDesc: "Piped Gas",
      constGroup: "Property Features",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 40,
    },
    {
      cid: 292,
      constDesc: "Visitors Parking Area",
      constGroup: "Parking",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 22,
    },
    {
      cid: 238,
      constDesc: "Swimming Pool",
      constGroup: "Infrastructure & Recreational Facilities",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 6,
    },
    {
      cid: 227,
      constDesc: "Kids Play Area",
      constGroup: "Infrastructure & Recreational Facilities",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 6,
    },
    {
      cid: 340,
      constDesc: "Close To School",
      constGroup: "Location Advantages",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 70,
    },
    {
      cid: 289,
      constDesc: "CCTV Cameras",
      constGroup: "Security",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 19,
    },
    {
      cid: 290,
      constDesc: "power backup",
      constGroup: "Security",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 20,
    },
    {
      cid: 322,
      constDesc: "Security Guard",
      constGroup: "Apartment Apartment",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 52,
    },
    {
      cid: 319,
      constDesc: "Gym",
      constGroup: "Apartment Features",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 49,
    },
    {
      cid: 321,
      constDesc: "Club House",
      constGroup: "Apartment Features",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 51,
    },
    {
      cid: 295,
      constDesc: "Elevators/Lifts",
      constGroup: "Amenities",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 25,
    },
    {
      cid: 302,
      constDesc: "Intercom Facility",
      constGroup: "Amenities",
      constType: "CON",
      constParentGroup: "projamenity",
      parentGroupId: 200,
      seq: 32,
    },
  ],
  categoryDataProject: [
    {
      label: "Projects",
      value: "proj",
    },
    {
      label: "Owner Listings",
      value: "I",
    },
    {
      label: "Agent Listings",
      value: "A",
    },
    {
      label: "Builder Listings",
      value: "B",
    },
    {
      label: "All",
      value: "ALL",
    },
  ],
  categoryDataListing: [
    {
      label: "Builder Listings",
      value: "B",
    },
    {
      label: "Owner Listings",
      value: "I",
    },
    {
      label: "Agent Listings",
      value: "A",
    },
    {
      label: "All",
      value: "All",
    },
  ],

  facing: [
    {
      cid: 61,
      constDesc: "East",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 1,
    },
    {
      cid: 62,
      constDesc: "West",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 2,
    },
    {
      cid: 63,
      constDesc: "North",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 3,
    },
    {
      cid: 64,
      constDesc: "South",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 4,
    },
    {
      cid: 65,
      constDesc: "North East",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 5,
    },
    {
      cid: 66,
      constDesc: "South East",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 6,
    },
    {
      cid: 67,
      constDesc: "North West",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 7,
    },
    {
      cid: 68,
      constDesc: "South West",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 8,
    },
    {
      cid: 69,
      constDesc: "Don't Know",
      constGroup: "facing",
      constType: "CON",
      constParentGroup: "facing",
      parentGroupId: 60,
      seq: 9,
    },
  ],
  furnish: [
    {
      cid: 51,
      constDesc: "Fully Furnished",
      constGroup: "furnish",
      constType: "CON",
      parentGroupId: 40,
      seq: 1,
    },
    {
      cid: 52,
      constDesc: "Semi Furnished",
      constGroup: "furnish",
      constType: "CON",
      parentGroupId: 40,
      seq: 2,
    },
    {
      cid: 53,
      constDesc: "Un Furnished",
      constGroup: "furnish",
      constType: "CON",
      parentGroupId: 40,
      seq: 3,
    },
  ],
  photoAvail: [
    {
      value: 3,
      title: "Both",
    },
    {
      value: 1,
      title: "Photo Available",
    },
    {
      value: 2,
      title: "Video Available",
    },
  ],
  /* 
  used: [
    {
      id: 1241,
      label: "Used",
    },
    {
      id: 2122,
      label: "Un-Used",
    },
  ], */

  Bathrooms: [
    { title: "1 Bath", value: 1 },
    { title: "2 Bath", value: 2 },
    { title: "3 Bath", value: 3 },
    { title: "4 Bath", value: 4 },
    { title: "5 Bath", value: 5 },
    { title: "5+ Bath", value: 6 },
    /*     {title: "6", value: 6 },
    {title: "6+", value: "1,7" }, */
  ],
  Parkings: [
    { title: "1", value: 1 },
    { title: "2", value: 2 },
    { title: "3", value: 3 },
    { title: "4", value: 4 },
    { title: "5", value: 5 },
    { title: "6+", value: "1,7" },
    /*     {title: "6", value: 6 },
    {title: "6+", value: "1,7" }, */
  ],
  UsedorNotUsed: [
    { title: "Used", value: "Y" },
    { title: "Un-Used", value: "N" },
  ],
  PostedBy: [
    { title: "Owner", value: "I" },
    { title: "Agent", value: "A" },
    { title: "Builder", value: "B" },
  ],
};
type SearchFilterItem = {
  cid?: number | string;
  value?: number | string;
  Label?: string;
  constDesc?: string;
  title?: string;
  label?: string;
};

type SearchFilterData = Record<string, SearchFilterItem[]>;

const createCombinedMap = (
  data: SearchFilterData
): Map<string | number, string> => {
  const combinedMap = new Map<string | number, string>([
    [35, "Apartment"],
    [33, "Row House"],
    [31, "Villa"],
    [34, "Villament"],
    [32, "Plot"],
    [36, "Independent"],
    ["ALL", "All Listings"],
  ]);

  Object.keys(data).forEach((category) => {
    data[category].forEach((item) => {
      const key = item.cid ?? item.value; // Use `cid` or `value` as the key
      const value = item.Label ?? item.constDesc ?? item.title ?? item.label; // Use the most relevant value
      if (key !== undefined && value !== undefined) {
        combinedMap.set(key, value);
      }
    });
  });

  return combinedMap;
};

// Create the combined map
export const SelectedFiltersMap = createCombinedMap(SEARCH_FILTER_DATA);
