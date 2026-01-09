"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        router.push("/dashboard");
      } catch {
        // Not logged in
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://localhost:3000/customer/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setEmail("");
      setPassword("");

      setSuccess("Login successful! Redirecting to dashboard...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "97vh",
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          width: "300px",
          height: "auto",
          backgroundColor: "white",
        }}
      >
       { /* ✅ SUCCESS */}
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
              padding: "12px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              border: "1px solid #d33434",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            <span>{error}</span>
          </div>}
        <h2 style={{ marginBottom: "10px"}}>Login</h2>
        <span style={{ color: "#7a7676", fontSize: "12px", marginBottom: "20px" }}>- use your email & password to login</span>

        

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
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
            type="password"
            placeholder="Enter Password"
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
            Login
          </button>
        </form>

        <span style={{ marginTop: "15px" }}>Don't have an account?{" "}
        <Link href="/register" style={{ color: "#eec200", fontWeight: "bold" ,textDecoration:"none",fontSize: "16px"}}>Register</Link></span>

        <Link href="/home" style={{ color: "#2baed6", marginTop: "15px",fontWeight: "bold" ,textDecoration:"none", fontSize: "15px" }}>← Back to Home</Link>
      </div>
    </div>
  );
}
