import { Property } from '@/payload-types';
import React from 'react';

export default function TextSection({ property }: { property: Property }) {

    return (
        <section className='py-10 dark:bg-darkmode'>
            <div className='max-w-4xl mx-auto text-left text-gray' data-aos='fade-up'>
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">Description</h3>
                <p className='text-base sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 md:px-8'>
                    {property.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 px-4 sm:px-6 md:px-8">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="font-bold text-midnight_text dark:text-white">Price</p>
                        <p>${property.price?.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="font-bold text-midnight_text dark:text-white">Bedrooms</p>
                        <p>{property.bedrooms}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="font-bold text-midnight_text dark:text-white">Bathrooms</p>
                        <p>{property.bathrooms}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="font-bold text-midnight_text dark:text-white">Area</p>
                        <p>{property.area} sq ft</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <p className="font-bold text-midnight_text dark:text-white">Location</p>
                        <p>{property.location}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
