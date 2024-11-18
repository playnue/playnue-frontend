"use client";
import React, { useState } from "react";
import {
  Star,
  Share2,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Camera,
  Check,
} from "lucide-react";
import Link from "next/link";

interface VenueDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  price: number;
  addGuestPrice: number;
  latitude: number; // Add latitude
  longitude: number; // Add longitude
}

const BadmintonBooking = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState(2);

  const venue: VenueDetails = {
    name: "Badminton Academy",
    address: "70 Bright St New York, USA",
    phone: "+3 80992 31212",
    email: "yourmail@example.com",
    rating: 5.0,
    reviews: 15,
    price: 150,
    addGuestPrice: 5,
    latitude: 30.264417 , // Add latitude
    longitude: 78.080472, // Add longitude
  };

  const reviews = [
    {
      name: "Amanda",
      date: "06/04/2023",
      rating: 5.0,
      text: "Absolutely perfect! If you are looking for a perfect place for friendly matches with your friends or a competitive match, it is the best place.",
      images: [
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
      ],
      wouldBookAgain: true,
    },
    {
      name: "John",
      date: "05/20/2023",
      rating: 4.5,
      text: "Great venue with all the facilities needed, but could use a bit more seating for spectators.",
      images: ["/path/to/image4.jpg", "/path/to/image5.jpg"],
      wouldBookAgain: true,
    },
  ];

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4lUoE8b4-OsHEOkrr5wsxPbSMSnG231dDegeGRA2m8-XGVnjPwaok04&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4lUoE8b4-OsHEOkrr5wsxPbSMSnG231dDegeGRA2m8-XGVnjPwaok04&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9zmS1hmMgEeU60GsRap-aW0OZnXg5tYthEg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9zmS1hmMgEeU60GsRap-aW0OZnXg5tYthEg&s",
  ];

  const includes = [
    "Badminton Racket Unlimited",
    "Bats",
    "Hitting Machines",
    "Multiple Courts",
    "Spare Players",
    "Instant Racket",
    "Green Turfs",
  ];

  const rules = [
    "Non Marking Shoes are recommended not mandatory for Badminton.",
    "A maximum number of members per booking per badminton court is admissible fixed by Venue Vendors",
    "No pets, no seeds, no gum, no glass, no hitting or swinging outside of the cage",
  ];

  const amenities = [
    "Parking",
    "Drinking Water",
    "First Aid",
    "Change Room",
    "Shower",
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Navigation */}

      {/* Image Gallery */}
      <div className="relative mb-8">
        <div className="flex overflow-hidden">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Venue ${index + 1}`}
              className={`w-full h-[400px] object-cover transition-transform duration-300 ${
                index === activeImageIndex ? "block" : "hidden"
              }`}
            />
          ))}
        </div>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2"
          onClick={() =>
            setActiveImageIndex(
              (prev) => (prev - 1 + images.length) % images.length
            )
          }
        >
          <ChevronLeft />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2"
          onClick={() =>
            setActiveImageIndex((prev) => (prev + 1) % images.length)
          }
        >
          <ChevronRight />
        </button>
        <button className="absolute right-4 bottom-4 bg-white rounded-lg px-4 py-2 flex items-center gap-2">
          <Camera className="w-4 h-4" />
          More Photos
        </button>
      </div>

      {/* Venue Info */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-semibold">{venue.name}</h1>
            <div className="bg-green-500 rounded-full p-1">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {venue.address}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {venue.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {venue.email}
            </div>
          </div>

          {/* Sports Icon Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Available Sports:</h2>
            <div className="grid grid-cols-4 gap-6">
              {/* Badminton Icon */}
              <div className="flex flex-col items-center text-sm">
                <img
                  src="https://img.icons8.com/color/48/000000/badminton.png"
                  alt="Badminton"
                  className="w-12 h-12"
                />
                <span>Badminton</span>
              </div>
              {/* Tennis Icon */}
              <div className="flex flex-col items-center text-sm">
                <img
                  src="https://img.icons8.com/color/48/000000/tennis.png"
                  alt="Tennis"
                  className="w-12 h-12"
                />
                <span>Tennis</span>
              </div>
              {/* Football Icon */}
              <div className="flex flex-col items-center text-sm">
                <img
                  src="https://img.icons8.com/color/48/000000/football2.png"
                  alt="Football"
                  className="w-12 h-12"
                />
                <span>Football</span>
              </div>
              {/* Basketball Icon */}
              <div className="flex flex-col items-center text-sm">
                <img
                  src="https://img.icons8.com/color/48/000000/basketball.png"
                  alt="Basketball"
                  className="w-12 h-12"
                />
                <span>Basketball</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Add to favourite
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-green-600">
              {venue.rating}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-gray-600">{venue.reviews} Reviews</span>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="flex gap-6 border-b mb-6">
            {[
              "Overview",
              "Includes",
              "Rules",
              "Amenities",
              "Gallery",
              "Reviews",
              "Locations",
            ].map((tab) => (
              <button
                key={tab}
                className={`pb-2 ${
                  activeTab === tab.toLowerCase()
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Section */}
          {activeTab === "overview" && (
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                Badminton Academy is a renowned sports facility situated in
                Sacramento, CA. With a commitment to providing high-quality
                services, we offer a range of amenities and equipment to support
                athletes in their training and development.
              </p>
              <button className="text-green-500">Show More</button>
            </div>
          )}

          {/* Includes Section */}
          {activeTab === "includes" && (
            <div className="grid grid-cols-2 gap-4">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Rules Section */}
          {activeTab === "rules" && (
            <div className="space-y-4">
              {rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-red-500"
                >
                  <div className="mt-1">⊘</div>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          )}

          {/* Amenities Section */}
          {activeTab === "amenities" && (
            <div className="flex flex-wrap gap-6">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src="/path/to/avatar.jpg"
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-xs text-gray-500">
                          Booked on {review.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                  <div className="flex mt-2 gap-2">
                    {review.images.map((imgSrc, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={imgSrc}
                        alt={`Review image ${imgIndex + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                  <p
                    className={`mt-2 text-sm ${
                      review.wouldBookAgain ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {review.wouldBookAgain
                      ? "✓ Yes, I would book again."
                      : "✗ No, I do not want to book again."}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="border rounded-lg overflow-hidden shadow-sm">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDfpdR57AhvUccjGREgfhGaljfwohSOGt4&q=${venue.latitude},${venue.longitude}`}
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-none"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Booking Section */}
        <div className="w-96">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Book A Court</h2>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span>{venue.name}</span>
                <span className="text-green-500">available Now</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div>
                  <span className="text-2xl font-semibold text-green-600">
                    ${venue.price}
                  </span>
                  <span className="text-gray-500">/hr</span>
                  <div className="text-sm text-gray-500">up to 1 guests</div>
                </div>
                <span className="text-2xl">+</span>
                <div>
                  <span className="text-2xl font-semibold text-green-600">
                    ${venue.addGuestPrice}
                  </span>
                  <span className="text-gray-500">/hr</span>
                  <div className="text-sm text-gray-500">
                    each additional guest
                  </div>
                </div>
              </div>
              <Link href={"/component/BookNow"}>
                <button className="w-full bg-gray-900 text-white py-3 rounded-lg mb-6">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadmintonBooking;
