import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function handleProtectedRoutes(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/auth", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
