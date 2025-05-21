import {
  getAllCitiesDetails,
  getAllLocalitiesDetails,
} from "@/app/utils/stats_cities";
import { NextResponse } from "next/server";

interface City {
  name: string;
  id: string | number;
}

interface Locality {
  id: string | number;
  name: string;
  cityid: string | number;
  isactive: string;
  stateId: string | number;
  parentId: string | number;
  type: number;
  createdate: string;
  modidate: string;
}

// Centralized function to map URLs based on city details, locality details, and type
function mapUrls(
  cities: City[],
  localities: Locality[],
  type: string
): Record<string, string | number> {
  return cities.reduce((acc, city) => {
    const normalizedCityName = city.name.toLowerCase().replace(/\s+/g, "-");
    const cityId = city.id; // Assuming id is a number or string that represents the city

    if (type === "project") {
      // Include localities in the URLs
      localities.forEach((locality) => {
        if (locality.cityid === cityId) {
          const normalizedLocalityName = locality.name
            .toLowerCase()
            .replace(/\s+/g, "-");
          acc[
            `/projects/new-projects-in-${normalizedCityName}/${normalizedLocalityName}`
          ] = `${cityId}_${locality.id}`;
          // acc[`/projects/new-affordable-projects-in-${normalizedCityName}-in-${normalizedLocalityName}`] = cityId;
          // acc[`/projects/upcoming-residential-listings-in-${normalizedCityName}-in-${normalizedLocalityName}`] = cityId;
        } else {
          acc[`/projects/new-projects-in-${normalizedCityName}`] = `${cityId}`;
          // acc[`/projects/new-affordable-projects-in-${normalizedCityName}`] = cityId;
          // acc[`/projects/upcoming-residential-listings-in-${normalizedCityName}`] = cityId;
        }
      });
    } else if (type === "property") {
      acc[
        `/properties/for-sale-in-${normalizedCityName}/properties-for-sale-residential-in-${normalizedCityName}`
      ] = `${cityId}`;
      acc[
        `/properties/for-rent-in-${normalizedCityName}/properties-for-rent-residential-in-${normalizedCityName}`
      ] = `${cityId}`;
    } else {
      console.error(`Invalid type: ${type}`);
    }

    return acc;
  }, {} as Record<string, string | number>); // Flatten and filter out null values
}

export async function POST(req: Request): Promise<Response> {
  const { type } = (await req.json()) as { type: string };
  try {
    const cities: City[] = await getAllCitiesDetails(); // Fetch all cities
    const allLocalities: Locality[] = await getAllLocalitiesDetails(); // Fetch all localities
    const mappedUrls = mapUrls(cities, allLocalities, type); // Call the centralized function

    return NextResponse.json({
      data: mappedUrls,
      count: Object.keys(mappedUrls).length,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Error reading file" });
  }
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // Get the 'type' query parameter

  try {
    const cities: City[] = await getAllCitiesDetails(); // Fetch all cities
    const allLocalities: Locality[] = await getAllLocalitiesDetails(); // Fetch all localities
    const mappedUrls = mapUrls(cities, allLocalities, type || ""); // Call the centralized function with a default value for type
    return NextResponse.json({
      data: mappedUrls,
      count: Object.keys(mappedUrls).length,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: "Error reading file" });
  }
}
