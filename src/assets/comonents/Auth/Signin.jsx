import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="relative flex items-center justify-center min-h-screen ">
      

      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl px-6 py-8 sm:px-8 rounded-3xl shadow-xl z-10 border border-white/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
          Welcome Back
        </h2>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
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
              required
            />
          </div>

          <div className="relative my-4 grid-cols-1 gap-6">
            <hr className="border-gray-300" />
            <div className="flex items-center justify-center mt-2">
              <span className="text-sm text-gray-500">or</span>
            </div>
            <div>
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 mt-2 shadow-sm hover:bg-gray-50 transition text-sm">
                <FcGoogle size={16} />
                <span className="text-gray-700 font-normal">
                  Sign in with Google
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Sign In
          </button>


          <div className="flex items-center justify-center mt-2">
              <span className="text-sm text-gray-500"> Done got account ?</span>
              <Link to="/signup" className="text-blue-600 text-sm hover:underline ml-1">
                Sign Up
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
