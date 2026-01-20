"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();//cancel brower default action which is reload after dubmit clicked

    // Validation
    if (!name || !email || !phoneNumber || !password) {
      toast.error("All fields are required.");
      return;
    }
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters long.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!/^01\d{9}$/.test(phoneNumber)) {
      toast.error("Phone number must start with 01 and be 11 digits.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/customer/register", {
        name,
        email,
        phoneNumber,
        password,
      });

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      toast.success("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 to-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="flex flex-col items-center font-sans border border-gray-300 p-8 rounded-lg shadow-md w-80 bg-white">
        <h2 className="text-2xl font-bold mb-1">Create an Account</h2>
        <span className="text-gray-500 text-xs mb-5">- use your email & phone number to register</span>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Name */}
          <div className="relative w-full">
            <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 px-5 py-2 rounded-full border border-yellow-400 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Email */}
          <div className="relative w-full">
            <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 px-5 py-2 rounded-full border border-yellow-400 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Phone */}
          <div className="relative w-full">
            <FiPhone className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              maxLength={11}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 px-5 py-2 rounded-full border border-yellow-400 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 px-5 py-2 rounded-full border border-yellow-400 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full mt-2 py-2 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-300 hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <span className="mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-500 font-bold hover:underline">
            Login
          </Link>
        </span>

        <Link href="/home" className="text-blue-500 mt-3 font-bold hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
