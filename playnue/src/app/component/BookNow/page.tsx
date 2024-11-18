"use client";
import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BookingPage = () => {
  const [duration, setDuration] = useState(1);
  const [selectedTime, setSelectedTime] = useState("12:00 AM");
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  // Generate time slots from 12:00 AM to 11:30 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      slots.push({
        full: `${hour12}:00 ${ampm}`,
        half: `${hour12}:30 ${ampm}`
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
  // Close time picker when clicking outside
  
  const timePickerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // Type guard to ensure timePickerRef.current exists
    if (!timePickerRef.current) return;

    const target = event.target as Node;
    if (!timePickerRef.current.contains(target)) {
      setIsTimePickerOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  const handleTimeSelect = (time: React.SetStateAction<string>) => {
    setSelectedTime(time);
    setIsTimePickerOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Impetus - Bangalore Football Stadium
              </h1>
              <p className="text-gray-600">Ashok Nagar</p>
            </div>

            <div className="bg-green-500 text-white p-4 mb-6 rounded-md text-center">
              Earn 3 karma points on every booking!
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Sports</label>
                <Select defaultValue="football">
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span>⚽</span> Football
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="football">
                      <div className="flex items-center gap-2">
                        <span>⚽</span> Football
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value="2024-11-19"
                    readOnly
                    className="w-full p-2 border rounded-md pr-10"
                  />
                  <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="relative" ref={timePickerRef}>
                <label className="block text-gray-700 mb-2">Start Time</label>
                <div 
                  className="relative cursor-pointer"
                  onClick={() => setIsTimePickerOpen(!isTimePickerOpen)}
                >
                  <input
                    type="text"
                    value={selectedTime}
                    readOnly
                    className="w-full p-2 border rounded-md pr-10 cursor-pointer"
                  />
                  <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                
                {isTimePickerOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-2">
                      {timeSlots.map((slot, index) => (
                        <React.Fragment key={index}>
                          <button
                            className={`p-2 text-sm rounded-md transition-colors ${
                              selectedTime === slot.full
                                ? 'bg-green-500 text-white'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => handleTimeSelect(slot.full)}
                          >
                            {slot.full}
                          </button>
                          <button
                            className={`p-2 text-sm rounded-md transition-colors ${
                              selectedTime === slot.half
                                ? 'bg-green-500 text-white'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => handleTimeSelect(slot.half)}
                          >
                            {slot.half}
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Duration</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setDuration(Math.max(1, duration - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
                  >
                    <Minus className="h-5 w-5 text-gray-400" />
                  </button>
                  <span className="text-lg">{duration} Hr</span>
                  <button
                    onClick={() => setDuration(duration + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500"
                  >
                    <Plus className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Court</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="--Select Court--" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled" disabled>
                      No Courts Available For The Selected Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <button
                className="w-full py-3 bg-gray-100 text-gray-500 rounded-md"
                disabled
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Cart Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="flex justify-center mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-16 w-16 text-gray-300"
                      fill="currentColor"
                    >
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </div>
                  Cart Is Empty
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;