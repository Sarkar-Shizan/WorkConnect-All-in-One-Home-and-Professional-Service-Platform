"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function BookServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id;

  const [service, setService] = useState<any>("");
  const [customerId, setCustomerId] = useState(0);
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/services/details/" + serviceId,
          { withCredentials: true }
        );
        setService(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch service details.");
      }
    };

    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:3000/customer/profile", { //get this customer by token
          withCredentials: true,
        });
        setCustomerId(res.data.id);
      } catch {
        router.push("/login");
      }
    };

    fetchService();
    fetchCustomer();
  }, [serviceId, router]); //the same page component stays mounted, but serviceId changes----any value used inside useEffect that comes from outside should be listed as a dependency including router

  const handleBook = async (e: any) => {
    e.preventDefault();
    if (!serviceAddress || !serviceDate) {
      setError("Please fill all fields");
      return;
    }

    try {
      const bookingData = { serviceId: service.id, serviceAddress, serviceDate };
      const res = await axios.post(
        "http://localhost:3000/services/book-service/" + customerId,
        bookingData,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Service booked successfully!");
      setServiceAddress("");
      setServiceDate("");
      setError("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Booking failed");
      setMessage("");
    }
  };

  if (!service)
    return <p className="text-center mt-10 text-gray-500">Loading service details...</p>;

  return (
    <div className="ml-64 px-6 py-8 bg-gray-50 min-h-screen flex flex-col items-center">

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Service Info & Image */}
        <div className="md:w-1/2 bg-yellow-50 p-6 flex flex-col justify-center items-center">
          <img
            src="/images/Work.png"
            alt="Service"
            className="h-64 w-full object-cover rounded-lg mb-6"/>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">{service.serviceTitle}</h2>
            <p className="text-gray-600 mb-1">Category: {service.serviceCategory}</p>
            <p className="text-gray-600 mb-1">Price: {service.price} Tk</p>
            <p className="text-gray-600">Company: {service.companyName}</p>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center items-center md:items-start">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Book Your Service
          </h2>

          <form className="flex flex-col w-full max-w-md gap-4" onSubmit={handleBook}>
            <input
              type="text"
              placeholder="Service Address"
              value={serviceAddress}
              onChange={(e) => setServiceAddress(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"/>
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"/>

            {error && <p className="text-red-500 font-medium flex justify-center">{error}</p>}
            {message && <p className="text-green-500 font-medium flex justify-center">{message}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-400 transition-all duration-200">
              Book Service
            </button>

            <Link href="/dashboard/services" className="w-full">
              <button
                type="button"
                className="w-full py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-all duration-200">
                Back to Services
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

