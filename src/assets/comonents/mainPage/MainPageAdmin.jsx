import React from "react";

export default function MainPageAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-amber-300 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-800">
          Start the Rehearsal
        </h1>
        <p className="text-sm text-gray-600">
          Enter a song name and press enter to begin!
        </p>

        <input
          type="text"
          placeholder="e.g. Hotel California"
          className="w-full p-3 rounded-xl border border-gray-300 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400"
        />

        <button
          className="w-full bg-amber-500 text-white py-2.5 rounded-xl font-semibold hover:bg-amber-600 transition duration-200"
        >
          Start Song
        </button>
      </div>
    </div>
  );
}
