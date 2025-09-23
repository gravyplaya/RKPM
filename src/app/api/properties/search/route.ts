import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/utils/payload-utils';

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadClient();
    
    // Get search parameters from URL
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword') || '';
    const location = searchParams.get('location') || '';
    const category = searchParams.get('category') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const status = searchParams.get('status') || '';
    const bedrooms = searchParams.get('bedrooms') || '';
    const bathrooms = searchParams.get('bathrooms') || '';
    const garages = searchParams.get('garages') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const minArea = searchParams.get('minArea') || '';
    const maxArea = searchParams.get('maxArea') || '';
    const featured = searchParams.get('featured') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build the where clause for Payload CMS
    const where: any = {};

    if (keyword) {
      where.or = [
        { title: { contains: keyword } },
        { description: { contains: keyword } },
        { location: { contains: keyword } }
      ];
    }

    if (location) {
      where.location = { contains: location };
    }

    if (category) {
      where.category = { equals: category };
    }

    if (propertyType) {
      where.propertyType = { equals: propertyType };
    }

    if (status) {
      where.status = { equals: status };
    }

    if (bedrooms) {
      where.bedrooms = { equals: parseInt(bedrooms) };
    }

    if (bathrooms) {
      where.bathrooms = { equals: parseInt(bathrooms) };
    }

    if (garages) {
      where.garages = { equals: parseInt(garages) };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.greater_than_equal = parseFloat(minPrice);
      if (maxPrice) where.price.less_than_equal = parseFloat(maxPrice);
    }

    if (minArea || maxArea) {
      where.area = {};
      if (minArea) where.area.greater_than_equal = parseFloat(minArea);
      if (maxArea) where.area.less_than_equal = parseFloat(maxArea);
    }

    if (featured) {
      where.featured = { equals: featured === 'true' };
    }

    // Query properties from Payload CMS
    const result = await payload.find({
      collection: 'properties',
      where,
      sort: `${sortOrder === 'desc' ? '-' : ''}${sortBy}`,
      page,
      limit,
      depth: 1,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search properties' },
      { status: 500 }
    );
  }
}