"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import logo from "/public/logo.png";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State to toggle mobile menu

  return (
    <nav className="bg-black text-white px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Image
          src={logo}
          alt="PlayNue Logo"
          className="h-8"
          style={{ height: "48px", width: "76px" }}
        />
      </div>

      {/* Desktop Links */}
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

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
        </button>
      </div>

      {/* User Info or Login/Signup Button */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
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
          <Link href="/component/Login">
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md">
              Login/Sign Up
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-black flex flex-col space-y-4 p-4 md:hidden">
          <Link href="/" className="hover:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link href="/component/Bookings" className="hover:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
            Booking
          </Link>
          <Link href="#gallery" className="hover:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
            Gallery
          </Link>
          <Link
            href="/component/User_Dashboard"
            className="hover:text-gray-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            User Dashboard
          </Link>
          {user ? (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <Link href="/component/Login" onClick={() => setMobileMenuOpen(false)}>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md">
                Login/Sign Up
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
