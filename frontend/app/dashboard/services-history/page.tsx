"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ServicesHistory() {
  const router = useRouter();

  const [bookedServices, setBookedServices] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Fetch booked services and customerId
  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        const profileRes = await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });

        const customer = profileRes.data;
        setCustomerId(customer.id);

        const res = await axios.get("http://localhost:3000/services/"+ customer.id, {
          withCredentials: true,
        });

        setBookedServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServiceHistory();
  }, [router]);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="ml-64 px-6 py-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-yellow-600 mb-8">My Services History</h2>

      {bookedServices.length === 0 ? (
        <p className="text-gray-500 text-center">No services booked yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl">
          {bookedServices.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between
                         hover:shadow-xl">
              {/* Card click → details */}
              <Link href={`/dashboard/booked-details/${booking.id}`}>
                <div className="space-y-2 cursor-pointer flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {booking.service.serviceTitle}
                  </h3>
                  <p className="text-gray-600">Category: {booking.service.serviceCategory}</p>
                  <p className="text-gray-600">Price: ${booking.service.price}</p>
                  <p className="text-gray-600">Company: {booking.service.companyName}</p>

                  <span className="block mt-4 w-full text-center py-2 bg-gradient-to-r
                                   from-yellow-400 to-yellow-300
                                   hover:from-yellow-500 hover:to-yellow-400
                                   text-black font-semibold rounded-full">
                    View Details
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
