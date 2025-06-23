import React, { useEffect } from "react";
import { Routes, Route , Navigate} from "react-router-dom";
import Signin from "./assets/comonents/auth/Signin";
import Signup from "./assets/comonents/auth/signUp/Signup";
import Navbar from "./assets/comonents/layout/Navbar";
import bgImage from "./media/clef.jpg";
import MainPage from "./assets/comonents/mainPage/MainPage";
import socket from "./assets/utils/socket";
import { useUser } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import axios from "./assets/utils/axiosInstance";

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

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from socket");
    });

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
      <div className="relative min-h-screen overflow-hidden bg-black/20 px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={user ? <Navigate to="/mainpage" /> : <Signin />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/mainpage" /> : <Signup />}
          />

          {/* Protected route */}
          <Route
            path="/mainpage"
            element={user ? <MainPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
