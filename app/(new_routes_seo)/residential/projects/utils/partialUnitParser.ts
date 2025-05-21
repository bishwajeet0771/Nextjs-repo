type UnitDataDto = {
  projUnitIdEnc: string;
  unitType: string;
  phaseId: number;
  propType: string;
  sba: string;
  ca: string;
  floorPlan?: string;
  minPa?: string;
  maxPa?: string;
};

type UnitDetails = {
  minPrice: string;
  maxPrice: string;
  minSba: string;
  maxSba: string;
  minCa: string;
  maxCa: string;
  unitDataDtoList: UnitDataDto[];
};

type TransformedData = {
  [phaseId: string]: {
    apartment: { [unitType: string]: UnitDetails };
    villa: { [unitType: string]: UnitDetails };
    plot: { [unitType: string]: UnitDetails };
    rowhouse: { [unitType: string]: UnitDetails };
    villament: { [unitType: string]: UnitDetails };
  };
};

export function paritalUnitParser(input: any[]): TransformedData {
  const result: any = {};

  input.forEach((phase: any) => {
    const phaseId = `${phase.phaseId}`;
    const unitData: UnitDetails = {
      minPrice: "",
      maxPrice: "",
      minSba: "",
      maxSba: "",
      minCa: "",
      maxCa: "",
      unitDataDtoList: [],
    };

    // Property types to iterate through
    const propertyTypes = ["apt", "rowHouse", "villa", "vlmt", "plot"];

    propertyTypes.forEach((propType) => {
      // Check if the property type exists in the phase
      const propertyOverview = phase?.propTypeOverview?.[propType];

      if (propertyOverview) {
        propertyOverview.priceList?.forEach((priceItem: any) => {
          const unitType = priceItem.bhkOrDimension;
          if (!result[phaseId]) {
            result[phaseId] = {
              apartment: {},
              villa: {},
              plot: {},
              rowhouse: {},
              villament: {},
            };
          }

          const propKey = mapPropTypeToKey(propType);

          if (!result[phaseId][propKey][unitType]) {
            result[phaseId][propKey][unitType] = { ...unitData };
          }

          result[phaseId][propKey][unitType].minPrice = priceItem.minPrice;
          result[phaseId][propKey][unitType].maxPrice = priceItem.maxPrice;
          result[phaseId][propKey][unitType].minSba = priceItem.minSba;
          result[phaseId][propKey][unitType].maxSba = priceItem.maxSba;
          result[phaseId][propKey][unitType].minCa = priceItem.minCa;
          result[phaseId][propKey][unitType].maxCa = priceItem.maxCa;
          if (propType === "plot") {
            result[phaseId][propKey][unitType].minPa = priceItem.minPa;
            result[phaseId][propKey][unitType].maxPa = priceItem.maxPa;
          }
          const unitDataDto: UnitDataDto = {
            projUnitIdEnc: "placeholder_id", // Replace with actual ID
            unitType: unitType,
            phaseId: phase.phaseId,
            propType: propType, // Property type
            sba: priceItem.minSba, // SBA value
            ca: priceItem.minCa, // CA value,
            minPa: priceItem?.minPa,
            maxPa: priceItem?.maxPa,
            floorPlan:
              `${process.env.NEXT_PUBLIC_IMG_BASE}/images/varify/soc/7/35/454/fp.webp?v=1725616219771`, // Replace with actual floor plan URL
          };

          result[phaseId][propKey][unitType].unitDataDtoList.push(unitDataDto);
        });
      }
    });
  });
  return result;
}

// Helper function to map propType to the correct key in the result object
function mapPropTypeToKey(propType: string): string {
  switch (propType) {
    case "apt":
      return "apartment";
    case "rowHouse":
      return "rowhouse";
    case "villa":
      return "villa";
    case "vlmt":
      return "villament";
    case "plot":
      return "plot";
    default:
      return "unknown";
  }
}
