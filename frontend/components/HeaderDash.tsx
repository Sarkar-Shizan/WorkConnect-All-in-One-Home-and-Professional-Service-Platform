"use client";
import { useRouter } from "next/navigation";
import Notifications from "./Notificaton";
import { FiLogOut, FiUser } from "react-icons/fi";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HeaderDash() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");

  // Fetch user profile for username
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        setUsername(res.data.name);
      } catch (err) {
        console.error("Failed to fetch user profile");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/customer/auth/logout",
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-yellow-400 shadow-md">
      {/* Dashboard Title */}
      <span className=" text-2xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">WorkConnect</span>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <Notifications />

        {/* Username + Profile Button */}
        <div className="flex items-center gap-2 bg-yellow-300 p-2 rounded-full hover:scale-110 transition-transform duration-200 cursor-pointer"
             onClick={() => router.push("/dashboard/profile")}
             title="Profile"
        >
          <span className="font-semibold text-gray-900">{username}</span>
          <FiUser size={22} className="text-gray-900" />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-yellow-300 text-red-500 p-2 rounded-full hover:scale-110 transition-transform duration-200"
          title="Logout"
        >
          <FiLogOut size={22} />
        </button>
      </div>
    </header>
  );
}
