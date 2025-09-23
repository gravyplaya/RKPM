export type propertyData = {
  id: string;
  image:
    | {
        url: string;
      }
    | string;
  title: string;
  price: string;
  category: string;
  category_img: string;
  rooms: number;
  bathrooms: number;
  location: string;
  area: string;
  tag: string;
  check: boolean;
  status: string;
  type: string;
  bedrooms: number;
  garages: number;
  region: string;
  name: string;
  slug: string;
};
