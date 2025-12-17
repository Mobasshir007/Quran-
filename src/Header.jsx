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
        <div className="w-full px-3 sm:px-4 py-4 sm:py-6">
          {/* Title Section */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg flex-shrink-0">
              <BookOpen className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-center min-w-0">
              <h1 
                className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow-lg mb-0.5 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Quran (Hindi<span className="hidden xs:inline"> Translation</span>)
              </h1>
              <p 
                className="text-white/95 text-xs sm:text-sm md:text-lg font-semibold tracking-wide"
                style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
              >
                कुरान हिंदी
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="relative w-full mb-3 sm:mb-4">
            <div 
              className={`flex items-center gap-0 sm:gap-1 bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg transition-all duration-300 overflow-hidden ${
                searchFocused ? 'ring-4 ring-emerald-300 ring-opacity-50' : ''
              }`}
            >
              {/* Search Icon - Left */}
              <div className="pl-2 sm:pl-3 text-gray-400 shrink-0 flex items-center justify-center">
  <Search size={16} className="sm:w-5 sm:h-5" />
</div>
              
              {/* Input Field */}
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search..."
                className="flex-1 py-2 sm:py-2.5 px-2 sm:px-3 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-xs sm:text-sm md:text-base min-w-0"
              />
              
              {/* Clear Button - Mobile optimized */}
              {search && (
                <button
                  onClick={handleClearSearch}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors flex-shrink-0"
                  title="Clear search"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </button>
              )}
              
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-2 sm:px-5 py-2 sm:py-2.5 rounded-none sm:rounded-r-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1 flex-shrink-0 h-full"
              >
                <Search size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-xs sm:text-sm">Search</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-3 sm:gap-6 text-white/90 text-xs sm:text-sm flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">114 Surahs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">6,236 Ayahs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0"></div>
              <span className="whitespace-nowrap">30 Juz</span>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="h-2 sm:h-4 bg-gradient-to-b from-transparent to-gray-50"></div>
      </div>
    </>
  );
};

export default Header;