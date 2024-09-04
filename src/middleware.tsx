import { NextRequest, NextResponse } from "next/server";

const privateRoutes = [
  "/",
  "/analytics",
  "/customers",
  "/documents",
  "/order-review",
];
const publicRoutes = ["/login", "/forget-password", "/sign-up"];

const apiRoutes = [
  "/api/users",
  "/api/auth/signin",
  // "/api/auth/sign-up",
  // "/api/auth/forget-password",
  // "/api/auth/reset-password",
];

export function middleware(request: NextRequest) {
  let headers = new Headers(request.headers);
  const authorization = headers
    .get("cookie")
    ?.includes("next-auth.session-token");
  console.log("authorization", authorization);

  if (apiRoutes.includes(request.nextUrl.pathname)) {
    if (!authorization) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (authorization) {
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    if (privateRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/:path*"],
};
