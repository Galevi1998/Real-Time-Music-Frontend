import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./assets/components/auth/Signin";
import Signup from "./assets/components/auth/signUp/Signup";
import Navbar from "./assets/components/layout/Navbar";
import bgImage from "./media/clef.jpg";
import MainPage from "./assets/components/mainPage/MainPage";
import socket from "./assets/utils/socket";
import { useUser } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import axios from "./assets/utils/axiosInstance";
import Result from "./assets/components/mainPage/Result";
import LivePage from "./assets/components/mainPage/LivePage";


function RedirectIfSong({ user }) {
  const isHebrew = localStorage.getItem("isHebrew");

  if (isHebrew) {
    return <Navigate to="/live" />;
  }

  return user ? <Navigate to="/mainpage" /> : <Signin />;
}

function App() {
  const { user, loginUser } = useUser(); // ✅ use loginUser not setingUser

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("/auth/me");
        loginUser(res.data.user);
      } catch (error) {
        try {
          await axios.get("/auth/refresh");
          const res = await axios.get("/auth/me");
          loginUser(res.data.user);
        } catch (error) {
          loginUser(null);
        }
      }
    };

    checkSession();

  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {});

    socket.on("disconnect", () => {});

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
      <div className="relative min-h-screen bg-gradient-to-br from-yellow-100 to-white px-4">
        {/* Background layer */}
        <div
          className="fixed inset-0 z-10 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<RedirectIfSong user={user} />} />

          <Route
            path="/signup"
            element={user ? <Navigate to="/mainpage" /> : <Signup />}
          />
          <Route
            path="/signupAdmin"
            element={user ? <Navigate to="/mainpage" /> : <Signup />}
          />

          {/* Protected route */}
          <Route
            path="/mainpage"
            element={user ? <MainPage /> : <Navigate to="/" />}
          />
          <Route
            path="/result"
            element={user ? <Result /> : <Navigate to="/" />}
          />
          <Route
            path="/live"
            element={user ? <LivePage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
