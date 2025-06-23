import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../context/UserContext";



export default function Signin() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useUser();


  const handleSubmit = async () => {
    try {
      console.log("hello")
      console.log(username, password);
      const response = await axios.post("/auth/signin", {
        username: username,
        password: password,
      });
      if(response.status === 200) {
        toast.success("Login successful");
      }

      loginUser(response.data.user);
      setTimeout(() => navigate("/mainpage"), 2000);

    } catch (error) {
      toast.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("An unexpected error occurred:", error);
      }
      
    }
  }
  return (
    <div className="relative flex items-center justify-center min-h-screen ">
      

      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl px-6 py-8 sm:px-8 rounded-3xl shadow-xl z-10 border border-white/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
          Welcome Back
        </h2>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              user name:
            </label>
            <input
              type="username"
              className="w-full p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your user name"
              value={username}
              onChange={(e) => {
                console.log(e.target.value);
                setUsername(e.target.value)}}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                console.log(e.target.value);
                setPassword(e.target.value)}}
              required
            />
          </div>

          

          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={()=> handleSubmit()}
          >
            Sign In
          </button>

          <div className="relative my-4 grid-cols-1 gap-6">
            <hr className="border-gray-300" />
            <div className="flex items-center justify-center mt-2">
              <span className="text-sm text-gray-500">or</span>
            </div>
            {/* <div>
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 mt-2 shadow-sm hover:bg-gray-50 transition text-sm">
                <FcGoogle size={16} />
                <span className="text-gray-700 font-normal">
                  Sign in with Google
                </span>
              </button>
            </div> */}
            <div className="flex items-center justify-center mt-2">
              <span className="text-sm text-gray-500"> Done got account ?</span>
              <Link to="/signup" className="text-blue-600 text-sm hover:underline ml-1">
                Sign Up
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
