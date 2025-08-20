import React from 'react';
import Image from 'next/image';
import CompanyInfo from '@/app/(site)/components/home/info';
import Availability from '@/app/(site)/components/property-details/availability';
import Tabbar from '@/app/(site)/components/property-details/tabbar';
import TextSection from '@/app/(site)/components/property-details/text-section';
import DiscoverProperties from '@/app/(site)/components/home/property-option';

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

  return property
}

export default async function Details({ params }: { params: { slug: string } }) {
  const item = await getProperty(params.slug);

  if (!item) {
    return (
      <div className="container mx-auto py-36 text-center">
        <h2 className="text-2xl font-bold">Property not found</h2>
      </div>
    );
  }

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/property-list", text: "Property Details" },
  ];
  return (
    <div>
      <section className="bg-cover pt-36 pb-20 relative bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden" >
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <h2 className="text-midnight_text text-4xl lg:text-[50px] leading-[1.2] md:mx-auto md:max-w-60% text-center relative font-bold dark:text-white"> {item?.title} </h2>
        </div>
      </section>
      <section>
        <div className='container mx-auto dark:bg-darkmode'>
          <div className="h-[580px] max-w-5xl mx-auto w-full">
            {item?.image?.url &&
              <Image
                src={item?.image?.url}
                alt={item?.title}
                width={1000}
                height={600}
                className='h-full w-full object-cover rounded-lg'
              />}
          </div>
        </div>
      </section>
      <TextSection property={item} />
      <CompanyInfo />
      <Tabbar />
      <Availability />
      <DiscoverProperties />
    </div>
  );
}
