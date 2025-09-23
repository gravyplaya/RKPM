// Utility functions for property search

export interface SearchFilters {
  keyword?: string;
  location?: string;
  category?: string;
  propertyType?: string;
  status?: string;
  bedrooms?: string;
  bathrooms?: string;
  garages?: string;
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export const buildSearchQuery = (filters: SearchFilters): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== '' && value !== 'undefined') {
      params.append(key, value.toString());
    }
  });
  
  return params.toString();
};

export const parseSearchParams = (searchParams: any): SearchFilters => {
  return {
    keyword: searchParams?.keyword || '',
    location: searchParams?.location || '',
    category: searchParams?.category || '',
    propertyType: searchParams?.propertyType || '',
    status: searchParams?.status || '',
    bedrooms: searchParams?.bedrooms || '',
    bathrooms: searchParams?.bathrooms || '',
    garages: searchParams?.garages || '',
    minPrice: searchParams?.minPrice || '',
    maxPrice: searchParams?.maxPrice || '',
    minArea: searchParams?.minArea || '',
    maxArea: searchParams?.maxArea || '',
    featured: searchParams?.featured || '',
    sortBy: searchParams?.sortBy || 'createdAt',
    sortOrder: searchParams?.sortOrder || 'desc',
    page: searchParams?.page || '1',
    limit: searchParams?.limit || '10',
  };
};

export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`;
  } else {
    return `$${price}`;
  }
};

export const formatArea = (area: number): string => {
  return `${area.toLocaleString()} sq ft`;
};

// Client-side filtering fallback function
export const filterPropertiesClientSide = (properties: any[], filters: SearchFilters) => {
  return properties.filter((property: any) => {
    const matchesKeyword = !filters.keyword || 
      property.title?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
      property.description?.toLowerCase().includes(filters.keyword.toLowerCase());
    
    const matchesLocation = !filters.location || 
      property.location?.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesCategory = !filters.category || property.category === filters.category;
    const matchesPropertyType = !filters.propertyType || property.propertyType === filters.propertyType;
    const matchesStatus = !filters.status || property.status === filters.status;
    const matchesBedrooms = !filters.bedrooms || property.bedrooms?.toString() === filters.bedrooms;
    const matchesBathrooms = !filters.bathrooms || property.bathrooms?.toString() === filters.bathrooms;
    const matchesGarages = !filters.garages || property.garages?.toString() === filters.garages;
    
    const matchesMinPrice = !filters.minPrice || property.price >= parseInt(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || property.price <= parseInt(filters.maxPrice);
    
    const matchesMinArea = !filters.minArea || property.area >= parseInt(filters.minArea);
    const matchesMaxArea = !filters.maxArea || property.area <= parseInt(filters.maxArea);
    
    const matchesFeatured = filters.featured !== 'true' || property.featured === true;

    return matchesKeyword && matchesLocation && matchesCategory && 
           matchesPropertyType && matchesStatus && matchesBedrooms && 
           matchesBathrooms && matchesGarages && matchesMinPrice && 
           matchesMaxPrice && matchesMinArea && matchesMaxArea && matchesFeatured;
  });
};