"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function BookedServiceDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // booking ID

  const [booking, setBooking] = useState<any>("");
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(false);

  //Fetch Booking
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Get customer profile
        const profileRes = await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        setAuthorized(true); //user is authenticated. It’s safe to render the page.
        setCustomerId(profileRes.data.id);

        //Get booking details(here it maps the all booking by booking id for the authorized customer)
        const res = await axios.get(
          "http://localhost:3000/services/booking/"+ id,
          { withCredentials: true }
        );
        setBooking(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch booking details.");
      }
    };

    fetchBooking();
  }, [id, router]);

         //Cancel Booking
   const handleCancel = async () => {
    if (!customerId || !booking) return;

    if (booking.status === "cancelled") {
      toast.error("This booking is already cancelled.");
      return;
    }

    if (!confirm("Are you sure you want to cancel this service?")) return;// confirm is built in browser dialog like alert with ok--cancel

    try {
      const res = await axios.patch(
        "http://localhost:3000/services/cancel-service/"+ customerId +"/"+ booking.id,
        { withCredentials: true }
      );

      // Update local state
      setBooking({ ...booking, status: "cancelled" });
     
    } catch (err: any) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to cancel service");
    }
  };


  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!booking) return <p className="text-center mt-10 text-gray-500">No booking details found.</p>;
  if (!authorized) return null;

  //JSX
  return (
    <div className="ml-64 px-6 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
          <Link href={`/dashboard/book-service/${booking.service.id}`} className="hover:underline">
            {booking.service.serviceTitle}
          </Link>
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Category:</span> {booking.service.serviceCategory}</p>
          <p><span className="font-semibold">Description:</span> {booking.service.description}</p>
          <p><span className="font-semibold">Price:</span> ${booking.service.price}</p>
          <p><span className="font-semibold">Company:</span> {booking.service.companyName}</p>
          <p><span className="font-semibold">Service Date:</span> {new Date(booking.serviceDate).toLocaleDateString()}</p>
          <p><span className="font-semibold">Service Address:</span> {booking.serviceAddress}</p>
          <p><span className="font-semibold">Status:</span> {booking.status}</p>
        </div>

        <div className="mt-6 flex justify-between items-center flex-wrap gap-2">
          <Link href="/dashboard/services-history">
            <button className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
              Back to History
            </button>
          </Link>

          <Link href={`/dashboard/book-service/${booking.service.id}`}>
            <button className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-500 transition">
              Book Again
            </button>
          </Link>

          <button
            onClick={handleCancel}
            disabled={booking.status === "cancelled"}
            className={`px-5 py-2 text-black font-semibold rounded-full transition
              ${booking.status === "cancelled"
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-400 hover:bg-red-500"
              }`}>
            {booking.status === "cancelled" ? "Cancelled" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
