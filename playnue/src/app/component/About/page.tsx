"use client"
import React from "react";

const AboutUs = () => {
    return (
      <div className="bg-gray-100 text-gray-800 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
          <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          {/* Image */}
          <div className="flex justify-center mb-8">
            <img 
              src="data:image/jpeg;base64,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" 
              alt="Sports Booking Platform" 
              className="rounded-lg shadow-lg max-w-full h-auto" 
            />
          </div>
          
          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-10 text-center">
              PlayNue is an online sports booking platform designed to connect 
              sports enthusiasts with local sports facilities, fields, and venues. 
              Users can browse available slots, book facilities, and make payments 
              conveniently through the platform. The project aims to cater to 
              individuals and groups looking for flexible booking options for sports 
              activities and events.
            </p>
          </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default AboutUs;