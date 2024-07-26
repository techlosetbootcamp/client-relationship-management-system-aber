// // import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";

// import { NextRequest } from "next/server";

// // import { redirect } from "next/navigation";
// // import { NextRequest, NextResponse } from "next/server";

// // const privateRoutes = [
// //   "/",
// //   "/analytics",
// //   "/customers",
// //   "/documents",
// //   "/order-review",
// //   "/api/:path*",
// // ];

// // // const apiRoutes = [];

// // export default withAuth(
// //   function middleware(req: NextRequest) {
// //     const authorized = req.headers.get("cookie");
// //     const sessionToken = authorized ? authorized.split(" ")[2] : !!authorized;

// //     // console.log("hey there",  sessionToken, req.nextUrl.pathname);
// //     if (!sessionToken) {
// //       return NextResponse.redirect(new URL("/login", req.url));
// //     }

// //     if (req.nextUrl.pathname.includes("/api")) {
// //       if (sessionToken) {
// //         console.log("in if condition");
// //         return NextResponse.redirect(new URL("/", req.url));
// //       } else {
// //         console.log("in else condition");
// //         return NextResponse.redirect(new URL("/login", req.url));
// //       }
// //     }

// //     console.log("checking session ", req.nextUrl.pathname, sessionToken);
// //     if(sessionToken){
// //       console.log("inside if", req.nextUrl.pathname)

// //       if (req.nextUrl.pathname.startsWith("/login")) {
// //         console.log("in else if session", sessionToken);
// //         return NextResponse.redirect(new URL("/", req.url));
// //         // if (sessionToken) {
// //         //   return NextResponse.redirect(new URL("/", req.url));
// //         // }
// //       }
// //     }

// //     return NextResponse.next();
// //   }
// //   //   {
// //   //     callbacks: {
// //   //       authorized({ token }) {
// //   //         if (!token) {
// //   //           return false;
// //   //         }

// //   //         return true;
// //   //       },
// //   //     },
// //   //   }
// // );

// // export const config = {
// //   matcher: [
// //     "/",
// //     "/analytics",
// //     "/customers",
// //     "/documents",
// //     "/order-review",
// //     "/api/:path*",
// //     "/api/auth/:path*",
// //   ],
// // };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const privateRoutes = [
//   "/",
//   "/analytics",
//   "/customers",
//   "/documents",
//   "/order-review",
//   // "/api/:path*",
// ];

// const publicRoutes = ["/login", "/forget-password"];

// export function middleware(request: NextRequest) {
//   const authorized = request.headers.get("cookie");
//   const sessionToken = authorized ? !!authorized.split(" ")[2] : !!authorized;

//   if (sessionToken) {
//     if (
//       request.nextUrl.pathname.startsWith("/api") ||
//       publicRoutes.includes(request.nextUrl.pathname)
//     ) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   } else if (!sessionToken || request.nextUrl.pathname.startsWith("/api")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // console.log("session token", sessionToken);

//   // // console.log("hey there",  sessionToken, req.nextUrl.pathname);
//   // if (request.nextUrl.pathname.startsWith("/api")) {
//   //   if (sessionToken) {
//   //     return NextResponse.redirect(new URL("/", request.url));
//   //   }
//   //   return NextResponse.redirect(new URL("/login", request.url));
//   // }

//   // if (sessionToken) {
//   //   console.log("inside if", request.nextUrl.pathname);

//   //   if (publicRoutes.includes(request.nextUrl.pathname)) {
//   //     console.log("in else if session", sessionToken);
//   //     return NextResponse.redirect(new URL("/", request.url));
//   //   }
//   //     return NextResponse.redirect(new URL("/login", request.url));

//   //   // if (request.nextUrl.pathname.startsWith("/login")) {
//   //   //   console.log("in else if session", sessionToken);
//   //   //   return NextResponse.redirect(new URL("/", request.url));

//   //   // }
//   // }
// }

const privateRoutes = [
  // "/",
  "/analytics",
  "/customers",
  "/documents",
  "/order-review",
  // "/api/:path*",
];
const publicRoutes = ["/login", "/forget-password"];

const apiRoutes = ["/api/:path*", "/api/auth/:path*"]

export function middleware(request: NextRequest) {
  let headers = new Headers(request.headers);
  const authorization = headers.get("cookie")?.split(" ")[2];

  if(publicRoutes.includes(request.nextUrl.pathname)){
    if(authorization){
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next()
  }

  // console.log("headers in middleware", authorization, headers);
  // return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/",
    "/analytics",
    "/customers",
    "/documents",
    "/order-review",
    // "/api/:path*",
  ],
};
