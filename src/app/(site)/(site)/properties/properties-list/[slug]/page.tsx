import React from 'react';
import TextSection from '@/app/(site)/components/property-details/text-section';
import PropertyImageCarousel from '@/app/(site)/components/property-details/PropertyImageCarousel';
import { normalizeImageUrl } from '@/utils/imageUtils';

async function getProperty(slug: string) {
  const isNumeric = /^\d+$/.test(slug);
  let property = null;
  let url = '';

  if (isNumeric) {
    url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/properties/${slug}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/properties?where[slug][equals]=${slug}`;
  }

  const res = await fetch(url, { cache: 'no-store' });

  if (!res.ok) {
    console.error('Failed to fetch property data');
    return null;
  }

  const data = await res.json();

  if (isNumeric) {
    property = data;
  } else {
    if (data.docs && data.docs.length > 0) {
      property = data.docs[0];
    }
  }

  if (property && property.image && typeof property.image === 'string') {
    const imageRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media/${property.image}`)
    if (imageRes.ok) {
      property.image = await imageRes.json()
    }
  }

  // Fetch images array
  if (property && property.images && Array.isArray(property.images)) {
    const fetchedImages = [];
    for (const img of property.images) {
      if (img.upload && typeof img.upload === 'string') {
        // Legacy case: upload is a string ID, need to fetch the media data
        const imgRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media/${img.upload}`);
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          fetchedImages.push({
            id: imgData.id,
            url: normalizeImageUrl(imgData.url),
            alt: imgData.alt || property.title
          });
        }
      } else if (img.upload && typeof img.upload === 'object' && img.upload.url) {
        // Current case: upload is already an object with complete media data
        fetchedImages.push({
          id: img.upload.id,
          url: normalizeImageUrl(img.upload.url),
          alt: img.upload.alt || property.title
        });
      }
    }
    property.images = fetchedImages;
  }

  return property
}

export default async function Details({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getProperty(slug);

  if (!item) {
    return (
      <div className="container mx-auto py-36 text-center">
        <h2 className="text-2xl font-bold">RK Suites not found</h2>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-cover pt-36 pb-20 relative bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden" >
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <h2 className="text-midnight_text text-4xl lg:text-[50px] leading-[1.2] md:mx-auto md:max-w-60% text-center relative font-bold dark:text-white"> {item?.title} </h2>
        </div>
      </section>
      <section>
        <div className='container mx-auto dark:bg-darkmode'>
          <PropertyImageCarousel
            images={item?.images || []}
            title={item?.title || ''}
            description={item?.description || ''}
          />
        </div>
      </section>
      <TextSection property={item} />
      {/* <CompanyInfo />
      <Tabbar />
      <Availability />
      <DiscoverProperties /> */}
    </div>
  );
}
