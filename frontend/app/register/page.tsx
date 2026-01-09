
      "use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !password) {
      setError("All fields are required.");
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
      setError("Phone number must start with 01 and be 11 digits.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/customer/register", {
        name,
        email,
        phoneNumber,
        password,
      });

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "97vh",
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "320px",
          backgroundColor: "white",
        }}
      >{/* ✅ SUCCESS */}
        {success && (
          <div
            style={{
              backgroundColor: "#d1fae5",
              color: "#065f46",
              padding: "12px 16px",
              borderRadius: "6px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid #34d399",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span>{success}</span>
          </div>
        )}

        {/* ❌ ERROR */}
        {error && <div
            style={{
              backgroundColor: "#fad1d1",
              color: "#f80505",
              padding: "12px 16px",
              borderRadius: "6px",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid #d33434",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <span>{error}</span>
          </div>}


        <h2 style={{ marginBottom: "10px" }}>Register</h2>
        <span style={{ color: "#7a7676", fontSize: "12px", marginBottom: "20px" }}>- use your email & phone number to register</span>

        

        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            width: "250px",
          }}
        />

        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            width: "250px",
          }}
        />

        <br />

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          maxLength={11}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            width: "250px",
          }}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />

        <br />

        <button
          type="submit"
          style={{
              marginTop: "15px",
              background: "linear-gradient(to right, #f7e707ff, #eede00ff)",
              color: "black",
              padding: "10px",
              width: "100%",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
          }}
        >
          Register
        </button>
      </form>

        <span style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#eec200",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </span>

        <Link
          href="/home"
          style={{
            color: "#2baed6",
            marginTop: "15px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
