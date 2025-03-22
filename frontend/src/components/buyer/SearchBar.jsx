import React from "react";
import { Search, MapPin, Home, Building, DollarSign } from "lucide-react";

const SearchBar = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Search Container */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Location */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F3703A] transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-[#F3703A] focus:ring-2 focus:ring-[#F3703A]/20 outline-none transition-all duration-300"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F3703A] transition-colors duration-300" />
                  <select
                    className="w-full h-12 pl-12 pr-10 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-[#F3703A] focus:ring-2 focus:ring-[#F3703A]/20 outline-none transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-100"
                  >
                    <option value="">Select type</option>
                    <option value="apartment">Luxury Apartment</option>
                    <option value="house">Premium House</option>
                    <option value="villa">Elite Villa</option>
                    <option value="penthouse">Penthouse</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F3703A] transition-colors duration-300" />
                  <select
                    className="w-full h-12 pl-12 pr-10 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-[#F3703A] focus:ring-2 focus:ring-[#F3703A]/20 outline-none transition-all duration-300 appearance-none"
                  >
                    <option value="">Select range</option>
                    <option value="1">$100k - $500k</option>
                    <option value="2">$500k - $1M</option>
                    <option value="3">$1M - $5M</option>
                    <option value="4">$5M+</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="relative">
                <label className="block text-sm font-medium text-transparent mb-2">Search</label>
                <button
                  type="submit"
                  className="h-12 px-8 bg-[#F3703A] text-white rounded-xl flex items-center gap-2 transition-all duration-300 hover:bg-[#E65A2A] shadow-md hover:shadow-lg transform hover:scale-105 cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  <span className="font-medium">Search</span>
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500">Popular:</span>
              <div className="flex flex-wrap gap-2">
                {["Luxury Villa", "Modern Apartment", "Penthouse", "Beach House"].map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-[#F3703A] bg-gray-50 hover:bg-[#F3703A]/5 rounded-full transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
