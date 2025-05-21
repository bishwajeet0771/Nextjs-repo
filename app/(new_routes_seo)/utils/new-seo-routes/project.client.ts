export function groupUnitsById(unitArray: Unit[]): GroupedUnits {
  const groupedData: GroupedUnits = {};

  unitArray.forEach((unit) => {
    const { phaseId, propType, bhkName } = unit;

    // Initialize the phase group if it doesn't exist
    if (!groupedData[phaseId]) {
      groupedData[phaseId] = {};
    }

    // Initialize the property type group if it doesn't exist
    if (!groupedData[phaseId][propType]) {
      groupedData[phaseId][propType] = {};
    }

    // Initialize the BHK group if it doesn't exist
    if (!groupedData[phaseId][propType][bhkName]) {
      groupedData[phaseId][propType][bhkName] = [];
    }

    // Push the unit to the appropriate group
    groupedData[phaseId][propType][bhkName].push(unit);
  });

  return groupedData;
}
interface Unit {
  unitIdEnc: string;
  projIdEnc: string;
  phaseId: number;
  propType: number;
  bhk: number;
  bhkName: string;
  // Add other properties as needed
}

interface GroupedUnits {
  [phaseId: number]: {
    [propType: number]: {
      [bhkName: string]: Unit[];
    };
  };
}
