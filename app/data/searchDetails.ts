export const searchDetails = [
  "Search",
  "Project Status",
  "Locality",
  "Property Type",
  "BHK Type",
  "Area (in Sq.ft)",
  "Budget (in Rupees)",
  "No.of.Bathrooms",
  "Amenities",
  "No.of.Parking",
  "RERA Status",
  "Builder",
];
export const ListingSearchDetails = [
  "Search",
  "BHK Type",
  "Property Status",
  "Property Type",
  "Posted By",
  "Locality",
  "Facing",
  "No.of.Bathrooms",
  "Budget (in Rupees)",
  "Area (in Sq.ft)",
  "Photos & Videos",
  "Furnishing",
  "Amenities",
  "No.of.Parking",
  "Used or Not Used"
];
export const convertIntoId = (title: string) => {
  return title.replace(/\s+/g, "-").toLowerCase();
};
