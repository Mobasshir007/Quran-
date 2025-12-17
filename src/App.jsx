import React, { useEffect, useState } from "react";

import Header from "./Header";
import NotFound from "./NotFound";
import { Analytics } from '@vercel/analytics/react';
import Shimmer from "./Shimmer";
import { lazy, Suspense } from "react";
const Card = lazy(() => import("./Card"));


// Main App Component
const App = () => {
  const [surah, setSurah] = useState([]);
  const [ayah, setAyah] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedSurahInfo, setSelectedSurahInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);

  const fetchSurahList = async () => {
    try {
      const res = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await res.json();
      console.log("Surah list loaded:", data.data.length);
      setSurah(data.data);
      setFilteredSearch(data.data);
    } catch (error) {
      console.error("Error fetching Surah list:", error);
    }
  };

  useEffect(() => {
    fetchSurahList();
  }, []);

  useEffect(() => {
    if (!selectedSurah) return;
    let arabicAyahs = [];
    let hindiAyahs = [];
    console.log("Fetching Ayahs for Surah:", selectedSurah);
    setLoading(true);
    setAyah([]);

    fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/quran-uthmani`)
      .then((res) => {
        console.log("Response received, status:", res.status);
        return res.json();
      })
      .then((data) => {
        arabicAyahs = data.data.ayahs;
        
        return fetch(
          `https://api.alquran.cloud/v1/surah/${selectedSurah}/hi.hindi`
        );
      })

      .then((res) => {
        return res.json();
      })
      .then((hindiData) => {
       
          hindiAyahs=hindiData.data.ayahs
       
          // 🔥 MERGE HERE
      const hindiMap = new Map(
        hindiAyahs.map(a => [a.numberInSurah, a.text])
      );

      const merged = arabicAyahs.map(a => ({
        id: a.numberInSurah,
        arabic: a.text,
        hindi: hindiMap.get(a.numberInSurah) || ""
      }));

      setAyah(merged);
      console.log(ayah)
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching ayahs:", err);
      setLoading(false);
    });
  }, [selectedSurah]);
  console.log(ayah)
  const displayData = search ? filteredSearch : surah;


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Surah List View */}
      {!selectedSurah ? (
        <div>
          <Header
            search={search}
            setSearch={setSearch}
            surah={surah}
            setFilteredSearch={setFilteredSearch}
          />
         <div className="container mx-auto px-4 py-8">
         

  {surah.length === 0 ? (
    <Shimmer />
  ) : filteredSearch.length===0 ?(<NotFound/>):(
    <Suspense fallback={<Shimmer />}>
      <Card data={displayData} onSelect={setSelectedSurah} />
    </Suspense>
  )}

</div>

        </div>
      ) : (
        /* Ayah View */
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedSurah(null);
                setAyah([]);
              }}
              className="mb-6 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl  hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold flex items-center  gap-2"
            >
              ← Back to Surah List
            </button>

            {/* Surah Info */}
            {selectedSurahInfo && (
              <div className="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 rounded-2xl p-8 mb-8 text-center shadow-lg border border-emerald-200">
                <h2
                  className="text-4xl font-bold mb-3 text-emerald-900"
                  style={{
                    direction: "rtl",
                    fontFamily: "Traditional Arabic, Arial",
                  }}
                >
                  {selectedSurahInfo.name}
                </h2>
                <p className="text-2xl text-gray-800 font-semibold mb-2">
                  {selectedSurahInfo.englishName} -{" "}
                  {selectedSurahInfo.englishNameTranslation}
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-emerald-700">
                    📖 {selectedSurahInfo.revelationType}
                  </span>
                  <span className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-teal-700">
                    🔢 {selectedSurahInfo.numberOfAyahs} Ayahs
                  </span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mb-4"></div>
                <div className="text-2xl text-emerald-700 font-semibold">
                  Loading Ayahs...
                </div>
              </div>
            )}

            {/* Ayahs Display */}
            {!loading && ayah.length > 0 && (
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  {ayah.length} Ayahs
                </h3>

                <div className="space-y-8">
                  {ayah.map((verse) => (
                    <div
                      key={verse.id}
                      className="p-6 border-b-2 border-emerald-100 last:border-b-0 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-md">
                         {verse.id}
                        </span>
                      </div>
                      <p
                        className="text-3xl leading-loose text-gray-800"
                        style={{
                          direction: "rtl",
                          textAlign: "right",
                          fontFamily: "Traditional Arabic, Arial",
                        }}
                      >
                        {verse.arabic}
                      </p>
                      <p
                        className="text-3xl leading-loose text-gray-800"
                        style={{
                          direction: "rtl",
                          textAlign: "right",
                          fontFamily: "Traditional Arabic, Arial",
                        }}
                      >
                        {verse.hindi}
                      </p>
                    </div>
                  ))}

                  {/* Bottom Back Button */}
                  <button
                    onClick={() => {
                      setSelectedSurah(null);
                      setAyah([]);
                    }}
                    className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    ← Back to Surah List
                  </button>
                </div>
              </div>
            )}

            {/* No Ayahs Found */}
            {!loading && ayah.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">📖</div>
                <div className="text-2xl text-gray-500 font-medium">
                  No Ayahs found
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Analytics/>
    </div>
  );
};

export default App;
