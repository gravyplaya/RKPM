import { NextResponse } from "next/server";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blog", href: "/#blog" },
];

const features = [
  {
    id: 1,
    imgSrc: "/images/features/rating.svg",
    title: "Great Experience",
    description: "",
  },
  {
    id: 2,
    imgSrc: "/images/features/Give-Women's-Rights.svg",
    title: "Trusted Service",
    description: "",
  },
  {
    id: 3,
    imgSrc: "/images/features/live-chat.svg",
    title: "Instant Help",
    description: "",
  },
];

// Updated search options to match the new PayloadCMS structure
const searchOptions = {
  keywords: [{ placeholder: "Enter keywords..." }],
  locations: [
    { value: "", label: "All Locations" },
    { value: "California", label: "California" },
    { value: "Texas", label: "Texas" },
    { value: "New York", label: "New York" },
    { value: "Florida", label: "Florida" },
    { value: "Illinois", label: "Illinois" },
  ],
  categories: [
    { value: "", label: "All Categories" },
    { value: "office-suites", label: "Office Suites" },
    { value: "residential-suites", label: "Residential Suites" },
  ],
  propertyTypes: [
    { value: "", label: "All RK Suites Types" },
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "office", label: "Office" },
    { value: "shop", label: "Shop" },
    { value: "house", label: "House" },
    { value: "warehouse", label: "Warehouse" },
  ],
  statuses: [
    { value: "", label: "All Status" },
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
    { value: "rented", label: "Rented" },
    { value: "pending", label: "Pending" },
  ],
  bedrooms: [
    { value: "", label: "Any Bedrooms" },
    { value: "1", label: "1 Bedroom" },
    { value: "2", label: "2 Bedrooms" },
    { value: "3", label: "3 Bedrooms" },
    { value: "4", label: "4 Bedrooms" },
    { value: "5", label: "5+ Bedrooms" },
  ],
  bathrooms: [
    { value: "", label: "Any Bathrooms" },
    { value: "1", label: "1 Bathroom" },
    { value: "2", label: "2 Bathrooms" },
    { value: "3", label: "3 Bathrooms" },
    { value: "4", label: "4+ Bathrooms" },
  ],
  garages: [
    { value: "", label: "Any Garages" },
    { value: "0", label: "No Garage" },
    { value: "1", label: "1 Garage" },
    { value: "2", label: "2 Garages" },
    { value: "3", label: "3+ Garages" },
  ],
};

const data = [
  {
    src: "https://svgshare.com/i/187L.svg",
    src1: "https://svgshare.com/i/183P.svg",
    alt: "Image 1",
    name: "Apartment",
    count: 35,
  },
  {
    src: "https://svgshare.com/i/188i.svg",
    src1: "https://svgshare.com/i/185B.svg",
    alt: "Image 2",
    name: "Villa",
    count: 15,
  },
  {
    src: "https://svgshare.com/i/186r.svg",
    src1: "https://svgshare.com/i/185n.svg",
    alt: "Image 3",
    name: "Office",
    count: 26,
  },
  {
    src: "https://svgshare.com/i/187Z.svg",
    src1: "https://svgshare.com/i/184b.svg",
    alt: "Image 4",
    name: "Shop",
    count: 43,
  },
  {
    src: "https://svgshare.com/i/1881.svg",
    src1: "https://svgshare.com/i/183k.svg",
    alt: "Image 5",
    name: "House",
    count: 95,
  },
  {
    src: "https://svgshare.com/i/188C.svg",
    src1: "https://svgshare.com/i/184d.svg",
    alt: "Image 6",
    name: "Warehouse",
    count: 18,
  },
];

export const GET = async () => {
  return NextResponse.json({
    menuItems,
    features,
    searchOptions,
    data,
  });
};
