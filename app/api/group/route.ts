import { getAllItemsForGroup } from "@_utils/database/dozenable/queries";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  if (name) {
    const group = await getAllItemsForGroup(name);
    console.log(group);
    return new NextResponse(JSON.stringify(group));
  } else {
    return new NextResponse("Error", { status: 400 });
  }
};
