'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 px-6">
      <div className="container mx-auto text-center">
        {/* Heading and Description */}
        <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
          Find Your Path at <span className="text-yellow-500">College Portal</span>
        </h2>
        <p className="text-lg text-blue-700 mb-8">
          Explore courses, programs, and events. Begin your journey today with a simple search.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for courses, programs, or events..."
            className="w-full py-4 px-6 text-lg text-blue-900 rounded-full border border-blue-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 bg-yellow-500 hover:bg-yellow-400 text-white px-6 rounded-full text-xl font-semibold flex items-center justify-center transition-all duration-300"
          >
            <FiSearch />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Searchbar;
