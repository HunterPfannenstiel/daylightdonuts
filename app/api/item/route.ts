import { getItemDetails } from "@_utils/database/menu";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  // const res = await req.json();
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const itemDetails = await getItemDetails(
    searchParams.get("item") || undefined
  );
  return NextResponse.json(itemDetails);
};
