import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAdminSessionToken } from "@/lib/admin";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (isAdminSessionToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin", request.url);
  loginUrl.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/admin/passports",
    "/admin/passports/:path*",
    "/roster/upload",
    "/roster/upload/:path*",
    "/api/admin/uploads",
    "/api/admin/uploads/:path*",
    "/api/roster/upload",
    "/api/roster/upload/:path*"
  ]
};
