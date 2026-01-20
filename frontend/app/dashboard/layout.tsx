"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Sidebar from "@/components/Sidebar";
import HeaderDash from "@/components/HeaderDash";


export default function DashboardLayout({ children }: { children: React.ReactNode })  {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // Auth Check to allow access
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/customer/profile", {
          withCredentials: true,
        });
        setAuthorized(true);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (!authorized) return null;

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <main style={mainStyle}>
        <HeaderDash />

        {/* Page Content */}
        <section style={contentStyle}>
          {children}
        </section>

       
      </main>
    </div>
  );
}

/* ===== Styles ===== */
const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#ffffff",
  fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
};

const mainStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as const,
};

const contentStyle = {
  flex: 1,
  padding: "25px",
  overflowY: "auto" as const,
};
