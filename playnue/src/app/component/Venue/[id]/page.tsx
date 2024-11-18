"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, MapPin, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "next/navigation";
import Link from "next/link";
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = (latitude: number, longitude: number) => ({
  lat: latitude,
  lng: longitude,
});

interface VenueDetails {
  id: number;
  name: string;
  city: string;
  address: string;
  sport: string;
  rating: number;
  reviews: number;
  images: string[];
  phone: string;
  email: string;
  price: number;
  latitude: number;
  longitude: number;
  sports: { name: string; icon: string }[];
  amenities: string[];
}

// Sample venue data
const venueData: VenueDetails[] = [
  {
    id: 1,
    name: "John Doe Turf",
    city: "Lucknow",
    address: "70 Bright St, Lucknow",
    sport: "⚽ Football",
    rating: 4.5,
    reviews: 120,
    images: [
      "https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf.jpg",
    ],
    phone: "+91 9876543210",
    email: "johndoe@example.com",
    price: 150,
    latitude: 30.264417,
    longitude: 78.080472,
    sports: [{ name: "Football", icon: "⚽" }],
    amenities: ["Changing rooms", "Parking", "Restrooms"],
  },
  {
    id: 2,
    name: "Jane Smith Turf",
    city: "Lucknow",
    address: "80 Bright St, Lucknow",
    sport: "🏀 Basketball",
    rating: 4.7,
    reviews: 95,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfEKiZgLi3sQ_Yc_vWq6AHQYJ7RVOQgwOhw&s",
    ],
    phone: "+91 9876543211",
    email: "janesmith@example.com",
    price: 200,
    latitude: 30.264417,
    longitude: 78.080472,
    sports: [{ name: "Basketball", icon: "🏀" }],
    amenities: ["Seating area", "Refreshments", "Locker rooms"],
  },
];

const VenuePage = () => {
  const { id } = useParams(); // Use useParams to get the dynamic route parameter
  const [venue, setVenue] = useState<VenueDetails | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const venueId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id || "1"); // Convert id from string to number
    const selectedVenue = venueData.find((v) => v.id === venueId);
    console.log(selectedVenue);
    setVenue(selectedVenue || venueData[0]); // Fallback to the first venue if ID not found
  }, [id]); // Dependency on id

  if (!venue) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{venue.name}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <p>{venue.address}</p>
            <div className="flex items-center">
              <span className="text-yellow-400">⭐</span>
              <span>
                {venue.rating} ({venue.reviews} ratings)
              </span>
            </div>
            <button className="text-green-500 hover:underline">
              Rate Venue
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={"/component/BookNow"}>
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative mb-8">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img
            src={venue.images[currentImage]}
            alt={`Venue image ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            onClick={() =>
              setCurrentImage((prev) => (prev + 1) % venue.images.length)
            }
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {venue.images.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentImage ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrentImage(idx)}
            />
          ))}
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Timing */}
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Timing</h2>
            <p>6:30 AM - 11:30 PM</p>
          </Card>

          {/* Location */}
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
          {/* Sports Available */}
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Sports Available
              <span className="text-sm font-normal text-gray-500 ml-2">
                (Click on sports to view price chart)
              </span>
            </h2>
            <div className="flex gap-4">
              {venue.sports.map((sport) => (
                <button
                  key={sport.name}
                  className="p-4 border rounded-lg flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">{sport.icon}</span>
                  <span>{sport.name}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Amenities */}
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {venue.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </Card>

          {/* About Venue */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">About Venue</h2>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Football:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  It is recommended but not compulsory to wear football studs
                  while playing at the facility.
                </li>
                <li>Metal studs are not allowed.</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Related Venues */}
        <div>
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-2">
              Related To {venue.name}
            </h2>
            <p className="text-sm text-gray-600">
              Sports Clubs in Next to Karnataka State Hockey Stadium, Football
              Grounds in Next to Karnataka State Hockey Stadium, Box-cricket
              Clubs in Next to Karnataka State Hockey Stadium, Football Grounds
              in Bengaluru, Box-cricket Clubs in Bengaluru, Sports Clubs in
              Bengaluru
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VenuePage;
