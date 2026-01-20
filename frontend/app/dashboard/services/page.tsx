"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Check if customer is logged in
        await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        setAuthorized(true);

        // Fetch services
        const res = await axios.get("http://localhost:3000/services", {
          withCredentials: true,
        });
        setServices(res.data);
      } catch (err: any) {
        console.error("Not authorized or error:", err);
        router.push("/login");
      } 
    };

    fetchServices();
  }, [router]);

  if (!authorized) return null;

  return (
    <div className="ml-64 px-6 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        Available Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:scale-105 transform transition-all duration-300"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{service.serviceTitle}</h3>
                <p className="text-gray-600">Category: {service.serviceCategory}</p>
                <p className="text-gray-600">Price: {service.price} Tk</p>
                <p className="text-gray-600">Company: {service.companyName}</p>
              </div>

              <Link href={"/dashboard/book-service/" + service.id}>
                <button className="mt-4 w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold rounded-full transition duration-300">
                  Book
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
