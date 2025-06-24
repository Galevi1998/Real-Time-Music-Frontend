import React, { useState } from "react";
import axios from "../../utils/axiosInstance"; // Adjust if needed
import PopupResults from "./PopupResults"; 
import { useLocation, useNavigate } from "react-router-dom";


export default function MainPageAdmin() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setNoResults(false);
    setShowResults(false);
    try {
      const res = await axios.get(`/search?q=${query}`);
      if (res.data.length > 0) {
        setResults(res.data);
        setShowResults(true);
      } else {
        setResults([]);
        setNoResults(true);
      }
    } catch (err) {
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSongClick = async (song) => {
    try {
      const { data } = await axios.post('/search/scrape', {
        url: song.url,
      });
  
      navigate('/result', {
        state: {
          songData: data,
          selectedSong: song,
        },
      });
    } catch (err) {
      toast.error("Couldn't load song data.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-3xl border border-amber-300 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 text-center z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-800">
          Start the Rehearsal
        </h1>
        <p className="text-sm text-gray-600">
          Enter a song name and press search to begin!
        </p>

        <input
          type="text"
          placeholder="e.g. Hotel California"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-amber-500 text-white py-2.5 rounded-xl font-semibold hover:bg-amber-600 transition duration-200"
        >
          {loading ? "Searching..." : "Search Songs"}
        </button>

        {noResults && (
          <div className="text-red-600 font-semibold pt-2">
            No results found.
          </div>
        )}
      </div>

      {/* POPUP RESULTS */}
      {showResults && (
        <PopupResults results={results} setShowResults={setShowResults} handleSongClick={handleSongClick}/>
      )}
    </div>
  );
}
