import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { handleProtectedRoutes } from "./utils/route-guards";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/auth")) {
    const token = req.cookies.get("token")?.value;

    if (token) {
      const homeUrl = new URL("/home", req.url);
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  }

  const protectedRoutes = ["/home", "/profile", "/dashboard"];
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    return handleProtectedRoutes(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/home/:path*"],
};
