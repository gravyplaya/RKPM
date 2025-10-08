"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [propertiesData, setPropertiesData] = useState<any[]>([])
  const [searchOptions, setSearchOptions] = useState<any>({});
  const [activeTab, setActiveTab] = useState("office-suites");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch properties for suggestions
        const propertiesRes = await fetch('/api/propertydata')
        if (propertiesRes.ok) {
          const propertiesData = await propertiesRes.json()
          setPropertiesData(propertiesData || [])
        }

        // Fetch search options from PayloadCMS
        const optionsRes = await fetch('/api/properties/search-options')
        if (optionsRes.ok) {
          const optionsData = await optionsRes.json()
          setSearchOptions(optionsData || {})
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const handleSearch = async () => {
    if (location.trim() === '') {
      setError('Please enter a location to search.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Build search parameters
      const searchParams = new URLSearchParams({
        category: activeTab,
        location: location,
      });

      // Navigate to search results with the search parameters
      router.push(`/properties/properties-list?${searchParams.toString()}`);
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get location suggestions from both properties data and search options
  const locationSuggestions = Array.from(new Set([
    ...propertiesData.map((item) => item.location).filter(Boolean),
    ...((searchOptions.locations || []).map((loc: any) => loc.value).filter(Boolean))
  ]));

  const filteredSuggestions = locationSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(location.toLowerCase())
  );

  const handleSelect = (value: any) => {
    setLocation(value);
    setShowSuggestions(false);
  };

  return (
    <section className="relative pt-44 pb-0 bg-no-repeat bg-cover bg-center bg-fixed overflow-x-hidden" 
             style={{ backgroundImage: 'url("/images/theraj/front3.jpg")', backgroundPositionY: '-300px' }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 from-10% via-black/20 to-black/60 to-90%"></div>
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10">
        <div className="grid lg:grid-cols-12 grid-cols-1">
          <div
            className="flex flex-col col-span-6 justify-center items-start"
            data-aos="fade-right"
          >
            <div className="mb-8">
              <h1 className="md:text-[50px] leading-[1.2] text-4xl ml-4 text-white font-bold drop-shadow-lg">
                Find Your Next Home
              </h1>
            </div>
            <div className="max-w-xl ml-4 sm:w-full">
              <div className="flex gap-1 bg-trasperent">
                <button
                  type="button"
                  className={`px-9 py-3 text-xl rounded-t-md focus:outline-none ${activeTab === "office-suites"
                    ? "bg-white/90 dark:bg-darkmode/90 text-midnight_text dark:text-white border-b border-primary"
                    : "text-white bg-white/30 dark:bg-darkmode/30 backdrop-blur-sm"
                    }`}
                  onClick={() => handleTabChange("office-suites")}
                >
                  Office Suites
                </button>
                <button
                  type="button"
                  className={`px-9 py-3 text-xl rounded-t-md focus:outline-none ${activeTab === "residential-suites"
                    ? "bg-white/90 dark:bg-darkmode/90 text-midnight_text dark:text-white border-b border-primary"
                    : "text-white bg-white/30 dark:bg-darkmode/30 backdrop-blur-sm"
                    }`}
                  onClick={() => handleTabChange("residential-suites")}
                >
                  Residential Suites
                </button>
              </div>
              <div className="bg-white/95 dark:bg-darkmode/95 backdrop-blur-sm rounded-b-lg rounded-tr-lg">
                {(activeTab === "office-suites" || activeTab === "residential-suites") && (
                  <div className="bg-white/95 dark:bg-darkmode/95 rounded-b-lg rounded-tr-lg shadow-lg p-8 pb-10">
                    <div className="relative rounded-lg border-0 my-2">
                      <div className="relative flex items-center">
                        <div className="absolute left-0 p-4">
                          <Image
                            src="/images/svgs/icon-location.svg"
                            alt="Icon"
                            height={24}
                            width={24}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Search Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                          className="py-5 pr-3 pl-14 w-full rounded-lg text-black border border-border dark:text-white dark:border-dark_border focus:border-primary dark:focus:border-primary focus-visible:outline-none dark:bg-[#0c121e]"
                        />

                        {showSuggestions && filteredSuggestions.length > 0 && (
                          <div className="absolute left-0 right-0 top-full -mt-2 bg-white dark:bg-semidark border border-border rounded-md z-10 max-h-[130px] overflow-y-auto">
                            <ul className="flex flex-col gap-2 py-4 px-8">
                              {filteredSuggestions.slice(0, 5).map((item, index) => (
                                <li
                                  key={`suggestion-${item.replace(/\s+/g, '-').toLowerCase()}-${index}`}
                                >
                                  <button
                                    type="button"
                                    className="cursor-pointer text-midnight_text dark:text-white text-lg hover:text-primary dark:hover:text-primary text-left w-full p-0 border-none bg-transparent"
                                    onClick={() => handleSelect(item)}
                                  >{item}</button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                    </div>
                    <div className="mt-6 flex flex-col-reverse gap-4 md:justify-between">
                      <div className="flex flex-col md:flex-row md:gap-4 w-full">
                        <button 
                          type="button"
                          onClick={handleSearch} 
                          disabled={loading}
                          className="flex-1 py-2 md:py-4 text-lg md:text-xl px-4 md:px-8 bg-primary text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-2 md:mb-0 md:mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Searching...' : 'Search'}
                        </button>
                        <button 
                          type="button"
                          onClick={() => router.push(`/properties/properties-list?category=${activeTab}`)} 
                          className="flex-1 py-2 md:py-4 text-lg md:text-xl px-4 md:px-8 bg-skyBlue/80 dark:bg-skyBlue/80 dark:hover:bg-skyBlue dark:hover:border-primary border border-transparent text-white rounded-lg hover:bg-skyBlue transition duration-300 text-nowrap"
                        >
                          Advanced Search
                        </button>
                      </div>
                      {error && (
                        <p className="text-red-600 text-sm mt-2 md:mt-0">{error}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-start ml-4 mt-8 mb-12 gap-3">
              {/* <div className="flex space-x-2" data-aos="fade-left">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                </svg>
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                </svg>
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                </svg>
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                </svg>
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                </svg>
              </div>
              <div data-aos="fade-left">
                <p className="text-lg dark:text-white text-black">
                  4.9/5
                  <span className="text-gray-400"> - from 658 reviews</span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;