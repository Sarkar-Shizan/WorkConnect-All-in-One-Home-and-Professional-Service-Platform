"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required.');
    } 

    
    setError('');

    try {
      const customerLoginData = {
        email,
        password
      };
      const response = await axios.post("http://localhost:3000/customer/auth/login", customerLoginData);
      console.log('Login successful:', response.data);

      // Reset form
      setEmail('');
      setPassword('');
      alert('Login successful!');

     //redirect to login page
     router.push('/dashboard');

    } catch (error: any) {
  if (error.response && error.response.data) {
    setError(error.response.data.message || 'Login failed.');
  } else {
    setError('Login failed. Please try again.');
  }
}
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", marginTop: "50px" }}>
      <h2 style={{ marginBottom: "20px" }}>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="email" placeholder="Enter Email" name="email" value={email} onChange={handleChangeEmail} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/><br/>
        <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleChangePassword} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/><br/>
        </div>
        <div style={{ textAlign: "center" }}>
          {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
        <button type="submit" style={{ fontFamily: "Arial, sans-serif", color: "white", backgroundColor: "#007bff", border: "none", padding: "10px 20px", borderRadius: "5px" }}>Login</button>
        </div>
      </form>
    <p>Don't have an account?</p>
    <Link href="/register"><button style={{ fontFamily: "Arial, sans-serif", color: "white", backgroundColor: "#ff0505ff", border: "none", padding: "10px 20px", borderRadius: "5px" }}>Register</button></Link>
    </div>
  );
}
