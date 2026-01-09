"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function BookedServiceDetails() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // booking ID

  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  /* ========= Fetch Booking ========= */
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Backend checks the HttpOnly cookie and returns 401 if not logged in
        await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        setAuthorized(true); // authorized if no error
        const res = await axios.get(
          "http://localhost:3000/services/booking/" + id,
          { withCredentials: true } // important for HttpOnly cookie
        );

        setBooking(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, router]);

  /* ========= UI States ========= */
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!booking) return <p>No booking details found.</p>;
  if (!authorized) return null;

  /* ========= JSX ========= */
  return (
    <div style={containerStyle}>
      <h2>
        <Link
          href={"/dashboard/book-service/" + booking.service.id}
          style={linkStyle}
        >
          {booking.service.serviceTitle}
        </Link>
      </h2>

      <p><strong>Category:</strong> {booking.service.serviceCategory}</p>
      <p><strong>Description:</strong> {booking.service.description}</p>
      <p><strong>Price:</strong> ${booking.service.price}</p>
      <p><strong>Company:</strong> {booking.service.companyName}</p>
      <p>
        <strong>Service Date:</strong>{" "}
        {new Date(booking.serviceDate).toLocaleDateString()}
      </p>
      <p><strong>Service Address:</strong> {booking.serviceAddress}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      <Link href="/dashboard/services-history">
        <button style={buttonStyle}>Back to History</button>
      </Link>
    </div>
  );
}

/* ========= Styles ========= */
const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
};
