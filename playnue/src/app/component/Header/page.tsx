import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="bg-black text-white px-4 py-3 flex justify-between items-center">
      {/* Logo and Tagline as Images */}
      <div className="flex items-center space-x-2">
        {/* Logo Image */}
        <img
          src="/path-to-your-logo.png" // Replace with your logo image path
          alt="PlayNue Logo"
          className="h-8"
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/component/Bookings" className="hover:text-gray-300">
          Booking
        </Link>
        <a href="#gallery" className="hover:text-gray-300">
          Gallery
        </a>
        <a href="#contact" className="hover:text-gray-300">
          Contact
        </a>
      </div>

      {/* Login/Sign Up Button */}
      <Link href={"/component/Login"}>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md">
          Login/Sign Up
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;

