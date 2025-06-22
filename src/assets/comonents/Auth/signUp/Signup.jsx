import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstrumentSelect from "./InstrumentSelect";
import dj from "../../../../media/dj.jpg"; // Placeholder for the background image

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    // if (!file || file.size > 2 * 1024 * 1024){
    //   console.log("damn bro")
    //   return;
    // } 

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4">
      {/* Background is already in App.jsx */}
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl px-6 py-8 sm:px-8 rounded-3xl shadow-xl z-10 border border-white/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
          Create Your Account
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Instrument Dropdown - placeholder for now */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instrument
            </label>
            <div className="w-full p-2 rounded-xl border border-gray-300 bg-white text-gray-600">
              {/* We'll build the searchable icon dropdown here next */}
              <InstrumentSelect
                value={selectedInstrument}
                onChange={setSelectedInstrument}
              />
            </div>
          </div>

          {/* Image Upload - placeholder for now */}
          <div className="grid-cols-1 space-y-4">
            {/* Image Preview */}
            <div className="flex justify-center items-center">
              <img
                src={previewImage || dj}
                alt="avatar"
                className="w-30 h-30 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            {/* Hidden File Input with Custom Button */}
            <div className="flex justify-center">
              <label className="cursor-pointer px-4 py-1.5 text-sm rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
