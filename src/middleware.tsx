import { withAuth } from "next-auth/middleware";

import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = [
  "/",
  "/analytics",
  "/customers",
  "/documents",
  "/order-review",
  "/api/:path*",
];

// const apiRoutes = [];

export default withAuth(
  function middleware(req: NextRequest) {
    const authorized = req.headers.get("cookie");
    const sessionToken = authorized ? authorized.split(" ")[2] : !!authorized;

    // console.log("hey there",  sessionToken, req.nextUrl.pathname);
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname.includes("/api")) {
      if (sessionToken) {
        console.log("in if condition");
        return NextResponse.redirect(new URL("/", req.url));
      } else {
        console.log("in else condition");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    console.log("checking session ", req.nextUrl.pathname, sessionToken);
    if(sessionToken){
      console.log("inside if", req.nextUrl.pathname)

      if (req.nextUrl.pathname.startsWith("/login")) {
        console.log("in else if session", sessionToken);
        return NextResponse.redirect(new URL("/", req.url));
        // if (sessionToken) {
        //   return NextResponse.redirect(new URL("/", req.url));
        // }
      }
    }

    return NextResponse.next();
  }
  //   {
  //     callbacks: {
  //       authorized({ token }) {
  //         if (!token) {
  //           return false;
  //         }

  //         return true;
  //       },
  //     },
  //   }
);

export const config = {
  matcher: [
    "/",
    "/analytics",
    "/customers",
    "/documents",
    "/order-review",
    "/api/:path*",
    "/api/auth/:path*",
  ],
};
