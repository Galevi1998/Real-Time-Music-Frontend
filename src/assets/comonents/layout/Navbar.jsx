import React, { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useUser();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      logoutUser();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 shadow-md backdrop-blur-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div className="text-2xl font-semibold tracking-wide text-neutral-100">
            <Link to="/">JaMoveo</Link>
          </div>

          {/* Desktop links */}
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li><Link to="/" className="text-neutral-200 hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="text-neutral-200 hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="text-neutral-200 hover:text-white transition">Contact</Link></li>
          </ul>

          {/* User section (desktop) */}
          {user?.username && (
            <div className="hidden md:flex items-center gap-3 ml-4">
              <span className="text-sm text-white font-medium">
                Hello, {user.username}
              </span>
              <img
                src={user.picture}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white shadow-md object-cover"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 transition rounded-md shadow"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-200 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg py-2 ring-1 ring-black/10 z-50">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
                <Link to="/about" className="block px-4 py-2 hover:bg-gray-100">About</Link>
                <Link to="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</Link>

                {user?.username && (
                  <>
                    <div className="border-t my-1" />
                    <div className="flex items-center px-4 py-2 text-sm text-gray-700">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="w-7 h-7 rounded-full mr-2 object-cover"
                      />
                      {user.username}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                )}
                
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
