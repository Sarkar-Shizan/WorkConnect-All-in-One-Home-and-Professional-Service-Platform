import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-yellow-400 to-yellow-300 py-4 px-6 flex items-center justify-between shadow-md">
      
      {/* Left - Brand */}
      <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text font-semibold rounded-full ">
        <span className=" text-lg font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">WorkConnect</span></div>
      
      {/* Right - Links */}
      <div className="flex items-center gap-4">
        <Link href="/home" className="font-semibold ">
          Home
        </Link>
        <Link href="/about" className="font-semibold ">
          About
        </Link>
        <Link href="/contact" className="font-semibold ">
          Contact
        </Link>

        {/* Buttons */}
        <Link
          href="/login"
           className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-400 transition">
            Login
            </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-400 transition">
          Register
          </Link>
      </div>
    </nav>
  );
}
