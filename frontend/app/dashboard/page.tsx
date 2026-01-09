"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Notifications from "@/components/Notificaton";

export default function Dashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication using HttpOnly cookie
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true, // required for HttpOnly cookie
        });
        setAuthorized(true);
      } catch (err) {
        console.error("Not authorized:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/customer/auth/logout",
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Notifications */}
      <Notifications />

      <h1>Dashboard</h1>
      <p>Select an option:</p>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/dashboard/profile">
          <button style={buttonStyle}>Profile</button>
        </Link>
        <Link href="/dashboard/services">
          <button style={buttonStyle}>Available Services</button>
        </Link>
        <Link href="/dashboard/services-history">
          <button style={buttonStyle}>Booking History</button>
        </Link>
        <button
          style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
};
