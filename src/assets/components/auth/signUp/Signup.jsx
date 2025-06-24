import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
  const { user , loginUser} = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminSignup = location.pathname === "/signupAdmin";

  const isPasswordStrong = (pwd) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/.test(
      pwd
    );

  const processImageFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  useEffect(() => {
    if (!imageFile) {
      fetch(dj)
        .then((res) => res.blob())
        .then((blob) => {
          const defaultFile = new File([blob], "dj.jpg", { type: blob.type });
          processImageFile(defaultFile);
        });
    }
  }, [imageFile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) processImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedInstrument) {
      toast.error("Please select an instrument");
      return;
    }

    if (!isPasswordStrong(password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol."
      );
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
      formData.append("isAdmin", isAdminSignup);

      const res = await axios.post("/auth/signup", formData);
      if (res.status !== 201) throw new Error("Signup failed");
      loginUser(res.data.user);
      
      toast.success("Signup successful!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  useEffect(() => {
    if(user) {
      setTimeout(() => navigate("/mainpage"), 2000);
    }
  },[user]);

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl px-6 py-8 sm:px-8 rounded-3xl shadow-xl z-10 border border-white/20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">
          {isAdminSignup ? "Admin sign up" : "Create your account"}
        </h2>

        <div className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && !isPasswordStrong(password) && (
              <p className="text-xs text-red-500 mt-1">
                Must be 8+ chars, with uppercase, lowercase, number, symbol.
              </p>
            )}
          </div>

          {/* Instrument Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instrument</label>
            <InstrumentSelect
              value={selectedInstrument}
              onChange={setSelectedInstrument}
            />
          </div>

          {/* Profile Image Preview + Upload */}
          <div className="space-y-4">
            <div className="flex justify-center items-center">
              <img
                src={previewImage}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <div className="relative my-4">
          <hr className="border-gray-300" />
          <div className="flex items-center justify-center mt-2">
            <span className="text-sm text-gray-500">Already have an account?</span>
            <Link to="/" className="text-blue-600 text-sm hover:underline ml-1">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
