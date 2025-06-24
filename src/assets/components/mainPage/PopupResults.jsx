import React from "react";

export default function PopupResults({ results, setShowResults , handleSongClick }) {
  return (
    <div
      className={`
      absolute top-8 right-8 bg-white border border-amber-300 rounded-2xl shadow-xl max-h-[80vh] w-80 overflow-y-auto p-4 space-y-4 z-50
      transition-all duration-300 transform animate-fade-in-slide
    `}
    >
      <button
        onClick={() => setShowResults(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
      >
        ×
      </button>

      <h2 className="text-lg font-bold text-amber-700 pr-6">Search Results</h2>
      {results.map((song, idx) => (
        <div
          key={idx}
          onClick={() => handleSongClick(song)}
          className="flex items-center space-x-4 hover:bg-amber-50 p-2 rounded-xl cursor-pointer"
        >
          <img
            src={song.image}
            alt={song.title}
            className="w-12 h-12 rounded-full border object-cover"
          />
          <div className="text-left">
            <div className="font-semibold text-gray-800">{song.title}</div>
            <div className="text-sm text-gray-500">{song.artist}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
