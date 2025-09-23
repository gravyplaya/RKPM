import type { CollectionConfig } from "payload";

export const Properties: CollectionConfig = {
  slug: "properties",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
      name: "images",
      type: "array",
      fields: [
        {
          name: "upload",
          type: "upload",
          relationTo: "media",
        },
      ],
      maxRows: 10,
      required: false,
      validate: (value) => {
        if (!value || !Array.isArray(value)) return true;
        const ids = value.map((item) => item);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
          return "Duplicate images are not allowed. Each image must be unique.";
        }
        return true;
      },
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
      name: "garages",
      type: "number",
    },
    {
      name: "area",
      type: "number",
    },
    {
      name: "location",
      type: "text",
      required: true,
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
    {
      name: "propertyType",
      type: "select",
      options: [
        {
          label: "Apartment",
          value: "apartment",
        },
        {
          label: "Villa",
          value: "villa",
        },
        {
          label: "Office",
          value: "office",
        },
        {
          label: "Shop",
          value: "shop",
        },
        {
          label: "House",
          value: "house",
        },
        {
          label: "Warehouse",
          value: "warehouse",
        },
      ],
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Available",
          value: "available",
        },
        {
          label: "Sold",
          value: "sold",
        },
        {
          label: "Rented",
          value: "rented",
        },
        {
          label: "Pending",
          value: "pending",
        },
      ],
      defaultValue: "available",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "yearBuilt",
      type: "number",
    },
  ],
};
