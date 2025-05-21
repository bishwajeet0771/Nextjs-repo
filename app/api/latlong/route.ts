import axios from "axios";

export async function GET(req: Request) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const placeId = params.get("id");

  if (!placeId) {
    return Response.json({
      error: "No place ID found for the given input",
    });
  }

  const detailsRes = await axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );

  const location = detailsRes.data.result.geometry.location;

  return Response.json({
    location: location,
  });
}
