import { getPayload } from "payload";
import type { Blog } from "../payload-types";
import config from "../payload.config";

export async function getPayloadClient() {
  return await getPayload({
    config,
  });
}

export async function getAllBlogs(): Promise<Blog[]> {
  const payload = await getPayload({
    config,
  });

  const blogs = await payload.find({
    collection: "blogs",
    sort: "-date",
  });

  return blogs.docs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const payload = await getPayload({
    config,
  });

  const blogs = await payload.find({
    collection: "blogs",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return blogs.docs.length > 0 ? blogs.docs[0] : null;
}
