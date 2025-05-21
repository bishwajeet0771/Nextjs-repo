// import axios from "axios";
import { NextResponse } from "next/server";
// import path from "path";
// import fs from "fs";
// import redis from "@/app/utils/redis/redis.connection";
// import redisService from "@/app/utils/redis/redis.service";

export async function GET() {
  try {
    // const data = await redisService.getSeoSlug("case-seo");
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
