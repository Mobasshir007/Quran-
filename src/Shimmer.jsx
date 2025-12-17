import React from "react";

const Shimmer = ({}) => {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {Array.from({length:8}).map((_,i) => (
        <div
         key={i}
          className="h-68 group relative bg-gradient-to-br from-white to-emerald-50 border-2 border-emerald-200 cursor-pointer hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-between overflow-hidden"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-bl-full"></div>

          {/* Surah Number Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform"></div>

          {/* Icon */}
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
           
          </div>

          {/* Content */}
          <div className="text-center flex-1 flex flex-col justify-center">
            {/* Arabic Name */}
            <h2
              className="text-3xl font-bold mb-3 text-emerald-900 group-hover:text-emerald-700 transition-colors"
              style={{
                direction: "rtl",
                fontFamily: "Traditional Arabic, Arial",
              }}
            ></h2>

            {/* English Name */}
            <p className="font-bold text-lg text-gray-800 mb-1"></p>

            {/* Translation */}
            <p className="text-sm text-gray-600 mb-3"></p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium"></span>
              <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full font-medium"></span>
            </div>
          </div>

          {/* Hover Effect Border */}
        </div>
      )) }
     
    </div>
    
  );
};

export default Shimmer;
