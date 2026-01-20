import Link from "next/link";
import Image from "next/image";

export default function Home() {

  return (
    <div className="bg-gradient-to-r from-[#f0f3c2] to-[#eeeeee] text-center">
      {/* Hero Section */}
      <section className="py-12 px-5">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent ">
        Welcome to WorkConnect
      </h1>
        <p className="mb-2">Your All-in-One Home and Business Service Platform.</p>
        <p className="mb-6">
          Hire professional teams or individuals for household and business tasks like painting, shifting, plumbing, cleaning, repairs, and more.
        </p>
        <div className="flex justify-center">
           <Link
          href="/register"
           className="cursor-pointer px-8 py-3 bg-gradient-to-r from-[#f7e707] to-[#eede00] text-black font-bold rounded  hover:from-yellow-500 hover:to-yellow-400 transition ">
          Get Started
          </Link>
        </div>
      </section>

      <section className="py-8 px-5">
  <h2 className="text-2xl font-semibold text-center">User Type's</h2>

  <div className="flex flex-wrap justify-center gap-5 mt-5">

    {/* Customer */}
    <div className="relative group border p-5 rounded w-60 flex flex-col justify-center items-center cursor-pointer 
                    transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="font-bold mb-2">Customer</h3>

      <div className="absolute bottom-full mb-3 w-64 left-1/2 -translate-x-1/2 bg-white border border-gray-300 p-3 rounded shadow-lg 
                      opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-10">
        Browse services, book teams or workers, pay online, track orders, and rate services.
      </div>
    </div>

    {/* Service Provider */}
    <div className="relative group border p-5 rounded w-60 flex flex-col justify-center items-center cursor-pointer
                    transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="font-bold mb-2">Service Provider</h3>

      <div className="absolute bottom-full mb-3 w-64 left-1/2 -translate-x-1/2 bg-white border border-gray-300 p-3 rounded shadow-lg 
                      opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-10">
        Manage services, accept jobs, chat with customers, track earnings, and manage team members.
      </div>
    </div>

    {/* Admin */}
    <div className="relative group border p-5 rounded w-60 flex flex-col justify-center items-center cursor-pointer
                    transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="font-bold mb-2">Admin</h3>

      <div className="absolute bottom-full mb-3 w-64 left-1/2 -translate-x-1/2 bg-white border border-gray-300 p-3 rounded shadow-lg 
                      opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-10">
        Manage users, services, commissions, analytics, complaints, and approve providers.
      </div>
    </div>

    {/* Worker */}
    <div className="relative group border p-5 rounded w-60 flex flex-col justify-center items-center cursor-pointer
                    transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="font-bold mb-2">Worker</h3>

      <div className="absolute bottom-full mb-3 w-64 left-1/2 -translate-x-1/2 bg-white border border-gray-300 p-3 rounded shadow-lg 
                      opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-10">
        View assigned jobs, update progress, track location, chat with team leader, and monitor payments.
      </div>
    </div>

  </div>
</section>


      <section className="py-8 px-5">
  <h2 className="text-2xl font-semibold">Popular Services</h2>

  <div className="flex flex-wrap justify-center gap-5 mt-5">

    {/* Painting */}
    <div className="bg-white border-2 border-yellow-400 rounded w-56 flex flex-col justify-between items-center p-5 shadow hover:shadow-lg transition transform hover:scale-105">
      <Image src="/images/painting.jpg" alt="Painting" width={180} height={120}
        className="rounded mb-3 object-cover h-28 w-full" />
      <h3 className="font-bold mb-3">Painting</h3>
      <button className="cursor-pointer w-full px-4 py-2 bg-gradient-to-r from-[#f7e707] to-[#eede00] rounded-full font-semibold hover:brightness-110 transition mt-auto">
        Explore
      </button>
    </div>

    {/* Shifting */}
    <div className="bg-white border-2 border-yellow-400 rounded w-56 flex flex-col justify-between items-center p-5 shadow hover:shadow-lg transition transform hover:scale-105">
      <Image src="/images/shifting.jpg" alt="Shifting" width={180} height={120}
        className="rounded mb-3 object-cover h-28 w-full" />
      <h3 className="font-bold mb-3">Shifting</h3>
      <button className="cursor-pointer w-full px-4 py-2 bg-gradient-to-r from-[#f7e707] to-[#eede00] rounded-full font-semibold hover:brightness-110 transition mt-auto">
        Explore
      </button>
    </div>

    {/* Plumbing */}
    <div className="bg-white border-2 border-yellow-400 rounded w-56 flex flex-col justify-between items-center p-5 shadow hover:shadow-lg transition transform hover:scale-105">
      <Image src="/images/plumbing.jpg" alt="Plumbing" width={180} height={120}
        className="rounded mb-3 object-cover h-28 w-full" />
      <h3 className="font-bold mb-3">Plumbing</h3>
      <button className="cursor-pointer w-full px-4 py-2 bg-gradient-to-r from-[#f7e707] to-[#eede00] rounded-full font-semibold hover:brightness-110 transition mt-auto">
        Explore
      </button>
    </div>

    {/* Cleaning */}
    <div className="bg-white border-2 border-yellow-400 rounded w-56 flex flex-col justify-between items-center p-5 shadow hover:shadow-lg transition transform hover:scale-105">
      <Image src="/images/cleaning.jpg" alt="Cleaning" width={180} height={120}
        className="rounded mb-3 object-cover h-28 w-full" />
      <h3 className="font-bold mb-3">Cleaning</h3>
      <button className="cursor-pointer w-full px-4 py-2 bg-gradient-to-r from-[#f7e707] to-[#eede00] rounded-full font-semibold hover:brightness-110 transition mt-auto">
        Explore
      </button>
    </div>

  </div>
</section>

      {/* Testimonials */}
      <section className="py-8 px-5">
        <h2 className="text-2xl font-semibold">What Our Users Say</h2>
        <div className="flex flex-wrap justify-center gap-5 mt-5 ">
          <div className="border p-5 rounded w-60 hover:scale-105">
            <p>"WorkConnect made my house shifting so easy! Professional and on time."</p>
            <h4 className="mt-2 font-semibold">- Shizan, Customer</h4>
          </div>
          <div className="border p-5 rounded w-60 hover:scale-105">
            <p>"I manage my cleaning team efficiently with this platform. Everything is tracked perfectly."</p>
            <h4 className="mt-2 font-semibold">- Emon, Service Provider</h4>
          </div>
          <div className="border p-5 rounded w-60 hover:scale-105">
            <p>"As an admin, I can control services, users, and track revenue easily. Love it!"</p>
            <h4 className="mt-2 font-semibold">- Shoab, Admin</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
