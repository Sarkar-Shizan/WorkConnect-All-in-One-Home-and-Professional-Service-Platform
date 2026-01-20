import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      {/* 404 Number */}
      <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
        404
      </h1>

      {/* Message */}
      <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-800">
        Page Not Found
      </p>

      <p className="mt-2 text-gray-500 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back Button */}
      <Link
        href="/"
        className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
        ← Back to Home
      </Link>
    </div>
  );
}
