"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; // For user icon

const Navbar = () => {
  // State to track if the user is logged in and the user's name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Check localStorage for user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(user.name || "User"); // Display "User" if name is not available
    }
  }, []);

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
      </div>

      {/* Login/Sign Up Button or User Icon */}
      <div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            {/* User Icon */}
            <FaUserCircle className="text-2xl cursor-pointer" />
            <span className="text-sm font-medium">Welcome, {userName}</span>
          </div>
        ) : (
          <Link href={"/component/Login"}>
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md">
              Login/Sign Up
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
