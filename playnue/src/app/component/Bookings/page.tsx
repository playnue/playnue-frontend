"use client";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "John Doe",
    city: "New York",
    rating: 4.5,
    sport: "⚽",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf.jpg", // Replace with actual image URLs
  },
  {
    id: 2,
    name: "Jane Smith",
    city: "Los Angeles",
    rating: 4.7,
    sport: "🏀",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfEKiZgLi3sQ_Yc_vWq6AHQYJ7RVOQgwOhw&s",
  },
  {
    id: 3,
    name: "Mike Johnson",
    city: "Chicago",
    rating: 4.3,
    sport: "🏈",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 4,
    name: "Emily Davis",
    city: "Houston",
    rating: 4.6,
    sport: "🎾",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykWsVA0ONkDbUujdMhUcksudXCTa997SZKrOmyhvom1RLvuHL9MhY72M&s",
  },
  {
    id: 5,
    name: "Chris Lee",
    city: "Phoenix",
    rating: 4.4,
    sport: "⚾",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlxTF3ZHTkzw-VOCYeOJ-5I5GQzC9W_p9HRYmMfyJJAZ8WSCg8fOUthc&s",
  },
  {
    id: 6,
    name: "Alex Taylor",
    city: "Philadelphia",
    rating: 4.8,
    sport: "🏐",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfEKiZgLi3sQ_Yc_vWq6AHQYJ7RVOQgwOhw&s",
  },
];

export default function Bookings() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState("Lucknow, Uttar Pradesh");

  const handleToggle = () => {
    setIsSearching((prev) => !prev);
  };

  const scrollToVenues = () => {
    const venueSection = document.getElementById("venues-section");
    if (venueSection) {
      venueSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 items-center px-4">
          <h1 className="text-2xl font-bold text-black-600">
            PlayNue - Now in Lucknow, Uttar Pradesh
          </h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Box: Welcome Message */}
            <div className="rounded-xl bg-green-600 p-6 text-white shadow-md">
              <h2 className="text-2xl font-semibold">
                Welcome to PlayNue in Lucknow!
              </h2>
              <p className="mt-4 text-sm">
                We are excited to launch our platform in the vibrant city of
                Lucknow. Explore top-rated sports venues and make your bookings
                with ease. Enjoy a hassle-free experience at the best locations!
              </p>
              <button onClick={scrollToVenues} className="mt-4 bg-white text-green-600 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100">
                Explore Venues Below
              </button>
            </div>

            {/* Second Box: City Info & Map */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSH-hY03lKzhlwt78INPqQrftsrQ_dnR6U5YAZx3N8U4xGT7RrLgidyXPIdqtgTD4l56k_u1AmPvwD9m6OUoc67lhz8N1CPnVwk3FdRWA"
                alt="Lucknow City"
                className="w-full h-64 object-fit"
              />
              <div className="p-4 bg-gray-800 text-white">
                <h2 className="text-xl font-semibold">
                  Discover Sports in Lucknow
                </h2>
                <p className="mt-2 text-sm">
                  Find the best sports venues in Lucknow, from cricket turfs to
                  badminton courts. We offer you a wide range of choices to
                  match your enthusiasm and energy.
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[250vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div
              style={{ padding: "30px" }}
              className="grid auto-rows-min gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            >
              {data.map((item) => (
                <div
                  key={item.id}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden p-4 text-black shadow-lg transition-transform duration-300 ${
                    hoveredItem === item.id ? "scale-105" : "scale-100"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <img
                    src={item.image}
                    alt={`${item.name}'s image`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                    <p className="text-white text-lg font-bold">{item.name}</p>
                    <p className="text-white text-sm">City: {item.city}</p>
                    <p className="text-white text-sm">
                      Rating: {item.rating} ⭐
                    </p>
                    <p className="text-white text-xl">{item.sport}</p>
                    {hoveredItem === item.id && (
                      <Link href={"/component/Venue"}>
                        <button className="mt-2 bg-green-500 text-white w-full py-1 rounded-lg shadow-md">
                          Book Now
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
