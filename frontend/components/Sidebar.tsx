"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi"; 
import axios from "axios";
import toast from "react-hot-toast";

export default function Sidebar() {
  const router = useRouter();

  //LOGOUT
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/customer/auth/logout",
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="fixed top-18 w-64 bg-white shadow-lg flex flex-col h-155 p-5">
      
      {/* Top Logo */}
      <Link href="/dashboard" className="text-2xl font-semibold text-yellow-500 mb-5 ml-3">
        Dashboard
      </Link>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3 flex-1">
      
        <Link
          href="/dashboard/services"
          className="px-4 py-2 rounded-full font-semibold text-black hover:bg-yellow-400 hover:text-white transition">
          Services
        </Link>
        <Link
          href="/dashboard/services-history"
          className="px-4 py-2 rounded-full font-semibold text-black hover:bg-yellow-400 hover:text-white transition">
          Booking History
        </Link>
        
          <Link
          href="/dashboard/profile"
          className="px-4 py-2 rounded-full font-semibold text-black hover:bg-yellow-400 hover:text-white transition">
          Profile
        </Link>
      </nav>

      {/* Logout at Bottom */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-2 rounded-full font-semibold bg-red-500 text-white hover:bg-red-600 transition">
          <FiLogOut size={20}/>Logout
      </button>
    </aside>
  );
}
