"use client";
import React from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import logo from "/public/logo.png";
import Image from "next/image";
import { PackageX } from "lucide-react";
const Navbar = () => {
  const { user, logout } = useUser(); // Get user and logout function from context

  return (
    <nav className="bg-black text-white px-4 py-3 flex justify-between items-center">
      {/* Logo and Tagline */}
      <div className="flex items-center space-x-2">
        <Image
          src={logo} // Replace with your logo image path
          alt="PlayNue Logo"
          className="h-8"
          style={{height:"48px",width:"76px"}}
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
        <Link href="#gallery" className="hover:text-gray-300">
          Gallery
        </Link>
        <Link href="/component/User_Dashboard" className="hover:text-gray-300">
        User Dashboard
        </Link>
      </div>

      {/* User Info or Login/Signup Button */}
      <div className="flex items-center space-x-4">
        {user ? (
          // Display user info if logged in
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-2xl cursor-pointer" />
            <span className="text-sm font-medium">Welcome, {user.name || "User"}</span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          // Show Login/Signup button if not logged in
          <Link href="/component/Login">
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
