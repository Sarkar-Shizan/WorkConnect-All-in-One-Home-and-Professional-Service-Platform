"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      
      {/* Hero Section */}
      <section className="hero" style={{ padding: "50px 20px" }}>
        <h1>Welcome to WorkConnect</h1>
        <p>
          Your All-in-One Home and Business Service Platform.</p>
          <p>Hire professional teams or individuals
          for household and business tasks like painting, shifting, plumbing, cleaning, repairs, and more.
        </p>
        <button
          onClick={() => router.push('/register')}
          style={{ padding: "10px 20px", borderRadius: "5px", background: "linear-gradient(to right, #f7e707ff, #eede00ff)", color: "black", fontWeight: "bold", border: "none", cursor: "pointer" }}>
          Get Started
        </button>
      </section>

      {/* Core Features Section */}
      <section className="features" style={{ padding: "30px 20px" }}>
        <h2>Core Features</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          <div className="card" style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", width: "250px" }}>
            <h3>Customer</h3>
            <p>Browse services, book teams or workers, pay online, track orders, and rate services.</p>
          </div>
          <div className="card" style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", width: "250px" }}>
            <h3>Service Provider</h3>
            <p>Manage services, accept jobs, chat with customers, track earnings, and manage team members.</p>
          </div>
          <div className="card" style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", width: "250px" }}>
            <h3>Admin</h3>
            <p>Manage users, services, commissions, analytics, complaints, and approve providers.</p>
          </div>
          <div className="card" style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", width: "250px" }}>
            <h3>Worker</h3>
            <p>View assigned jobs, update progress, track location, chat with team leader, and monitor payments.</p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="services" style={{ padding: "30px 20px" }}>
        <h2>Popular Services</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          
          <div className="service-card" style={{ width: "220px", textAlign: "center", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
            <Image src="/images/painting.jpg" alt="Painting" width={180} height={120} style={{ borderRadius: "5px" }} />
            <h3>Painting</h3>
            <button >Explore</button>
          </div>

          <div className="service-card" style={{ width: "220px", textAlign: "center", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
            <Image src="/images/shifting.jpg" alt="Shifting" width={180} height={120} style={{ borderRadius: "5px" }} />
            <h3>Shifting</h3>
            <button>Explore</button>
          </div>

          <div className="service-card" style={{ width: "220px", textAlign: "center", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
            <Image src="/images/plumbing.jpg" alt="Plumbing" width={180} height={120} style={{ borderRadius: "5px" }} />
            <h3>Plumbing</h3>
            <button >Explore</button>
          </div>

          <div className="service-card" style={{ width: "220px", textAlign: "center", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
            <Image src="/images/cleaning.jpg" alt="Cleaning" width={180} height={120} style={{ borderRadius: "5px" }} />
            <h3>Cleaning</h3>
            <button>Explore</button>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" style={{ padding: "30px 20px" }}>
        <h2>What Our Users Say</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
          <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", width: "250px" }}>
            <p>"WorkConnect made my house shifting so easy! Professional and on time."</p>
            <h4>- Shizan, Customer</h4>
          </div>
          <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", width: "250px" }}>
            <p>"I manage my cleaning team efficiently with this platform. Everything is tracked perfectly."</p>
            <h4>- Emon, Service Provider</h4>
          </div>
          <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", width: "250px" }}>
            <p>"As an admin, I can control services, users, and track revenue easily. Love it!"</p>
            <h4>- Shoab, Admin</h4>
          </div>
        </div>
      </section>

    </div>
  );
}
