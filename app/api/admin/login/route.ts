import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  hasAdminConfig,
  sanitizeRedirectPath,
  verifyAdminAccessCode,
  getAdminSessionToken
} from "@/lib/admin";

export async function POST(request: NextRequest) {
  if (!hasAdminConfig()) {
    return NextResponse.json(
      { error: "Admin access is not configured. Set ADMIN_ACCESS_CODE and ADMIN_SESSION_TOKEN." },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const accessCode = typeof body.accessCode === "string" ? body.accessCode : "";
  const next = sanitizeRedirectPath(typeof body.next === "string" ? body.next : "/admin");

  if (!verifyAdminAccessCode(accessCode)) {
    return NextResponse.json({ error: "Invalid access code." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, redirectTo: next });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: getAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
