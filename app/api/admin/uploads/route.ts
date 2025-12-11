export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { listAvatars } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const uploads = await listAvatars(50);
    return NextResponse.json({ uploads });
  } catch (err) {
    console.warn("Admin list failed", err);
    return NextResponse.json({ uploads: [] });
  }
}
