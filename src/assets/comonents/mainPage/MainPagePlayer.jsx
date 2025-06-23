import React, { useEffect, useState, useRef } from "react";
import socket from "../../utils/socket";

export default function MainPagePlayer() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const positionMap = useRef({}); // userId -> { top, left }

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("online-users");
    };
  }, []);

  const getRandomPosition = () => {
    let top, left;
    do {
      top = Math.floor(Math.random() * 80) + 10;
      left = Math.floor(Math.random() * 80) + 10;
    } while (top > 40 && top < 60 && left > 40 && left < 60); // Avoid center
    return { top, left };
  };

  return (
    <div className="relative min-h-screen  text-white flex items-center justify-center">
      {/* Center message */}
      <div className="absolute z-10 text-center text-3xl font-bold text-sky-400 animate-pulse">
        Waiting for Admin to choose a song!
      </div>

      {/* Avatars around */}
      {onlineUsers.map((user) => {
        if (!positionMap.current[user.id]) {
          positionMap.current[user.id] = getRandomPosition();
        }
        const { top, left } = positionMap.current[user.id];

        return (
          <div
            key={user.id}
            className={`absolute flex flex-col items-center top-[${top}%] left-[${left}%] transform-translate(-50%, -50%) z-20`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <img
              src={user.picture}
              alt={user.username}
              title={user.username}
              className="w-10 h-10 sm:w-40 sm:h-40 rounded-full border-2 border-white shadow-lg object-cover animate-pulse"
            />

            <div className="text-sm sm:text-lg text-center mt-1">
              <div className="font-semibold">{user.username}</div>
              <div className="text-xs text-sky-300">{user.instruments}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
