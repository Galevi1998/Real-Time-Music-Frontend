import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstrumentSelect from "./InstrumentSelect";
import dj from "../../../../media/dj.jpg";
import axios from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useUser } from "../../../../context/UserContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { user } = useUser();

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (!file) return;

    // For preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);

    // Store raw file
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedInstrument) {
      toast.error("Please select an instrument");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", name);
      formData.append("password", password);
      formData.append("instruments", selectedInstrument.label);
      if (imageFile) {
        formData.append("picture", imageFile);
      }
      console.log("Submitting FormData:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      const res = await axios.post("/auth/signup", formData);

      if (res.status !== 201) throw new Error("Signup failed");

      toast.success("Signup successful! Redirecting...");
      setTimeout(() => navigate("/mainpage"), 2000);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl px-6 py-8 sm:px-8 rounded-3xl shadow-xl z-10 border border-white/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
          Create Your Account
        </h2>

        <div className="space-y-5">
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

          {/* Instrument Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instrument
            </label>
            <InstrumentSelect
              value={selectedInstrument}
              onChange={setSelectedInstrument}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <div className="flex justify-center items-center">
              <img
                src={previewImage || dj}
                alt="avatar"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
