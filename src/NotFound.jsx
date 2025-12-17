import React from 'react';
import { SearchX, AlertCircle, BookOpen } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
          {/* Icon Animation */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-pink-500 rounded-full p-6">
              <SearchX className="text-white" size={48} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            No Results Found
          </h2>

          {/* Arabic Text */}
          <p 
            className="text-2xl mb-4 text-gray-600"
            style={{ direction: "rtl", fontFamily: "Traditional Arabic, Arial" }}
          >
           परिणाम उपलब्ध नहीं हैं
          </p>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            We couldn't find any Surah matching your search. Please try a different search term.
          </p>

          {/* Suggestions Box */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-200 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
              <div className="text-left">
                <h3 className="font-semibold text-emerald-900 mb-2">Search Tips:</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Try searching by Surah name (e.g., "Fatiha", "Baqarah")</li>
                  <li>• Search by Surah number (1-114)</li>
                  <li>• Use Arabic name (e.g., "الفاتحة", "البقرة")</li>
                  <li>• Check your spelling</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <BookOpen size={20} />
              View All Surahs / सभी सूरहों की सूची
            </button>
          </div>
        </div>

        {/* Popular Surahs Suggestions
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 text-center">Popular Surahs:</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-lg p-3 text-center cursor-pointer border border-emerald-200">
              <p className="font-semibold text-emerald-700">Al-Fatiha</p>
              <p className="text-xs text-gray-600">Surah 1</p>
            </div>
            <div className="bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-lg p-3 text-center cursor-pointer border border-emerald-200">
              <p className="font-semibold text-emerald-700">Ya-Sin</p>
              <p className="text-xs text-gray-600">Surah 36</p>
            </div>
            <div className="bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-lg p-3 text-center cursor-pointer border border-emerald-200">
              <p className="font-semibold text-emerald-700">Al-Mulk</p>
              <p className="text-xs text-gray-600">Surah 67</p>
            </div>
            <div className="bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-lg p-3 text-center cursor-pointer border border-emerald-200">
              <p className="font-semibold text-emerald-700">Al-Kahf</p>
              <p className="text-xs text-gray-600">Surah 18</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default NotFound;