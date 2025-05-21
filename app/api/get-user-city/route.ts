import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const data = await req.json();
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
  const ip = new URL(req.url).searchParams.get("ip");
  if (process.env.NODE_ENV === "development" || ip === "::1") {
    return NextResponse.json(
      {
        status: true,
        data: {
          cityId: 9,
          stateId: 11,
          city: "Bengaluru",
          state: "Karnataka",
        },
      },
      {
        status: 200,
      }
    );
  }
  // const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for");
  // console.log('ip log from get user city',ip)

  try {
    if (!ip) {
      return NextResponse.json({ ok: false, error: "IP not found" });
    }
    const data = await getCityStateFromIP(ip);
    // console.log(data);
    const cityStateId = await getCityStateIdFromDb(data.region, data.city);
    // console.log(cityStateId);
    if (!cityStateId.city) {
      return NextResponse.json({ ok: false, error: "City not found" });
    }
    // there city id state id city name state name
    const resData = {
      cityId: cityStateId.city,
      stateId: cityStateId.state,
      city: data.city,
      state: data.region,
    };
    return NextResponse.json({ data: resData, status: true });
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
async function getCityStateIdFromDb(state: string, city: string) {
  console.log(
    `[${new Date().toISOString()}] getCityStateIdFromDb - State: "${state}", City: "${city}"`
  );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/get-city-state/ip?city=${city}&state=${state}`
  );
  const data = await res.json();
  return data;
}
