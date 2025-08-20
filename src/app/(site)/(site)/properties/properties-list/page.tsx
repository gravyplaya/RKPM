import React from 'react';
import { Metadata } from "next";
import AdvanceSearch from '@/app/(site)/components/property-list/search';

export const metadata: Metadata = {
  title: "Properties List",
};

async function getProperties() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/properties`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  const data = await res.json()
  return data.docs
}

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const properties = await getProperties();
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <AdvanceSearch searchParams={resolvedSearchParams} properties={properties} />
    </>
  );
};

export default Page;
