import {
  Compass,
  Furnishing,
  Others,
  OwnerShip,
  PhaseIcon,
  PropertyBuilding,
  Status,
  TotalLandArea,
} from "@/app/images/commonSvgs";
import { formatNumberWithSuffix } from "@/app/utils/numbers";
import { Main } from "@/app/validations/property";

import React from "react";
type PropertyDetail = {
  title: string;
  value: string | number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
export function generatePropertyOverViewData(
  data: Main,
  propertyType: string,
  cg: string,
  availablityStatus: string
): PropertyDetail[] {
  let propertyDetails: PropertyDetail[] = [];
  switch (propertyType?.trim()) {
    case "Apartment":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Others },
        {
          title: "Property Type",
          value: data.propTypeName,
          Icon: PropertyBuilding,
        },
        { title: "Phase", value: data.phaseName, Icon: PhaseIcon },
        { title: "Ownership", value: data.ownershipName, Icon: OwnerShip },
        {
          title: "Availability Status",
          value:
            data.availablityStatus === "U"
              ? "Under Construction"
              : "Ready to Move",
          Icon: Status,
        },
        { title: "Property Facing", value: data.facingName, Icon: Compass },
        {
          title: "Super built-up Area",
          value: `${formatNumberWithSuffix(data.sba,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${formatNumberWithSuffix(data.ca,false)} sq.ft`,
          Icon: TotalLandArea,
        },

        {
          title: "Furnishing",
          value: `${data.furnshName}`,
          Icon: Furnishing,
        },
      ];

      if (cg === "R") {
        propertyDetails.splice(3, 0, {
          title: "Available For",
          value: data.availavleFor,
          Icon: Status,
        });

        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          // propertyDetails.push();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          // propertyDetails
          //   .push
          //   // Add Rent, Under Construction specific details
          //   ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      break;
    case "Villa":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Others },
        {
          title: "Property Type",
          value: data.propTypeName,
          Icon: PropertyBuilding,
        },
        { title: "Phase", value: data.phaseName, Icon: PhaseIcon },
        { title: "Ownership", value: data.ownershipName, Icon: OwnerShip },
        {
          title: "Availability Status",
          value:
            data.availablityStatus === "U"
              ? "Under Construction"
              : "Ready to Move",
          Icon: Status,
        },
        { title: "Property Facing", value: data.facingName, Icon: Compass },
        {
          title: "Super built-up Area",
          value: `${formatNumberWithSuffix(data.sba,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${formatNumberWithSuffix(data.ca,false)} sq.ft`,
          Icon: TotalLandArea,
        },

        {
          title: "Furnishing",
          value: `${data.furnshName}`,
          Icon: Furnishing,
        },
      ];

      if (cg === "R") {
        propertyDetails.splice(3, 0, {
          title: "Available For",
          value: data.availavleFor,
          Icon: Status,
        });
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          propertyDetails
            .push
            // Add Rent, Ready to Move specific details
            ();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          propertyDetails
            .push
            // Add Rent, Under Construction specific details
            ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      // Logic for Villa property details
      break;
    case "Villament":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Others },
        {
          title: "Property Type",
          value: data.propTypeName,
          Icon: PropertyBuilding,
        },
        { title: "Phase", value: data.phaseName, Icon: PhaseIcon },
        { title: "Ownership", value: data.ownershipName, Icon: OwnerShip },
        {
          title: "Availability Status",
          value:
            data.availablityStatus === "U"
              ? "Under Construction"
              : "Ready to Move",
          Icon: Status,
        },
        { title: "Property Facing", value: data.facingName, Icon: Compass },
        {
          title: "Super built-up Area",
          value: `${formatNumberWithSuffix(data.sba,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${formatNumberWithSuffix(data.ca,false)} sq.ft`,
          Icon: TotalLandArea,
        },

        {
          title: "Furnishing",
          value: `${data.furnshName}`,
          Icon: Furnishing,
        },
      ];

      if (cg === "R") {
        propertyDetails.splice(3, 0, {
          title: "Available For",
          value: data.availavleFor,
          Icon: Status,
        });

        if (availablityStatus === "R") {
          // propertyDetails.push();
        } else if (availablityStatus === "U") {
          // propertyDetails
          //   .push
          //   // Add Rent, Under Construction specific details
          //   ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      // Logic for Villament property details
      break;
    case "Plot":
      propertyDetails = [
        {
          title: "Property Type",
          value: data.propTypeName,
          Icon: PropertyBuilding,
        },
        { title: "Phase", value: data.phaseName, Icon: PhaseIcon },
        { title: "Ownership", value: data.ownershipName, Icon: OwnerShip },

        { title: "Property Facing", value: data.facingName, Icon: Compass },
        {
          title: "Plot Area",
          value: data.plotArea && `${formatNumberWithSuffix(data.plotArea,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Length of Plot",
          value: `${data.length} ft.`,
          Icon: TotalLandArea,
        },
        {
          title: "Breadth of Plot",
          value: `${data.width} ft.`,
          Icon: TotalLandArea,
        },
      ];

      if (cg === "R") {
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          propertyDetails
            .push
            // Add Rent, Ready to Move specific details
            ();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          propertyDetails
            .push
            // Add Rent, Under Construction specific details
            ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      // Logic for Plot property details
      break;
    case "Row House":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Others },
        {
          title: "Property Type",
          value: data.propTypeName,
          Icon: PropertyBuilding,
        },
        { title: "Phase", value: data.phaseName, Icon: PhaseIcon },
        { title: "Ownership", value: data.ownershipName, Icon: OwnerShip },
        {
          title: "Availability Status",
          value:
            data.availablityStatus === "U"
              ? "Under Construction"
              : "Ready to Move",
          Icon: Status,
        },
        { title: "Property Facing", value: data.facingName, Icon: Compass },
        {
          title: "Plot Area",
          value: data.plotArea && `${formatNumberWithSuffix(data.plotArea,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Super built-up Area",
          value: `${formatNumberWithSuffix(data.sba,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${formatNumberWithSuffix(data.ca,false)} sq.ft`,
          Icon: TotalLandArea,
        },

        {
          title: "Furnishing",
          value: `${data.furnshName}`,
          Icon: Furnishing,
        },
      ];
      if (cg === "R") {
        propertyDetails.splice(3, 0, {
          title: "Available For",
          value: data.availavleFor,
          Icon: Status,
        });
        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          propertyDetails
            .push
            // Add Rent, Ready to Move specific details
            ();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          propertyDetails
            .push
            // Add Rent, Under Construction specific details
            ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      // Logic for Rowhouse property details
      break;
    case "Independent House/Building":
      propertyDetails = [
        { title: "Unit Type", value: data.bhkName, Icon: Others },
        {
          title: "Property Type",
          value: data.propTypeName,
          Icon: PropertyBuilding,
        },
        { title: "Phase", value: data.phaseName, Icon: PhaseIcon },
        { title: "Ownership", value: data.ownershipName, Icon: OwnerShip },
        {
          title: "Plot Area",
          value: data.plotArea && `${formatNumberWithSuffix(data.plotArea,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Availability Status",
          value:
            data.availablityStatus === "U"
              ? "Under Construction"
              : "Ready to Move",
          Icon: Status,
        },
        { title: "Property Facing", value: data.facingName, Icon: Compass },
        {
          title: "Super built-up Area",
          value: `${formatNumberWithSuffix(data.sba,false)} sq.ft`,
          Icon: TotalLandArea,
        },
        {
          title: "Carpet Area",
          value: `${formatNumberWithSuffix(data.ca,false)} sq.ft`,
          Icon: TotalLandArea,
        },

        {
          title: "Furnishing",
          value: `${data.furnshName}`,
          Icon: Furnishing,
        },
      ];

      if (cg === "R") {
        propertyDetails.splice(3, 0, {
          title: "Available For",
          value: data.availavleFor,
          Icon: Status,
        });

        if (availablityStatus === "R") {
          // For Rent, Ready to Move
          // propertyDetails.push();
        } else if (availablityStatus === "U") {
          // For Rent, Under Construction
          // propertyDetails
          //   .push
          //   // Add Rent, Under Construction specific details
          //   ();
        }
      } else if (cg === "S") {
        // For Sale
        // Add Sale specific details
      }
      break;
    default:
      break;
  }

  return propertyDetails;
}
