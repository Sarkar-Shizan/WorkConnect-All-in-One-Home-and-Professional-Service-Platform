"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ServicesHistory() {
  const router = useRouter();

  const [bookedServices, setBookedServices] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);

  /* ========= Fetch History ========= */
  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        // Fetch customer profile (HttpOnly cookie sent automatically)
        const profileRes = await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true, // important for HttpOnly cookie
        });
        setAuthorized(true);
        const customerId = profileRes.data.id;

        // Fetch booked services for this customer
        const res = await axios.get("http://localhost:3000/services/" + customerId, {
          withCredentials: true, // cookie sent automatically
        });

       

        setBookedServices(res.data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch services. Please login again.");
        router.push("/login"); // redirect if unauthorized
      } finally {
        setLoading(false);
      }
    };

    fetchServiceHistory();
  }, [router]);

  /* ========= JSX ========= */
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!authorized) return null;

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px" }}>My Services History</h2>

      {bookedServices.length === 0 ? (
        <p>No services booked yet.</p>
      ) : (
        <ul style={listStyle}>
          {bookedServices.map((booking) => (
            <li key={booking.id} style={listItemStyle}>
              <Link
                href={"/dashboard/booked-details/" + booking.id}
                style={linkStyle}
              >
                {booking.service.serviceTitle}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/dashboard">
        <button style={dashboardButtonStyle}>Dashboard</button>
      </Link>
    </div>
  );
}

/* ========= Styles ========= */
const containerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  marginTop: "50px",
  fontFamily: "Arial, sans-serif",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  width: "100%",
  maxWidth: "500px",
};

const listItemStyle = {
  marginBottom: "10px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const linkStyle = {
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  fontFamily: "Arial, sans-serif",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};

const dashboardButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#007bff",
  marginTop: "20px",
};
