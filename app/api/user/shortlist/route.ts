// import { addRating } from "@/app/utils/api/actions/ratings";
import axios from "axios";
// import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/add?type=${data.type}`;
  try {
    const response = await axios.post(url, {
      projIdEnc: data.projIdEnc,
      isactive: data.isactive,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
