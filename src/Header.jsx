import React, { useState } from 'react';
import { Search, X, BookOpen } from 'lucide-react';

const Header = ({search, setSearch, surah, setFilteredSearch}) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearch = () => {
    if (search.trim() === '') {
      setFilteredSearch(surah);
      return;
    }
    
    const filteredSurah = surah.filter((data) =>
      data.englishName.toLowerCase().includes(search.toLowerCase()) ||
      data.name.includes(search) ||
      data.number.toString().includes(search)
    );
    setFilteredSearch(filteredSurah);
  };

  const handleClearSearch = () => {
    setSearch('');
    setFilteredSearch(surah);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Main Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          {/* Title Section */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <BookOpen className="text-white" size={28} />
            </div>
            <div className="text-center">
              <h1 
                className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-1"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Quran (Hindi Translation)
              </h1>
              <p 
                className="text-white/95 text-lg md:text-xl font-semibold tracking-wide"
                style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
              >
                कुरान हिंदी अनुवाद
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="relative max-w-2xl mx-auto">
            <div 
              className={`flex items-center gap-2 bg-white rounded-xl shadow-lg transition-all duration-300 ${
                searchFocused ? 'ring-4 ring-emerald-300 ring-opacity-50' : ''
              }`}
            >
              <div className="pl-4 text-gray-400">
                <Search size={20} />
              </div>
              
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search by Surah name, number, or Arabic..."
                className="flex-1 py-3 px-2 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-base"
              />
              
              {search && (
                <button
                  onClick={handleClearSearch}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Clear search"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              )}
              
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-r-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Search size={18} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-4 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>114 Surahs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>6,236 Ayahs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>30 Juz</span>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="h-4 bg-gradient-to-b from-transparent to-gray-50"></div>
      </div>
    </>
  );
};

export default Header;