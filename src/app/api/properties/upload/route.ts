import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const propertyId = formData.get("propertyId") as string;

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const files = formData.getAll("images") as File[];
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "At least one image file is required" },
        { status: 400 }
      );
    }

    if (files.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 images allowed" },
        { status: 400 }
      );
    }

    // Validate file types
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        return NextResponse.json(
          { error: "File size too large. Maximum 10MB per file." },
          { status: 400 }
        );
      }
    }

    const payload = await getPayload({ config });

    // Fetch the property
    const property = await payload.findByID({
      collection: "properties",
      id: propertyId,
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Check current images count
    const currentImagesCount = (property as any).images?.length || 0;
    if (currentImagesCount + files.length > 10) {
      return NextResponse.json(
        {
          error: `Cannot upload ${files.length} images. Property already has ${currentImagesCount} images, maximum total is 10.`,
        },
        { status: 400 }
      );
    }

    // Check for duplicate filenames in existing media
    const filenames = files.map((file) => file.name);
    const existingMedia = await payload.find({
      collection: "media",
      where: {
        filename: {
          in: filenames,
        },
      },
    });

    if (existingMedia.docs.length > 0) {
      const duplicateNames = existingMedia.docs
        .map((doc) => doc.filename)
        .join(", ");
      return NextResponse.json(
        {
          error: `Duplicate images found: ${duplicateNames}. Please rename files to avoid duplicates.`,
        },
        { status: 400 }
      );
    }

    const uploadedMediaIds: number[] = [];

    // Process each file
    for (const file of files) {
      // Convert File to buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Compress image with sharp
      const compressedBuffer = await sharp(buffer)
        .resize(1200, null, { withoutEnlargement: true }) // Max width 1200px, maintain aspect ratio
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();

      // Upload to Payload Media collection
      const mediaDoc = await payload.create({
        collection: "media",
        data: {
          alt: file.name, // Use filename as alt text
        },
        file: {
          data: compressedBuffer,
          mimetype: "image/jpeg",
          name: file.name,
          size: compressedBuffer.length,
        },
      });

      uploadedMediaIds.push(mediaDoc.id);
    }

    // Update property's images array
    const updatedImages = [
      ...((property as any).images || []),
      ...uploadedMediaIds.map((id) => ({ upload: id })),
    ];

    await payload.update({
      collection: "properties",
      id: propertyId,
      data: {
        images: updatedImages,
      } as any,
    });

    return NextResponse.json({
      message: `Successfully uploaded ${files.length} images`,
      uploadedImages: uploadedMediaIds.length,
      totalImages: updatedImages.length,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
