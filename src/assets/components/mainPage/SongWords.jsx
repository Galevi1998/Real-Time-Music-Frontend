import React from "react";
import { useUser } from "../../../context/UserContext";

export default function SongWords({ songData, selectedSong, isHebrew }) {
  const { user } = useUser();

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-2 sm:px-4 mb-6 ${
          isHebrew ? "text-right rtl " : "text-left"
        }`}
      >
        <img
          src={selectedSong.image}
          alt={selectedSong.title}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-md border"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1">
            {selectedSong.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 font-medium">
            {selectedSong.artist}
          </p>
        </div>
      </div>

      <div
        className={`space-y-4 text-base sm:text-lg font-bold font-sans px-2 sm:px-4 ${
          isHebrew ? "text-right rtl" : "text-left"
        }`}
      >
        {songData.map((line, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-center gap-x-3 gap-y-2"
          >
            {line.map((part, i) => (
              <div key={i} className="flex flex-col items-center min-w-4">
                {user.instruments !== "Singer" && (
                  <span className="text-xs sm:text-sm font-semibold text-amber-700 leading-none">
                    {part.chords || "\u00A0"}
                  </span>
                )}
                <span className="text-gray-900 leading-snug break-words">
                  {part.lyrics}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
