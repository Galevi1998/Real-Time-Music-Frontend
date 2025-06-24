import React from "react";

export default function BtnDropDown({ showDropdown, setShowDropdown, onlineUsers }) {
  return (
    <>
      <div className="fixed bottom-4 left-4 sm:top-20 sm:right-4 sm:bottom-auto sm:left-auto z-50">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-sky-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-sky-700 transition duration-200 text-sm sm:text-base"
        >
          {showDropdown ? "Hide Users" : "Show Users"}
        </button>
      </div>

      {showDropdown && (
        <div
          className="
            fixed 
            bottom-20 left-2 
            sm:top-35 sm:left-auto sm:right-6 sm:bottom-auto
            w-[90vw] sm:w-80 md:w-96
            max-h-fit sm:max-h-[70vh]
            overflow-y-auto
            bg-white border border-gray-300 rounded-xl shadow-lg
            p-3 sm:p-4
            z-40 space-y-3
            transition duration-300
          "
        >
          <h2 className="text-lg sm:text-xl font-semibold text-sky-600 text-center sm:text-left mb-2">
            Online Users
          </h2>
          {onlineUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-2 sm:gap-3 border-b pb-2 last:border-none"
            >
              <img
                src={u.picture}
                alt={u.username}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border"
              />
              <div className="flex flex-col text-sm sm:text-base">
                <span className="font-bold">{u.username}</span>
                <span className="text-gray-600">
                  {u.instruments || "🎵 No Instrument"}
                </span>
                <span
                  className={`text-xs font-medium ${
                    u.status === "Admin" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {u.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
