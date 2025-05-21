import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const clearResumeSignupTokenCookie = async (
  request: NextRequest,
  response: NextResponse
) => {
  const signUpTokenA = cookies().get("resume_signup_tokena")?.value;
  const signUpTokenB = cookies().get("resume_signup_tokenb")?.value;

  const excludedPathAgent = "/register/agent";
  const excludedPathBuilder = "/register/builder";
  if (signUpTokenA && request.nextUrl.pathname !== excludedPathAgent) {
    response.cookies.delete("resume_signup_tokena");
    return response;
  }
  if (signUpTokenB && request.nextUrl.pathname !== excludedPathBuilder) {
    response.cookies.delete("resume_signup_tokenb");
    return response;
  }
};
