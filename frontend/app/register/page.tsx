"use client";
import Link from "next/link";
import { useState} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeName = (e:any) => setName(e.target.value);
  const handleChangeEmail = (e: any) => setEmail(e.target.value);
  const handleChangePhone = (e: any) => setPhone(e.target.value);
  const handleChangePassword = (e: any) => setPassword(e.target.value);

  const handleSubmit = async(e: any) => {
    e.preventDefault();

    // Frontend validation
   if (!name || !email || !phoneNumber || !password) {
    setError('All fields are required.');
    return;
  }
  if (name.length < 2) {
    setError('Name must be at least 2 characters long.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('Invalid email format.');
    return;
  }
  if (!/^01\d{9}$/.test(phoneNumber)) {
    setError('Phone number must start with 01 and be exactly 11 digits long.');
    return;
  }
  if (password.length < 6) {
    setError('Password must be at least 6 characters long.');
    return;
  }


    setError('');

    try {
      const customerRegisterData = {
        name,
        email,
        phoneNumber,
        password
      };

      const response = await axios.post("http://localhost:3000/customer/register", customerRegisterData);
      console.log('Registration successful:', response.data);

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      alert('Registration successful! You can now log in.');

     //redirect to login page
     router.push('/login');

    } catch (error: any) {
  if (error.response && error.response.data) {
    setError(error.response.data.message || 'Registration failed.');
  } else {
    setError('Registration failed. Please try again.');
  }}
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", marginTop: "50px" }}>
      <h2 style={{ marginBottom: "20px" }}>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input type="text" placeholder="Name" value={name} onChange={handleChangeName} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} /><br />
          <input type="email" placeholder="Email" value={email} onChange={handleChangeEmail} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} /><br />
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={handleChangePhone} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} maxLength={11} /><br />
          <input type="password" placeholder="Password" value={password} onChange={handleChangePassword} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} /><br />
        </div>
        <div style={{ textAlign: "center" }}>
          {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
          <button type="submit" style={{ fontFamily: "Arial, sans-serif", color: "white", backgroundColor: "#ff0505", border: "none", padding: "10px 20px", borderRadius: "5px" }}>Register</button>
        </div>
      </form>
      <p>Already have an account?</p>
      <Link href="/login">
        <button style={{ fontFamily: "Arial, sans-serif", color: "white", backgroundColor: "#007bff", border: "none", padding: "10px 20px", borderRadius: "5px" }}>Login</button>
      </Link>
    </div>
  );
}
