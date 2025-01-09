// SearchBar.js - Enhanced version
import React, { useState } from "react";
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto group">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 pl-12 bg-white/90 text-gray-800 backdrop-blur-sm rounded-lg 
                 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-transparent transition-all duration-300 
                 placeholder-gray-500"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 
                        h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 
                 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                 px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 
                 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;

