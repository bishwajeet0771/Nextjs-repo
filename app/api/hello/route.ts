import axios from "axios";

export async function GET(req: Request) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const lat = params.get("lt");
  const lng = params.get("lng");
  const type = params.get("type");
  const travelType = params.get("travelType");

  if (!lat || !lng || !type) {
    return Response.json({
      error: "Latitude, Longitude, and Type are required parameters",
    });
  }
  // console.log(type);
  // Define a mapping of types to corresponding keyword values
  const typeMappings: Record<string, string> = {
    Commute: "public transport",
    train: "train",
    bus: "bus station",
    hospital: "hospital",
    school: "school",
    market: "malls & shopping centers & shops",
    restaurant: "restaurant & food",
    bank: "bank",
    clinic: "clinic",
    atm: "atm",
    "post office": "post office",
    mall: "malls",
  };

  const keyword = typeMappings[type.toLowerCase()];

  if (!keyword) {
    // Handle the case where an invalid type is provided
    return Response.json({ error: "Invalid type specified" });
  }
  try {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&rank=distance&type=${keyword}&keyword=${keyword}&maxResultCount=10&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
    // console.log(url);
    const res = await axios.get(url);
    // console.log(res.data.results);

    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&units=imperial&origins=${lat},${lng}&destinations=${res.data.results
      .map(
        (place: any) =>
          `${place.geometry.location.lat},${place.geometry.location.lng}`
      )
      .join("|")}&mode=${travelType?.toLowerCase()}&key=${
      process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    }`;
    const distanceRes = await axios.get(distanceUrl);
    // console.log(distanceRes.data);

    const combinedData = res.data.results.map((place: any, index: number) => {
      return {
        name: place.name,
        geometry: place.geometry,
        vicinity: place.vicinity,
        distance: distanceRes.data.rows[0].elements[index].distance,
        duration: distanceRes.data.rows[0].elements[index].duration,
      };
    });
    combinedData?.sort((a: any, b: any) => {
      return a?.distance?.value - b?.distance?.value; // Sorting by distance value in ascending order
    });

    console.log(combinedData);
    // console.log(combinedData);
    // console.log("jhfhghdfghdcgfxdgfxdfgsxfg==========" + JSON.stringify(distanceRes.data));
    return Response.json({
      ...combinedData,
      // ...res.data.results,
      // abc: combinedData,
    });
  } catch (error) {
    console.log(error);
  }
}
