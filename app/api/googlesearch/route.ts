import axios from "axios";

export async function GET(req: Request) {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const input = params.get("input");

  if (!input) {
    return Response.json({
      error: "Input is a required parameter",
    });
  }

  const autocompleteRes = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );

  return Response.json({
    autocompleteRes: autocompleteRes.data,
  });
}
