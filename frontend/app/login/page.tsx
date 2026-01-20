"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { FiMail, FiLock } from "react-icons/fi";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        router.push("/dashboard");
      } catch {
        // Not logged in
      }
    };
    checkAuth();
  }, [router]);


  const handleSubmit = async (e: any) => {
    e.preventDefault(); //Stops page reload when form is submitted. or cancels events default acions

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/customer/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setEmail("");
      setPassword("");

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000); // wait 1 sec to see the toast
    } catch (err: any) {
      if (err.response?.data?.message) { // ? mark to cheak existense
        toast.error(err.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 to-gray-100">
      {/* Toast Container */}
       <Toaster position="top-center" reverseOrder={false} /> {/*means new toasts appear below older ones */}

      <div className="flex flex-col items-center font-sans border border-gray-300 p-8 rounded-lg shadow-md w-80 bg-white">
        <h2 className="text-2xl font-bold mb-1">Login</h2>
        <span className="text-gray-500 text-xs mb-5">- use your email & password to login</span>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-3">
          <div className="relative w-full">
            <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-5 py-2 rounded-full border border-yellow-400 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"/>
          </div>

          <div className="relative w-full">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-5 py-2 rounded-full border border-yellow-400 placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"/>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full mt-3 py-2 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-300 hover:opacity-90 transition">Login
          </button>
        </form>

        <span className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-yellow-500 font-bold hover:underline">
            Register
          </Link>
        </span>

        <Link href="/home" className="text-blue-500 mt-3 font-bold hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
