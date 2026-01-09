import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      background: "linear-gradient(to right, #f7e707ff, #eede00ff)",
      padding: "15px",
      display: "flex",
      justifyContent: "flex-end",
      gap: "25px"
    }}>
      <Link href="/home" style={{ color: "black", textDecoration: "underline", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>Home</Link>
      <Link href="/login" style={{ color: "black", textDecoration: "underline", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>Login</Link>
      <Link href="/register" style={{ color: "black", textDecoration: "underline", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>Register</Link>
    </nav>
  );
}
