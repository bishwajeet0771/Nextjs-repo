// import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import { options } from "./app/options";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/register/agent",
  "/register/builder",
  "/register/individual",
  "/forgot",
];

const EXCLUDED_PATHS = {
  agent: "/register/agent",
  builder: "/register/builder",
};

function setRequestHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return headers;
}

function deleteAuthCookies(response: NextResponse) {
  [
    "next-auth.session-token",
    "next-auth.csrf-token",
    "next-auth.callback-url",
  ].forEach((cookie) => response.cookies.delete(cookie));
}

export function middleware(request: NextRequest) {
  const headers = setRequestHeaders(request);
  const response = NextResponse.next({ headers });
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const signUpTokenA = cookieStore.get("resume_signup_tokena")?.value;
  const signUpTokenB = cookieStore.get("resume_signup_tokenb")?.value;
  const nextjsToken = cookieStore.get("next-auth.session-token")?.value;
  // Redirect authenticated users away from AUTH_ROUTES
  // if (AUTH_ROUTES.includes(request.nextUrl.pathname) && nextjsToken) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // Delete signup tokens if the path does not match the exclusion
  if (signUpTokenA && request.nextUrl.pathname !== EXCLUDED_PATHS.agent) {
    response.cookies.delete("resume_signup_tokena");
  }
  if (signUpTokenB && request.nextUrl.pathname !== EXCLUDED_PATHS.builder) {
    response.cookies.delete("resume_signup_tokenb");
  }
  if (!token) {
    deleteAuthCookies(response);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicons/manifest.json|auth/login.svg|favicons/favicon-32x32.png|android-icon-144x144.png|android-icon-36x36.png|android-icon-48x48.png|android-icon-72x72.png|android-icon-96x96.png|android-icon-192x192.png).*)",
  ],
};
