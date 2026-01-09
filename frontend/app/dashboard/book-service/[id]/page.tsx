"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Notifications from "@/components/Notificaton";

export default function BookServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = (params.id);

  const [service, setService] = useState<any>(null);
  const [customerId, setCustomerId] = useState(0);
  const [serviceAddress, setServiceAddress] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the selected service
    const fetchService = async () => {
      try {
        const res = await axios.get("http://localhost:3000/services/details/" + serviceId, {
          withCredentials: true,
        });
        setService(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch service details.");
      }
    };

    // Fetch customer profile to get customerId
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        setCustomerId(res.data.id);
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    };

    fetchService();
    fetchCustomer();
  }, [serviceId, router]);

  const handleBook = async (e: any) => {
    e.preventDefault();

    if (!serviceAddress || !serviceDate) {
      setError("Please fill all fields");
      return;
    }

    try {
      const bookingData = {
        serviceId: service.id, // Pass the selected service ID
        serviceAddress,
        serviceDate,
      };

      const res = await axios.post(
        "http://localhost:3000/services/book-service/" + customerId, bookingData, {
        withCredentials: true
      });

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

  if (!service) return <p>Loading service details...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Notifications />
      <h2>Book Service: {service.serviceTitle}</h2>
      <p>Category: {service.serviceCategory}</p>
      <p>Price: ${service.price}</p>
      <p>Company: {service.companyName}</p>

      <form
        onSubmit={handleBook}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}
      >
        <input
          type="text"
          placeholder="Service Address"
          value={serviceAddress}
          onChange={(e) => setServiceAddress(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={serviceDate}
          onChange={(e) => setServiceDate(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <button type="submit" style={buttonStyle}>Book Service</button>
      </form>

      <Link href="/dashboard/services">
        <button style={{ ...buttonStyle, marginTop: "20px", backgroundColor: "#007bff" }}>
          Back to Services
        </button>
      </Link>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "300px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  cursor: "pointer",
};
