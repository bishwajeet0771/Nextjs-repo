// eslint-disable-next-line import/no-cycle
import { SearchFilterOld } from "@/app/store/search";

const convertToOriginalState = (data: any): SearchFilterOld => {
  const convertedData: SearchFilterOld = {
    current: null,
    locality: [],
    propTypes: null,
    unitTypes: [],
    bathRooms: [],
    parkings: [],
    amenities: [],
    listedBy: null,
    reraVerified: [],
    areaValue: [0, 5000],
    bugdetValue: [500000, 600000000],
    builderIds: [],
    city: null,
    facings: [],
    furnish: null,
    propStatus: null,
    pnb: null,
    cg: null,
    sortByfield: null,
    sortType: null,
    projIdEnc: null,
    lat: null,
    lng: null,
  };

  if (data.unitTypes !== undefined) {
    convertedData.unitTypes = data.unitTypes.split(",").map(Number);
  }
  if (data.localities !== undefined) {
    convertedData.locality = data.localities.split(",");
  }
  if (data.builderIds !== undefined) {
    convertedData.builderIds = data.builderIds.split(",");
  }
  if (data.amenities !== undefined) {
    convertedData.amenities = data.amenities.split(",").map(Number);
  }
  if (data.listedBy !== undefined) {
    convertedData.listedBy = data.listedBy;
  }
  if (data.projIdEnc !== undefined) {
    convertedData.projIdEnc = data.projIdEnc;
  }
  if (data.city !== undefined) {
    convertedData.city = data.city;
  }
  if (data.furnish !== undefined) {
    convertedData.furnish = Number(data.furnish);
  }
  if (data.propStatus !== undefined) {
    convertedData.propStatus = data.propStatus;
  }

  if (data.propTypes !== undefined) {
    convertedData.propTypes = parseInt(data.propTypes);
  }
  if (data.bathRooms !== undefined) {
    convertedData.bathRooms = data.bathRooms.split(",").map(Number);
  }
  if (data.parkings !== undefined) {
    convertedData.parkings = data.parkings.split(",").map(Number);
  }
  if (data.facings !== undefined) {
    convertedData.facings = data.facings.split(",").map(Number);
  }
  if (data.reraIds !== undefined) {
    convertedData.reraVerified = data.reraIds.split(",").map(Number);
  }
  if (data.minArea !== undefined && data.maxArea !== undefined) {
    convertedData.areaValue = [parseInt(data.minArea), parseInt(data.maxArea)];
  }
  if (data.minPrice !== undefined && data.maxPrice !== undefined) {
    convertedData.bugdetValue = [
      parseInt(data.minPrice),
      parseInt(data.maxPrice),
    ];
  }
  if (data.cg !== undefined) {
    convertedData.cg = data.cg;
  }
  if (data.projStatus !== undefined) {
    convertedData.current = parseInt(data.projStatus);
  }
  return convertedData;
};

export { convertToOriginalState };
