import type { CollectionConfig } from "payload";

export const Properties: CollectionConfig = {
  slug: "properties",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data && data.title && !data.slug) {
              data.slug = data.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            }
            return data?.slug;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "bedrooms",
      type: "number",
    },
    {
      name: "bathrooms",
      type: "number",
    },
    {
      name: "area",
      type: "number",
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "category",
      type: "select",
      options: [
        {
          label: "For Sale",
          value: "sale",
        },
        {
          label: "For Rent",
          value: "rent",
        },
      ],
    },
  ],
};
