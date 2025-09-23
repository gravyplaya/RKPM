import { NextResponse } from "next/server";
import { getPayloadClient } from "@/utils/payload-utils";

export async function GET() {
  try {
    const payload = await getPayloadClient();

    // Query all properties from Payload CMS
    const result = await payload.find({
      collection: "properties",
      sort: "-createdAt",
      depth: 1,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Properties fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}
