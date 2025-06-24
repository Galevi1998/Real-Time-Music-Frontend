import React, { useEffect, useState } from "react";

export default function AutoScrollToggle() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const toggleScroll = () => {
    if (isScrolling) {
      clearInterval(intervalId);
      setIsScrolling(false);
      setIntervalId(null);
    } else {
      const id = setInterval(() => {
        window.scrollBy({ top: 1, behavior: "smooth" });
      }, 50); 
      setIntervalId(id);
      setIsScrolling(true);
    }
  };

  return (
    <button
      onClick={toggleScroll}
      className="fixed bottom-4 right-4 sm:bottom-4 sm:right-4 z-50 bg-sky-700 hover:bg-sky-700 text-white text-sm sm:text-base px-4 py-2 rounded-full shadow-lg transition duration-200"
    >
      {isScrolling ? " Stop Scroll" : " Start Scroll"}
    </button>
  );
}
