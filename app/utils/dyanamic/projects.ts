import { projectprops } from "@/app/data/projectDetails";

export function setPropertyValues(data: any, propCgId: number): any {
  let updatedValues: any = {
    ...(data?.facingName !== "Don't Know" && { facingName: data?.facingName }),
    bhkName: data?.bhkName,
    towerName: data?.towerName,
    unitNumber: data?.unitNumber,
    superBuildUparea: data?.superBuildUparea,
    caretarea: data?.caretarea,
    floor: data?.floor?.toString(),
    ...(data?.parkingType !== "None" && { parkingType: data?.parkingType }),
    noOfCarParking: data?.noOfCarParking?.toString(),
    ...(data?.totalNumberOfBalcony > 0 && {
      totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
    }),
    totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
    ...(data?.block && { block: data?.block }),
    ...(data?.aptTypeName && { aptTypeName: data.aptTypeName }),
  };

  switch (propCgId) {
    case projectprops.apartment:
      break;

    case projectprops.villament:
      return {
        towerName: data?.towerName,
        unitNumber: data?.unitNumber,
        bhkName: data?.bhkName,
        floor: data?.floor?.toString(),
        facingName: data?.facingName,
        superBuildUparea: data?.superBuildUparea,
        ...(data?.caretarea && { caretarea: data?.caretarea }),
        ...(data.gardenArea && { gardenArea: data?.gardenArea }),
        ...(data?.parkingArea != "None" &&
          data?.parkingArea && { parkingArea: data?.parkingArea }),
        ...(data?.terraceArea &&
          data?.terraceArea !== "null" && { terraceArea: data?.terraceArea }),
        ...(data?.noOfCarParking > 0 && {
          noOfCarParking: data?.noOfCarParking?.toString(),
        }),
        ...(data?.totalNumberOfBalcony > 0 && {
          totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        }),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        ...(data?.totalBalconySize && {
          totalBalconySize: data?.totalBalconySize?.toString(),
        }),
        ...(data.aptTypeName && { aptTypeName: data.aptTypeName }),
      };

    case projectprops.rowHouse:
      return {
        ...(data.facingName !== "Don't Know" && {
          facingName: data?.facingName,
        }),
        bhkName: data?.bhkName,
        unitNumber: data?.unitNumber,
        superBuildUparea: data?.superBuildUparea,
        caretarea: data?.caretarea,
        floor: data?.floor?.toString(),
        noOfCarParking: data?.noOfCarParking?.toString(),
        ...(data?.totalNumberOfBalcony > 0 && {
          totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        }),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        ...(data?.gardenArea && { gardenArea: data?.gardenArea }),
        parkingArea: data?.parkingArea,
        ...(data?.terraceArea &&
          data?.terraceArea !== "null" && { terraceArea: data?.terraceArea }),
        ...(data?.plotArea && { plotArea: data?.plotArea.toString() }),
        ...(data?.parkingArea != "None" &&
          data?.parkingArea && { parkingArea: data?.parkingArea }),
      };
    case projectprops.villa:
      return {
        ...(data.facingName !== "Don't Know" && {
          facingName: data?.facingName,
        }),
        bhkName: data?.bhkName,
        unitNumber: data?.unitNumber,
        superBuildUparea: data?.superBuildUparea,
        caretarea: data?.caretarea,
        floor: data?.floor?.toString(),
        noOfCarParking: data?.noOfCarParking?.toString(),
        ...(data?.totalNumberOfBalcony > 0 && {
          totalNumberOfBalcony: data?.totalNumberOfBalcony?.toString(),
        }),
        totalNumberofBathroom: data?.totalNumberofBathroom?.toString(),
        ...(data?.gardenArea && { gardenArea: data?.gardenArea }),
        ...(data?.parkingArea != "None" &&
          data?.parkingArea && {
            parkingArea: data?.parkingArea,
          }),
        ...(data?.terraceArea &&
          data?.terraceArea !== "null" && { terraceArea: data?.terraceArea }),
        ...(data?.plotArea && { plotArea: data?.plotArea.toString() }),
      };
    case projectprops.plot:
      return {
        unitNumber: data?.unitNumber,
        facingName: data.facingName,
        plotArea: data?.plotArea?.toString(),
        width: data?.width?.toString(),
        length: data?.length?.toString(),
      };

    default:
      break;
  }

  return updatedValues;
}

export const get_posted_by = (str?: string) => {
  switch (str) {
    case "I":
      return "Owner";
    case "A":
      return "Agent";
    default:
      return "Builder";
  }
};

export const isReraverified = (str: string) => {
  return str === "Applied" || str === "Recieved";
};

export function getStringPartByIndex(
  input: string,
  index: number
): string | null {
  const parts = input?.split("_");
  if (index >= 0 && index < parts?.length) {
    return parts[index];
  }
  return null; // Return null if the index is out of bounds
}

export const extractApiValues = (input: string) => {
  const result: { [key: string]: string | number } = {};

  // Split the input into segments based on the underscore "_"
  const segments = input?.split("_");

  // Initialize count
  let propertyCount = 0;

  // Process each segment
  for (const segment of segments) {
    // Check if the segment contains "*"
    const starIndex = segment.indexOf("*");
    if (starIndex !== -1) {
      // If it also contains "+", split by "+"
      const plusIndex = segment.indexOf("+");
      if (plusIndex !== -1) {
        const pairs = segment.split("+");
        for (const pair of pairs) {
          const [value, key] = pair.split("*");
          if (key) {
            if (!result[key]) {
              propertyCount++;
            }
            result[key] = value;
          }
        }
      } else {
        // Process single key-value pair
        const value = segment.substring(0, starIndex);
        const key = segment.substring(starIndex + 1);
        if (key) {
          if (!result[key]) {
            propertyCount++;
          }
          result[key] = value;
        }
      }
    } else {
      propertyCount++;
      // Assign the segment as the ID if no "*" is found
      result["id"] = segment;
    }
  }

  // Add the count of properties to the result
  result["count"] = propertyCount;

  return result;
};
