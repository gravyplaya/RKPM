export type Blog = {
  id: number;
  title: string;
  slug?: string | null;
  excerpt?: string; // Made optional to match collection
  coverImage?:
    | (number | null)
    | {
        id: number;
        alt: string;
        url?: string | null;
        filename?: string | null;
      };
  date: string;
  content?: any;
  updatedAt: string;
  createdAt: string;
};
