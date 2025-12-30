"use client";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeName = (e:any) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e:any) => {
    setEmail(e.target.value);
  };

  const handleChangePhone = (e:any) => {
    setPhone(e.target.value);
  };
  const handleChangePassword = (e:any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e:any) =>{
  e.preventDefault(); 

  // Basic validation
  if (!name || !email || !phone || !password) {
    setError('All fields are required.');   
  }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    setError('Invalid email format.');
  }else if(password.length < 6){
    setError('Password must be at least 6 characters long.');
  }else if(!/^01\d{9}$/.test(phone)){
    setError('Phone number must start with 01 and be exactly 11 digits long');
  }else if(/[^/^[A-Za-z\s.]+$]/.test(name)){
    setError('Name must not contain any special character!');
  }else{
    setError('');
    console.log('Form submitted:', { name, email, phone, password });
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  }
};
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", marginTop: "50px" }}>
      <h2 style={{ marginBottom: "20px" }}>Registration Page</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChangeName} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/><br/>
        <input type="email" placeholder="Email" name="email" value={email} onChange={handleChangeEmail} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/><br/>
        <input type="text" placeholder="Phone Number" name="phone" value={phone} onChange={handleChangePhone} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/><br/>
        <input type="password" placeholder="Password" name="password" value={password} onChange={handleChangePassword} style={{ fontFamily: "Arial, sans-serif", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}/><br/>
        </div>
        <div style={{ textAlign: "center" }}>
        {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
       <button type="submit" style={{ fontFamily: "Arial, sans-serif", color: "white", backgroundColor: "#ff0505ff", border: "none", padding: "10px 20px", borderRadius: "5px" }}>Register</button>
      </div>
      </form>
      <p>Already have an account?</p>
    <Link href="/login"><button style={{ fontFamily: "Arial, sans-serif", color: "white", backgroundColor: "#007bff", border: "none", padding: "10px 20px", borderRadius: "5px" }}>Login</button></Link>
    </div>
  );
}

