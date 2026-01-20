import Link from "next/link";
import { FiUser, FiTool, FiClock } from "react-icons/fi"; // Feather icons

export default function DashboardPage() {
  return (
    <div className="ml-64 px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-3">
        Welcome to your Dashboard
      </h1>
      <p className="text-gray-600 text-lg mb-10">
        Manage your profile, book services, and view your service history.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Link
          href="/dashboard/profile"
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center
                     hover:shadow-xl">
          <FiUser className="text-4xl text-yellow-500 mb-3" />
          <h3 className="text-2xl font-semibold mb-2">Profile</h3>
          <p className="text-gray-500 text-center">
            View and update your personal information
          </p>
        </Link>

        {/* Services Card */}
        <Link
          href="/dashboard/services"
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center
                    hover:shadow-xl ">
          <FiTool className="text-4xl text-yellow-500 mb-3" />
          <h3 className="text-2xl font-semibold mb-2">Services</h3>
          <p className="text-gray-500 text-center">
            Browse and book available services
          </p>
        </Link>

        {/* Booking History Card */}
        <Link
          href="/dashboard/services-history"
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center
                     hover:shadow-xl">
          <FiClock className="text-4xl text-yellow-500 mb-3" />
          <h3 className="text-2xl font-semibold mb-2">Booking History</h3>
          <p className="text-gray-500 text-center">
            Track all your booked services
          </p>
        </Link>
      </div>
    </div>
  );
}
