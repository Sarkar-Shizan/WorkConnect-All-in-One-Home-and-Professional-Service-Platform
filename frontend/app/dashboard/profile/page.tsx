"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Profile() {
  const router = useRouter();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => { //async allows you to use await inside the function
      try {
        const res = await axios.get("http://localhost:3000/customer/profile", { //await pauses the function until the server responds
          withCredentials: true,
        });

        setId(res.data.id);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phoneNumber);
      } catch (err) {
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
// Frontend validation

if (name.length < 2) {
 toast.error("Name must be at least 2 characters long.");
  return;
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
 toast.error("Invalid email format.");
  return;
}
if (!/^01\d{9}$/.test(phoneNumber)) {
  toast.error("Phone number must start with 01 and be exactly 11 digits.");
  return;
}
if (password && password.length < 6) {
  toast.error("Password must be at least 6 characters long.");
  return;
}
setMessage("");

    try {
      const updateData: any = { name, email, phoneNumber };
      if (password) updateData.password = password;

      const res = await axios.put(
        "http://localhost:3000/customer/replace-profile/" + id,
        updateData,
        { withCredentials: true }
      );
      setPassword("");
      setError("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleDeleteProfile = async () => {
  const ok = confirm("Are you sure you want to delete your profile? This cannot be undone.");
  if (!ok) return;

  try {
    await axios.delete("http://localhost:3000/customer/delete-account/" + id, {
      withCredentials: true,
    });

    toast.success("Profile deleted successfully.");
    router.push("/home"); 
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Delete failed");
  }
};


  return (
    <div className="ml-64 px-6 py-5 bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"/>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"/>

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={11}
            className="w-full px-4 py-2 border border-yellow-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"/>

          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-yellow-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"/>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold rounded-full transition">
            Update 
          </button>

            <button
            type="button"
            onClick={handleDeleteProfile}
            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition">
            Delete Profile
            </button>

        </form>

       
      </div>
    </div>
  );
}
