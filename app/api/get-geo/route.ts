import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  const ip =
    data?.ip ||
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for");

  try {
    if (!ip) {
      return NextResponse.json({ ok: false, error: "IP not found" });
    }
    const data = await getCityStateFromIP(ip);
    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
export async function GET(req: Request) {
  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
  // if ip localhost then send fake data ::1
  if (ip === "::1") {
    return NextResponse.json({
      data: {
        city: "Bengaluru",
        state: "Karnataka",
        cityId: 9,
        stateId: 11,
      },
      msg: "comgin from development",
    });
  }
  try {
    if (!ip) {
      return NextResponse.json({ ok: false, error: "IP not found" });
    }
    const data = await getCityStateFromIP(ip);
    return NextResponse.json({ data, status: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
const axios = require("axios");

async function getCityStateFromIP(ip: string) {
  try {
    const response = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json
`);
    return response.data;
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return null;
  }
}
