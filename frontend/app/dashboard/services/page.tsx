"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ServicesPage() {
  const router = useRouter();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Backend checks the HttpOnly cookie and returns 401 if not logged in
        await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        setAuthorized(true);// authorized if no error

        const res = await axios.get("http://localhost:3000/services", {
          withCredentials: true,
        });

        setServices(res.data);
      } catch (err: any) {
        console.error("Not authorized or error:", err);
        router.push("/login"); // redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [router]);

  if (loading) return <p>Loading services...</p>;
  if (!authorized) return null;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Available Services</h2>

      {services.length === 0 ? (
        <p>No services available</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service.id} style={{ marginBottom: "10px" }}>
              <strong>{service.serviceTitle}</strong> | {service.serviceCategory} | ${service.price} | {service.companyName}
              <Link href={"/dashboard/book-service/" + service.id}>
                <button style={{ padding: "8px 16px", marginLeft: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                  Book
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/dashboard">
        <button style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", marginTop: "20px", cursor: "pointer" }}>
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
}
