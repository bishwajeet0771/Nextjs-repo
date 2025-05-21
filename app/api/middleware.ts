import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
export function Authmiddleware(request: NextRequest) {
  console.log("api middlware is running");
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  // const token = cookies().get("token")?.value;
  const response = NextResponse.next();
  return response;
}
