import logger from "@/app/utils/logger";
// import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
export async function POST(request: Request) {
  const body = await request.json();
  const ip = headers().get("x-forwarded-for") ?? "NA";
  const { type, data } = body;
  if (!type && !data) {
    return NextResponse.json({
      message: "Invalid request",
      status: 400,
    });
  }
  logger[type as keyof typeof logger]({ ...data, ip });
  return NextResponse.json({
    message: "Log saved",
    status: 200,
  });
}
