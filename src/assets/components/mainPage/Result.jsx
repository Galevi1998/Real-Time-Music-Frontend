import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SongWords from "./SongWords"; 
import socket from "../../utils/socket";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  

  const { songData, selectedSong } = location.state || {};
  if (!songData || !selectedSong) return <p>No data loaded</p>;

  const isHebrew = /[\u0590-\u05FF]/.test(selectedSong.title);


  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 py-10">
      <div className="bg-white/80 backdrop-blur-md border border-amber-300 rounded-2xl shadow-xl p-6 sm:p-10 max-w-4xl w-full space-y-8 z-10">
        
        <SongWords songData={songData} selectedSong={selectedSong} isHebrew={isHebrew} />

        <div className="text-center">
          <button
            className="bg-amber-500 text-white py-2 px-6 rounded-xl hover:bg-amber-600 shadow-md"
            onClick={() => {
              socket.emit("song-selected", { selectedSong, songData,isHebrew });
              localStorage.setItem("selectedSong", JSON.stringify(selectedSong));
              localStorage.setItem("songData", JSON.stringify(songData));
              localStorage.setItem("isHebrew", isHebrew);

              navigate("/live");
            }}
          >
            ✅ Use This Song
          </button>
        </div>
      </div>
    </div>
  );
}
