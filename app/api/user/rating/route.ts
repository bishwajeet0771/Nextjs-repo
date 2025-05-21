import axios from "axios";

export async function POST(req: Request) {
  const data = await req.json();
  const url = `${process.env.BACKEND_URL}/user-actions/add-review`;
  try {
    const response = await axios.post(url, data);
    // console.log(response.data);
    return Response.json(response.data);
  } catch (error) {
    return Response.json({ ok: true });
  }
}
