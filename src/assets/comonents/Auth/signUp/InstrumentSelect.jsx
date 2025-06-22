import React, { useState } from "react";
import {
  LuGuitar,
  LuPiano,
} from "react-icons/lu";
import { LiaDrumSolid } from "react-icons/lia";
import { GiViolin, GiSaxophone, GiGuitarBassHead,GiMicrophone,GiBanjo,GiClarinet } from "react-icons/gi";

const instruments = [
  { label: "Guitar", icon: <LuGuitar /> },
  { label: "Piano", icon: <LuPiano /> },
  { label: "Drums", icon: <LiaDrumSolid /> },
  { label: "Violin", icon: <GiViolin /> },
  { label: "Saxophone", icon: <GiSaxophone /> },
  { label: "Bass Guitar", icon: <GiGuitarBassHead /> },
  { label: "Singer", icon: <GiMicrophone /> },
  { label: "Banjo", icon: <GiBanjo /> },
  { label: "Clarinet", icon: <GiClarinet /> },
];

export default function InstrumentSelect({ value, onChange }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = instruments.filter((instrument) =>
    instrument.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        className="w-full flex items-center justify-between p-2 rounded-xl text-gray-700"
        onClick={() => setOpen(!open)}
      >
        {value ? (
          <span className="flex items-center gap-2">
            {value.icon}
            {value.label}
          </span>
        ) : (
          <span className="text-gray-400">Select your instrument</span>
        )}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-lg p-2 max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder="Search instrument..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 py-1 mb-2 text-sm border border-gray-200 rounded"
          />

          {filtered.length > 0 ? (
            filtered.map((instrument) => (
              <div
                key={instrument.label}
                onClick={() => {
                  onChange(instrument);
                  setOpen(false);
                  setSearch("");
                }}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer text-sm"
              >
                <span className="text-lg">{instrument.icon}</span>
                {instrument.label}
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 px-3 py-2">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}
