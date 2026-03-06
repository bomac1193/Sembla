import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${nanoid(10)}.${ext}`;

    const modelsDir = path.join(process.cwd(), "public", "models");
    await mkdir(modelsDir, { recursive: true });

    const filepath = path.join(modelsDir, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({ path: `/models/${filename}` });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
