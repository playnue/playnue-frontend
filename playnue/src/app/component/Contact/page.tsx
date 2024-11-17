"use client"
import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

        {/* Content Section */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          {/* Contact Information */}
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-lg mb-4">
            If you have any questions, feedback, or need assistance, feel free
            to reach out to us. We’d love to hear from you!
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Email:</h3>
          <p className="text-lg mb-4">
            <a
              href="mailto:contact@playnue.com"
              className="text-blue-500 hover:underline"
            >
              contact@playnue.com
            </a>
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Phone:</h3>
          <p className="text-lg mb-4">
            <a href="tel:+919876543210" className="text-blue-500 hover:underline">
              +91 98765 43210
            </a>
          </p>

          {/* Address Section */}
          <h3 className="text-xl font-semibold mt-6 mb-2">Office Address:</h3>
          <p className="text-lg mb-4">
            546, Manav Enclave, Indira Nagar, <br />
            Lucknow, Uttar Pradesh - 226016
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
