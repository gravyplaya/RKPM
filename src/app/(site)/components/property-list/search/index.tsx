"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroSub from "../../shared/hero-sub";
import PropertyCard from "../../home/property-list/property-card";

export default function AdvanceSearch({
  searchParams,
  properties,
}: {
  searchParams: any;
  properties: any[];
}) {
  const router = useRouter();
  const category = searchParams?.category || "";
  
  const [price, setPrice] = useState(50);
  const [price1, setPrice1] = useState(8000000);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState("none");
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState<any>({});
  const [filteredProperties, setFilteredProperties] =
    useState<any[]>(properties);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<any>({
    keyword: searchParams?.keyword || "",
    location: searchParams?.location || "",
    category: searchParams?.category || "",
    propertyType: searchParams?.propertyType || "",
    status: searchParams?.status || "",
    bedrooms: searchParams?.bedrooms || "",
    bathrooms: searchParams?.bathrooms || "",
    garages: searchParams?.garages || "",
    minPrice: searchParams?.minPrice || "",
    maxPrice: searchParams?.maxPrice || "",
  });

  useEffect(() => {
    const fetchSearchOptions = async () => {
      try {
        const res = await fetch("/api/properties/search-options");
        if (!res.ok) throw new Error("Failed to fetch search options");

        const data = await res.json();
        setSearchOptions(data || {});
      } catch (error) {
        console.error("Error fetching search options:", error);
      }
    };

    fetchSearchOptions();
  }, []);

  useEffect(() => {
    // Perform search when filters change
    performSearch();
  }, [filters]);

  const updateFilter = (key: string, value: any) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const performSearch = async () => {
    setLoading(true);
    try {
      // Build search parameters
      const searchParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
          searchParams.append(key, value.toString());
        }
      });

      // Add price range from sliders
      if (price > 50) {
        searchParams.append("minPrice", price.toString());
      }
      if (price1 < 8000000) {
        searchParams.append("maxPrice", price1.toString());
      }

      const res = await fetch(
        `/api/properties/search?${searchParams.toString()}`
      );
      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();
      setFilteredProperties(data.docs || []);
    } catch (error) {
      console.error("Search error:", error);
      // Fallback to client-side filtering if API fails
      const filtered = properties.filter((property: any) => {
        const matchesKeyword =
          !filters.keyword ||
          property.title
            ?.toLowerCase()
            .includes(filters.keyword.toLowerCase()) ||
          property.description
            ?.toLowerCase()
            .includes(filters.keyword.toLowerCase());

        const matchesLocation =
          !filters.location ||
          property.location
            ?.toLowerCase()
            .includes(filters.location.toLowerCase());

        const matchesCategory =
          !filters.category || property.category === filters.category;
        const matchesPropertyType =
          !filters.propertyType ||
          property.propertyType === filters.propertyType;
        const matchesStatus =
          !filters.status || property.status === filters.status;
        const matchesBedrooms =
          !filters.bedrooms ||
          property.bedrooms?.toString() === filters.bedrooms;
        const matchesBathrooms =
          !filters.bathrooms ||
          property.bathrooms?.toString() === filters.bathrooms;
        const matchesGarages =
          !filters.garages || property.garages?.toString() === filters.garages;

        return (
          matchesKeyword &&
          matchesLocation &&
          matchesCategory &&
          matchesPropertyType &&
          matchesStatus &&
          matchesBedrooms &&
          matchesBathrooms &&
          matchesGarages
        );
      });
      setFilteredProperties(filtered);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/properties/properties-list", text: "Property List" },
  ];

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handlePriceChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice1(Number(event.target.value));
  };

  const handleSelectChange = (key: any, value: any) => {
    updateFilter(key, value);
  };

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  const handleFindProperty = () => {
    performSearch();
  };

  // Sort logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const titleA = a.title?.toLowerCase() || "";
    const titleB = b.title?.toLowerCase() || "";

    if (sortOrder === "asc") {
      return titleA.localeCompare(titleB);
    } else if (sortOrder === "desc") {
      return titleB.localeCompare(titleA);
    }
    return 0; // no sort
  });

  const filteredCount = sortedProperties.length;

  const renderSearchForm = () => (
    <div className="flex flex-col gap-6">
      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Keywords
        </label>
        <div className="relative inline-block w-full">
          <input
            placeholder="Enter keywords..."
            type="text"
            value={filters.keyword}
            className="py-3 w-full pl-3 pr-9 border border-border dark:bg-semidark dark:border-dark_border dark:focus:border-primary  !rounded-lg focus-visible:outline-none focus:border-primary"
            onChange={(e) => updateFilter("keyword", e.target.value)}
          />
        </div>
      </div>

      {/* Location dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Location
        </label>
        <div className="relative inline-block w-full">
          <select
            value={filters.location}
            className="custom-select py-3 text-gray dark:text-gray w-full pl-3 pr-9 border border-border dark:border-dark_border dark:focus:border-primary dark:bg-semidark  rounded-lg focus:border-primary"
            onChange={(e) => updateFilter("location", e.target.value)}
          >
            <option value="">All Locations</option>
            {searchOptions?.locations?.map((option: any, index: any) => (
              <option key={`location-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <div className="relative inline-block w-full">
          <select
            value={filters.category}
            className="custom-select py-3 text-gray dark:text-gray w-full pl-3 pr-9 border border-border dark:border-dark_border dark:focus:border-primary dark:bg-semidark  rounded-lg focus:border-primary"
            onChange={(e) => updateFilter("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {searchOptions?.categories?.map((option: any, index: any) => (
              <option key={`category-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Type dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Property Type
        </label>
        <div className="relative inline-block w-full">
          <select
            value={filters.propertyType}
            className="custom-select py-3 text-gray dark:text-gray w-full pl-3 pr-9 border border-border dark:border-dark_border dark:focus:border-primary dark:bg-semidark  rounded-lg focus:border-primary"
            onChange={(e) => updateFilter("propertyType", e.target.value)}
          >
            <option value="">All Property Types</option>
            {searchOptions?.propertyTypes?.map((option: any, index: any) => (
              <option key={`propertyType-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <div className="relative inline-block w-full">
          <select
            value={filters.status}
            className="custom-select py-3 text-gray dark:text-gray w-full pl-3 pr-9 border border-border dark:border-dark_border dark:focus:border-primary dark:bg-semidark  rounded-lg focus:border-primary"
            onChange={(e) => updateFilter("status", e.target.value)}
          >
            <option value="">All Status</option>
            {searchOptions?.statuses?.map((option: any, index: any) => (
              <option key={`status-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bedrooms dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bedrooms
        </label>
        <div className="relative inline-block w-full">
          <select
            value={filters.bedrooms}
            className="custom-select py-3 text-gray dark:text-gray w-full pl-3 pr-9 border border-border dark:border-dark_border dark:focus:border-primary dark:bg-semidark  rounded-lg focus:border-primary"
            onChange={(e) => updateFilter("bedrooms", e.target.value)}
          >
            <option value="">Any Bedrooms</option>
            {searchOptions?.bedrooms?.map((option: any, index: any) => (
              <option key={`bedrooms-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bathrooms dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bathrooms
        </label>
        <div className="relative inline-block w-full">
          <select
            value={filters.bathrooms}
            className="custom-select py-3 text-gray dark:text-gray w-full pl-3 pr-9 border border-border dark:border-dark_border dark:focus:border-primary dark:bg-semidark  rounded-lg focus:border-primary"
            onChange={(e) => updateFilter("bathrooms", e.target.value)}
          >
            <option value="">Any Bathrooms</option>
            {searchOptions?.bathrooms?.map((option: any, index: any) => (
              <option key={`bathrooms-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Garages dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Garages
        </label>
        <div className="relative inline-block w-full">
          <select
            value={filters.garages}
            className="custom-select py-3 text-gray dark:text-gray w-full pl-3 pr-9 border border-border dark:border-dark_border dark:focus:border-primary dark:bg-semidark  rounded-lg focus:border-primary"
            onChange={(e) => updateFilter("garages", e.target.value)}
          >
            <option value="">Any Garages</option>
            {searchOptions?.garages?.map((option: any, index: any) => (
              <option key={`garages-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price range slider */}
      <div>
        <p className="text-gray dark:text-gray font-medium">
          Min Price: ${price}
        </p>
        <input
          type="range"
          min="50"
          max="750000"
          step="1000"
          value={price}
          onChange={handlePriceChange}
          className="w-full h-0.5 bg-lightborder dark:bg-dark_border mt-2 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Max price range slider */}
      <div>
        <p className="text-gray dark:text-gray">Max Price: ${price1}</p>
        <input
          type="range"
          min="500000"
          max="8000000"
          step="1000"
          value={price1}
          onChange={handlePriceChange1}
          className="w-full h-0.5 bg-lightborder dark:bg-dark_border mt-2 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Search button */}
      <div>
        <button
          onClick={handleFindProperty}
          disabled={loading}
          className="bg-primary hover:bg-blue-700 text-white w-full py-3 px-6 text-base rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Find Property"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <HeroSub
        title={
          filters?.category
            ? `Properties for ${filters.category}`
            : "Property List"
        }
        description="Find your perfect property with our advanced search filters"
        breadcrumbLinks={breadcrumbLinks}
      />
      <section className="dark:bg-darkmode px-4">
        <div className="lg:max-w-screen-xl max-w-screen-md mx-auto">
          <div className="flex lg:hidden justify-between items-center mb-4">
            <span className="text-2xl ml-4 ">Advanced Filter</span>
            <button
              onClick={toggleOffCanvas}
              className="bg-blue-500 mr-4 text-white py-3 px-6 text-base rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"
                />
              </svg>
            </button>
          </div>

          {isOffCanvasOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" />
          )}

          <div
            onClick={toggleOffCanvas}
            className={`fixed inset-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 transition-transform transform ${isOffCanvasOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
          >
            <div className="absolute top-0 right-0 w-3/4 max-w-xs bg-white dark:bg-semidark shadow-lg h-full">
              <div className="py-14 px-8">
                <button
                  onClick={toggleOffCanvas}
                  className="absolute top-4 right-4 text-gray dark:text-gray-500"
                >
                  ✕
                </button>
                <p className="mb-6 text-2xl font-semibold">Advanced Search</p>
                {renderSearchForm()}
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 gap-4">
            <div className="hidden lg:block lg:col-span-4">
              <div className="py-14 px-8 bg-white dark:bg-semidark shadow-property rounded-lg">
                <p className="mb-6 text-2xl font-semibold">Advanced Search</p>
                {renderSearchForm()}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <div className="flex lg:flex-nowrap flex-wrap lg:gap-0 gap-6 w-full justify-between items-center pb-8">
                <div className="flex w-full justify-between px-4 flex-1">
                  <h5 className="text-xl ">{filteredCount} Properties Found</h5>
                  <p className="flex text-gray dark:text-gray gap-2 items-center">
                    Sort by
                    <span>
                      <Icon
                        icon="fa6-solid:arrow-trend-up"
                        width="20"
                        height="20"
                        className=""
                      />
                    </span>
                  </p>
                </div>
                <div className="flex-1 flex gap-3 px-4">
                  <select
                    name="short"
                    className="custom-select border border-border dark:border-dark_border dark:bg-darkmode text-midnight_text focus:border-primary rounded-lg p-3 pr-9"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="none">Sort by Title</option>
                    <option value="asc">Title (A-Z)</option>
                    <option value="desc">Title (Z-A)</option>
                  </select>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`${viewMode == "list" ? "bg-primary text-white" : "bg-transparent text-primary"} p-3 border border-primary text-primary hover:text-white rounded-lg hover:bg-primary text-base`}
                  >
                    <span>
                      <Icon
                        icon="famicons:list"
                        width="21"
                        height="21"
                        className=""
                      />
                    </span>
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`${viewMode == "grid" ? "bg-primary text-white" : "bg-transparent text-primary"} p-3 border border-primary text-primary hover:text-white rounded-lg hover:bg-primary text-base`}
                  >
                    <span>
                      <Icon
                        icon="ion:grid-sharp"
                        width="21"
                        height="21"
                        className=""
                      />
                    </span>
                  </button>
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-lg">Loading properties...</div>
                </div>
              ) : sortedProperties.length > 0 ? (
                <div
                  className={` ${viewMode === "grid" ? "grid sm:grid-cols-2" : "flex flex-col"} gap-6 px-4`}
                >
                  {sortedProperties.map((data: any, index: any) => (
                    <PropertyCard
                      key={data.id || index}
                      property={data}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-5 items-center justify-center pt-20">
                  <Image
                    src={"/images/not-found/no-results.png"}
                    alt="no-result"
                    width={100}
                    height={100}
                  />
                  <p className="text-gray">
                    No properties found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
