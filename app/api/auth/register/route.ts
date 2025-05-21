import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // console.log(data);
    const registrationResponse = await axios.post(
      `${process.env.BACKEND_URL}/user/v1/registerUser`,
      data
    );
    console.log(registrationResponse.data);
    return Response.json(registrationResponse.data);
  } catch (error) {
    console.log(error);
    return Response.json({ ok: true });
  }
}
