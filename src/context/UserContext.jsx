import React, { createContext, useContext, useState } from "react";
import socket from "../assets/utils/socket";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginUser = (userData) => {
    setUser(userData);
    socket.on("start-song", ( song ) => {
      if (song) {
        localStorage.setItem("selectedSong", JSON.stringify(song.selectedSong));
        localStorage.setItem("songData", JSON.stringify(song.songData));
        localStorage.setItem("isHebrew", song.isHebrew);
        navigate("/live")
      }
    });
  };

  const logoutUser = () => {
    setUser(null);
    navigate("/")
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
