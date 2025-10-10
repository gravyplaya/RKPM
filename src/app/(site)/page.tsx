import React from 'react';
import { Metadata } from "next";
import Hero from './components/home/hero';
import DiscoverProperties from './components/home/property-option';
import Listing from './components/home/property-list';
export const metadata: Metadata = {
  title: "RK Suites",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <DiscoverProperties />
      <Listing />
      {/* <Calculator />
      <Features />
      <History />
      <Testimonials />
      <CompanyInfo />
      <BlogSmall /> */}
    </main>
  )
}
