import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/utils/payload-utils';

export async function GET() {
  try {
    const payload = await getPayloadClient();

    // Get unique locations from properties
    const properties = await payload.find({
      collection: 'properties',
      limit: 1000, // Get all properties to extract unique locations
      depth: 0, // Only get basic fields
    });

    const uniqueLocations = Array.from(
      new Set(
        properties.docs
          .map((property: any) => property.location)
          .filter((location: string) => location && location.trim() !== '')
      )
    ).map((location: string) => ({
      value: location,
      label: location,
    }));

    // Define static search options
    const searchOptions = {
      locations: uniqueLocations,
      propertyTypes: [
        { value: 'house', label: 'House' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'villa', label: 'Villa' },
        { value: 'studio', label: 'Studio' },
        { value: 'loft', label: 'Loft' },
        { value: 'penthouse', label: 'Penthouse' },
      ],
      categories: [
        { value: 'For Sale', label: 'For Sale' },
        { value: 'For Rent', label: 'For Rent' },
      ],
      statuses: [
        { value: 'available', label: 'Available' },
        { value: 'sold', label: 'Sold' },
        { value: 'rented', label: 'Rented' },
        { value: 'pending', label: 'Pending' },
      ],
      bedrooms: [
        { value: '1', label: '1 Bedroom' },
        { value: '2', label: '2 Bedrooms' },
        { value: '3', label: '3 Bedrooms' },
        { value: '4', label: '4 Bedrooms' },
        { value: '5', label: '5+ Bedrooms' },
      ],
      bathrooms: [
        { value: '1', label: '1 Bathroom' },
        { value: '2', label: '2 Bathrooms' },
        { value: '3', label: '3 Bathrooms' },
        { value: '4', label: '4+ Bathrooms' },
      ],
      garages: [
        { value: '0', label: 'No Garage' },
        { value: '1', label: '1 Garage' },
        { value: '2', label: '2 Garages' },
        { value: '3', label: '3+ Garages' },
      ],
      keywords: [
        { value: 'luxury', label: 'Luxury' },
        { value: 'modern', label: 'Modern' },
        { value: 'spacious', label: 'Spacious' },
        { value: 'furnished', label: 'Furnished' },
        { value: 'pool', label: 'Pool' },
        { value: 'garden', label: 'Garden' },
        { value: 'parking', label: 'Parking' },
        { value: 'balcony', label: 'Balcony' },
      ],
      priceRanges: [
        { value: '0-100000', label: 'Under $100,000' },
        { value: '100000-300000', label: '$100,000 - $300,000' },
        { value: '300000-500000', label: '$300,000 - $500,000' },
        { value: '500000-1000000', label: '$500,000 - $1,000,000' },
        { value: '1000000-2000000', label: '$1,000,000 - $2,000,000' },
        { value: '2000000+', label: '$2,000,000+' },
      ],
    };

    return NextResponse.json(searchOptions);
  } catch (error) {
    console.error('Error fetching search options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search options' },
      { status: 500 }
    );
  }
}