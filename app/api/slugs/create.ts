import * as fs from "fs";

// Define types
type PropertyType =
  | "Apartment"
  | "Row House"
  | "Villa"
  | "Villament"
  | "Plot"
  | "Independent House"
  | "Flat"
  | "New Launched";
type Locality =
  | "Mumbai"
  | "Delhi"
  | "Bengaluru"
  | "Hyderabad"
  | "Chennai"
  | "Kolkata"
  | "Pune"
  | "Ahmedabad"
  | "Surat"
  | "Jaipur"
  | "Goa"
  | "Chandigarh";
type Transaction = "buy" | "sell";
type BHKType = "1 BHK" | "2 BHK" | "3 BHK" | "4+ BHK";
type Descriptor =
  | "New Launch"
  | "Best Selling"
  | "Hot Deal"
  | "Luxury"
  | "Affordable"
  | "Exclusive"
  | "Premium"
  | "In Demand"
  | "Best in 2024";

// Define parameters
const propertyTypes: PropertyType[] = [
  "Apartment",
  "Row House",
  "Villa",
  "Villament",
  "Plot",
  "Independent House",
  "Flat",
  "New Launched",
];

const localities: Locality[] = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Goa",
  "Chandigarh",
];

const transactions: Transaction[] = ["buy", "sell"];

const bhkTypes: BHKType[] = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];

const descriptors: Descriptor[] = [
  "New Launch",
  "Best Selling",
  "Hot Deal",
  "Luxury",
  "Affordable",
  "Exclusive",
  "Premium",
  "In Demand",
  "Best in 2024",
];

// Function to create slug
function createSlug(
  transaction: Transaction,
  bhk: BHKType,
  property: PropertyType,
  locality: Locality,
  descriptor?: Descriptor
): string {
  const descriptorPart = descriptor
    ? `${descriptor.toLowerCase().replace(/\s+/g, "-")}-`
    : "";
  return `${transaction}-${descriptorPart}${bhk
    .toLowerCase()
    .replace(/\s+/g, "")}-${property
    .toLowerCase()
    .replace(/\s+/g, "-")}-in-${locality.toLowerCase()}`;
}

// Function to generate permutations and save to JSON file
function generatePermutations(
  fileName: string = "permutations.json",
  targetCount: number = 5000
): void {
  console.log(
    `Generating permutations to reach ${targetCount} unique entries...`
  );

  // Use a Set to store unique permutations
  const uniquePermutations = new Set<string>();

  // Function to generate a random permutation
  function generateRandomPermutation(): string {
    const property =
      propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const locality = localities[Math.floor(Math.random() * localities.length)];
    const transaction =
      transactions[Math.floor(Math.random() * transactions.length)];
    const bhk = bhkTypes[Math.floor(Math.random() * bhkTypes.length)];
    const descriptor =
      Math.random() < 0.2
        ? descriptors[Math.floor(Math.random() * descriptors.length)]
        : undefined;

    const slug = createSlug(transaction, bhk, property, locality, descriptor);
    const uniqueId = `id-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    const permutation = JSON.stringify({
      id: uniqueId,
      type: property,
      locality: locality,
      transaction: transaction,
      bhk: bhk,
      descriptor: descriptor || "None",
      slug: slug,
    });

    console.log(`Generated permutation: ${permutation}`);

    return permutation;
  }

  // Generate permutations until the Set has at least targetCount unique entries
  let iteration = 0;
  while (uniquePermutations.size < targetCount) {
    iteration++;
    const newPermutation = generateRandomPermutation();
    if (!uniquePermutations.has(newPermutation)) {
      uniquePermutations.add(newPermutation);
      console.log(
        `Added unique permutation #${uniquePermutations.size}: ${newPermutation}`
      );
    }

    // Log progress every 1000 iterations
    if (iteration % 1000 === 0) {
      console.log(
        `Progress: ${uniquePermutations.size} unique permutations generated.`
      );
    }
  }

  console.log(
    `Finished generating permutations. Total unique permutations: ${uniquePermutations.size}`
  );

  // Convert Set back to Array
  const permutations = Array.from(uniquePermutations).map((item) =>
    JSON.parse(item)
  );

  // Shuffle array
  for (let i = permutations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutations[i], permutations[j]] = [permutations[j], permutations[i]];
  }

  // Save to JSON file
  fs.writeFile(fileName, JSON.stringify(permutations, null, 2), (err) => {
    if (err) {
      console.error(`Error saving file: ${err}`);
    } else {
      console.log(`Data successfully saved to ${fileName}`);
    }
  });
}
// Export the function
export default generatePermutations;
