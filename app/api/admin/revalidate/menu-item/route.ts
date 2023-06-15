import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  revalidatePath(`/menu/${searchParams.get("item")}`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
