import React, { useEffect, useState } from "react";

// Card Component
const Card = ({ data, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {data.map(item => (
        <div
          key={item.number}
          onClick={() => {
            console.log("Clicked Surah:", item.number);
            onSelect(item.number);
          }}
          className="h-48 border-2 border-purple-400 bg-purple-100 cursor-pointer hover:bg-purple-200 transition-colors rounded-lg p-4 flex flex-col items-center justify-center shadow-md"
        >
          <div className="text-6xl mb-2">📖</div>
          <div className="text-center">
            <p className="font-bold text-lg">{item.number}. {item.englishName}</p>
            <h2 className="text-2xl mt-2" style={{ direction: "rtl" }}>{item.name}</h2>
            <p className="text-sm text-gray-600">{item.englishNameTranslation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main App Component
const App = () => {
  const [surah, setSurah] = useState([]);
  const [ayah, setAyah] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedSurahInfo, setSelectedSurahInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSurahList = async () => {
    try {
      const res = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await res.json();
      console.log("Surah list loaded:", data.data.length);
      setSurah(data.data);
    } catch (error) {
      console.error("Error fetching Surah list:", error);
    }
  };

  useEffect(() => {
    fetchSurahList();
  }, []);

  useEffect(() => {
    if (!selectedSurah) return;
    
    console.log("Fetching Ayahs for Surah:", selectedSurah);
    setLoading(true);
    setAyah([]);
    
    fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/quran-uthmani`)
      .then((res) => {
        console.log("Response received, status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.data && data.data.ayahs) {
          console.log("Setting Ayahs, count:", data.data.ayahs.length);
          setAyah(data.data.ayahs);
          setSelectedSurahInfo(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Ayahs:", error);
        setLoading(false);
      });
  }, [selectedSurah]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
          القرآن الكريم - The Holy Quran
        </h1>
        
        {/* Surah List */}
        {!selectedSurah ? (
          <Card data={surah} onSelect={setSelectedSurah} />
        ) : (
          <div>
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedSurah(null);
                setAyah([]);
              }}
              className="mb-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              ← Back to Surah List
            </button>
            
            {/* Surah Info */}
            {selectedSurahInfo && (
              <div className="bg-purple-100 rounded-lg p-6 mb-6 text-center">
                <h2 className="text-3xl font-bold mb-2" style={{ direction: "rtl" }}>
                  {selectedSurahInfo.name}
                </h2>
                <p className="text-xl text-gray-700">
                  {selectedSurahInfo.englishName} - {selectedSurahInfo.englishNameTranslation}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {selectedSurahInfo.revelationType} • {selectedSurahInfo.numberOfAyahs} Ayahs
                </p>
              </div>
            )}
            
            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="text-2xl">Loading Ayahs...</div>
              </div>
            )}
            
            {/* Ayahs Display */}
            {!loading && ayah.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 text-center text-purple-800">
                  {ayah.length} Ayahs
                </h3>
                
                <div className="space-y-6">
                  {ayah.map((verse) => (
                    <div
                      key={verse.numberInSurah}
                      className="p-6 border-b-2 border-purple-200 last:border-b-0 hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                          Ayah {verse.numberInSurah}
                        </span>
                      </div>
                      <p 
                        className="text-3xl leading-loose text-gray-800 font-arabic"
                        style={{ direction: "rtl", textAlign: "right", fontFamily: "Traditional Arabic, Arial" }}
                      >
                        {verse.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* No Ayahs Found */}
            {!loading && ayah.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No Ayahs found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;