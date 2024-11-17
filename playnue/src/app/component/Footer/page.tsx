"use client"
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Company Name and Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">PlayNue</h1>
          <p className="text-sm mt-1">© {new Date().getFullYear()} PlayNue. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
          <li>
            <Link
              href="/component/About"
              className="hover:underline text-sm transition duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/component/Contact"
              className="hover:underline text-sm transition duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/component/PrivacyPolicy"
              className="hover:underline text-sm transition duration-300"
            >
              Privacy Policy    
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
