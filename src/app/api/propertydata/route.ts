import { NextResponse } from "next/server";
import { getPayloadClient } from "@/utils/payload-utils";

export async function GET() {
  const payload = await getPayloadClient();
  const properties = await payload.find({
    collection: "properties",
    depth: 1,
  });
  return NextResponse.json(properties.docs);
}
