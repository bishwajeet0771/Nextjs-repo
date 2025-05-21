import { Main } from "@/app/validations/property";
import { formatNumberWithSuffix } from "../numbers";

function createPropertyString(data: Main): string {
  if (
    data.propTypeName === config.propTypeNames[1] ||
    data.propTypeName === config.propTypeNames[2]
  ) {
    return `${data.propName} | ${data.bhkName} | Elevation ${
      data.isBasement == "Y" ? "B+" : ""
    }G+${data.atFloor} | Unit No. ${data.unitNumber} | ${
      data.facingName
    } | Area: ${data.sba} sq.ft`;
  } else if (data.propTypeName === config.propTypeNames[3]) {
    return `${data.propName} | Unit No. ${data.unitNumber} | ${
      data.facingName
    } | Area. ${formatNumberWithSuffix(data.plotArea,false)} sq.ft`;
  } else if (data.propTypeName === config.propTypeNames[5]) {
    return  `${data.propName} | ${data.bhkName} | ${
      data.cg === "R" ? `At Floor ${data.atFloor === 0 ? "G" : data.atFloor}` : `Floor ${data.totalFloor}`
    } | House No. ${data.unitNumber} | ${
      data.facingName
    } | Area: ${formatNumberWithSuffix(data.sba,false)} sq.ft`;
  } else {
    return `${data.propName} | ${data.bhkName} | ${
      data.tower ? "Tower " + data.tower : ""
    } |At Floor ${data.atFloor === 0 ? "G" : data.atFloor} | Unit No. ${
      data.unitNumber
    } | ${data.facingName} | Area: ${formatNumberWithSuffix(data.sba,false)} sq.ft`;
  }
}

export { createPropertyString };

const config = {
  propTypeNames: [
    "Apartment",
    "Row House",
    "Villa",
    "Plot",
    "Villament",
    "Independent House/Building",
  ],
};
