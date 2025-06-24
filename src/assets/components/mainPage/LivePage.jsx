import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import socket from "../../utils/socket";
import SongWords from "./SongWords";
import { useNavigate } from "react-router-dom";
import BtnDropDown from "./LivePageFeatures/BtnDropDown";
import AutoScrollToggle from "./LivePageFeatures/AutoScrollToggle";

export default function LivePage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [selectedSong, setSelectedSong] = useState(
    JSON.parse(localStorage.getItem("selectedSong"))
  );
  const [songData, setSongData] = useState(
    JSON.parse(localStorage.getItem("songData"))
  );
  const [isHebrew, setIsHebrew] = useState(localStorage.getItem("isHebrew"));

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle quit rehearsal
  useEffect(() => {
    socket.on("quit-rehearsal", ({ delSong }) => {
      if (delSong) {
        setSelectedSong(null);
        setSongData(null);
        setIsHebrew(false);
        localStorage.removeItem("selectedSong");
        localStorage.removeItem("songData");
        localStorage.removeItem("isHebrew");
        navigate("/mainpage");
      }
    });

    return () => {
      socket.off("quit-rehearsal");
    };
  }, []);

  // Listen for live user updates
  useEffect(() => {
    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("online-users", handleOnlineUsers);

    socket.emit("get-online-users");

    return () => socket.off("online-users", handleOnlineUsers);
  }, []);

  const quitSong = () => {
    socket.emit("admin-stop-rehearsal");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 relative">

      <BtnDropDown onlineUsers={onlineUsers} showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

      <AutoScrollToggle />

      {/* Main Song Content */}
      <div className="bg-white/80 backdrop-blur-xl border border-amber-300 rounded-2xl shadow-xl p-6 sm:p-10 max-w-4xl w-full space-y-8 z-30">
        <h1 className="text-3xl font-bold text-center text-sky-700">
          🎶 Live Song
        </h1>

        {user?.status === "Admin" && (
          <div className="text-center">
            <button
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={quitSong}
            >
              ❌ Quit Song
            </button>
          </div>
        )}

        {selectedSong && songData ? (
          <SongWords
            songData={songData}
            selectedSong={selectedSong}
            isHebrew={isHebrew}
          />
        ) : (
          <p className="text-center text-gray-500">
            No song is currently live.
          </p>
        )}
      </div>
    </div>
  );
}
