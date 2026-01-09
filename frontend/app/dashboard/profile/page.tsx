"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  // State variables
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Change handlers
  const handleChangeName = (e: any) => setName(e.target.value);
  const handleChangeEmail = (e: any) => setEmail(e.target.value);
  const handleChangePhone = (e: any) => setPhone(e.target.value);
  const handleChangePassword = (e: any) => setPassword(e.target.value);

 useEffect(() => {

  // Define async function inside useEffect
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:3000/customer/profile', {
        withCredentials: true,
      });

      setId(response.data.id);
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phoneNumber);
      setPassword(""); // never prefill password
    } catch (err) {
      console.error(err);
      setError("Failed to fetch profile. Please login again.");
      router.push("/login");
    }
  };

  fetchProfile();
}, [router]);

  // Update profile
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Frontend validation
    if (!name || !email || !phoneNumber) {
      setError("Name, Email, and Phone Number are required.");
      return;
    }
    if (name.length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!/^01\d{9}$/.test(phoneNumber)) {
      setError("Phone number must start with 01 and be exactly 11 digits.");
      return;
    }
    if (password && password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    try {
      const updateData: any = { name, email, phoneNumber };
      if (password) updateData.password = password;

      const response = await axios.put('http://localhost:3000/customer/replace-profile/' + id, updateData, {
        withCredentials: true,
      });

      setMessage(response.data.message || "Profile updated successfully!");
      setPassword("");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", marginBottom: "50px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>Profile Page</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleChangeName}
          style={inputStyle}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
          style={inputStyle}
        /><br />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handleChangePhone}
          style={inputStyle}
          maxLength={11}
        /><br />
        <input
          type="password"
          placeholder="Enter new password (leave blank to keep old)"
          value={password}
          onChange={handleChangePassword}
          style={inputStyle}
        /><br />
        {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
        {message && <p style={{ color: "green", fontSize: "15px" }}>{message}</p>}
        <button type="submit" style={buttonStyle}>Update Profile</button>
      </form>
      <p style={{ marginTop: "20px" }}>Want to go back?</p>
      <Link href="/dashboard">
        <button style={{ ...buttonStyle, backgroundColor: "#007bff", marginTop: "10px" }}>Dashboard</button>
      </Link>
    </div>
  );
}

const inputStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "250px",
};

const buttonStyle = {
  fontFamily: "Arial, sans-serif",
  color: "white",
  backgroundColor: "#28a745",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};
