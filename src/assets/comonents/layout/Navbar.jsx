import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 shadow-md backdrop-blur-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <div className="text-2xl font-semibold tracking-wide text-neutral-100">
            <a href="/">JaMoveo</a>
          </div>

          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li>
              <a
                href="/"
                className="text-neutral-200 hover:text-white transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-neutral-200 hover:text-white transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-neutral-200 hover:text-white transition"
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="md:hidden relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-200 focus:outline-none "
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-xl shadow-lg py-2 ring-1 ring-black/10 z-50 ">
                <a href="/" className="block px-4 py-2 hover:bg-gray-100">
                  Home
                </a>
                <a href="/about" className="block px-4 py-2 hover:bg-gray-100">
                  About
                </a>
                <a
                  href="/contact"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Contact
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
