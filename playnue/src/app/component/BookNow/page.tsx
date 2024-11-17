"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, Plus, Minus, X } from "lucide-react";
import ReactDOM from "react-dom";
import emailjs from "@emailjs/browser";

// First, include the TimeDurationPicker component here
interface TimeSelection {
  hour: number;
  minute: number;
  period: "AM" | "PM";
}

interface BookingState {
  sport: string;
  date: string;
  timeSelection: TimeSelection;
  duration: number;
  tickets: number;
}

// Include the TimeDurationPicker component implementation here...
// [Previous TimeDurationPicker code goes here]

interface TimeSelection {
  hour: number;
  minute: number;
  period: "AM" | "PM";
}

interface TimeDurationPickerProps {
  initialTime: TimeSelection;
  initialDuration: number;
  onSelect: (time: TimeSelection, duration: number) => void;
}

// Create a Portal component for the dialog
const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current = document.createElement("div");
    document.body.appendChild(ref.current);
    setMounted(true);

    return () => {
      if (ref.current) {
        document.body.removeChild(ref.current);
      }
    };
  }, []);

  if (!mounted || !ref.current) return null;
  return ReactDOM.createPortal(children, ref.current);
};

const TimeDurationPicker: React.FC<TimeDurationPickerProps> = ({
  initialTime,
  initialDuration,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<TimeSelection>(initialTime);
  const [duration, setDuration] = useState(initialDuration);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Generate time slots in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute of [0, 30]) {
        slots.push({ hour, minute });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Format time for display
  const formatTime = (time: TimeSelection): string => {
    const hour = time.hour.toString().padStart(2, "0");
    const minute = time.minute.toString().padStart(2, "0");
    return `${hour}:${minute} ${time.period}`;
  };

  // Format duration for display
  const formatDuration = (hours: number): string => {
    const wholeHours = Math.floor(hours);
    const minutes = (hours % 1) * 60;
    if (minutes === 0) {
      return `${wholeHours} hr${wholeHours !== 1 ? "s" : ""}`;
    }
    return `${wholeHours} hr${wholeHours !== 1 ? "s" : ""} ${minutes} min`;
  };

  // Handle duration changes
  const adjustDuration = (increment: boolean) => {
    const newDuration = increment ? duration + 0.5 : duration - 0.5;
    const clampedDuration = Math.max(0.5, Math.min(12, newDuration));
    setDuration(clampedDuration);
    onSelect(selectedTime, clampedDuration);
  };

  // Handle time selection
  const handleTimeSelect = (hour: number, minute: number) => {
    const newTime = { ...selectedTime, hour, minute };
    setSelectedTime(newTime);
    onSelect(newTime, duration);
  };

  // Handle period selection
  const handlePeriodSelect = (period: "AM" | "PM") => {
    const newTime = { ...selectedTime, period };
    setSelectedTime(newTime);
    onSelect(newTime, duration);
  };

  // Handle confirmation
  const handleConfirm = () => {
    onSelect(selectedTime, duration);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between border rounded-md px-4 py-2 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <span>{`${formatTime(selectedTime)} (${formatDuration(
          duration
        )})`}</span>
        <Clock className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <Portal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              ref={dialogRef}
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">
                  Select Time & Duration
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Select Start Time</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSelect(slot.hour, slot.minute)}
                        className={`p-2 rounded-md text-sm ${
                          selectedTime.hour === slot.hour &&
                          selectedTime.minute === slot.minute
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {`${slot.hour}:${slot.minute
                          .toString()
                          .padStart(2, "0")}`}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    {(["AM", "PM"] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => handlePeriodSelect(period)}
                        className={`flex-1 py-2 rounded-md ${
                          selectedTime.period === period
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Duration</h3>
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                    <button
                      onClick={() => adjustDuration(false)}
                      className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
                      disabled={duration <= 0.5}
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>

                    <span className="text-lg font-medium">
                      {formatDuration(duration)}
                    </span>

                    <button
                      onClick={() => adjustDuration(true)}
                      className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
                      disabled={duration >= 12}
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleConfirm}
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

const BookingPage = () => {
  const [booking, setBooking] = useState<BookingState>({
    sport: "Swimming",
    date: "2024-11-17",
    timeSelection: {
      hour: 6,
      minute: 0,
      period: "AM",
    },
    duration: 1,
    tickets: 0,
  });

  const TICKET_PRICE = 369.0;

  // Format time for display
  const formatTime = (time: TimeSelection): string => {
    const hour = time.hour.toString().padStart(2, "0");
    const minute = time.minute.toString().padStart(2, "0");
    return `${hour}:${minute} ${time.period}`;
  };

  const handleTimeAndDurationChange = (
    newTime: TimeSelection,
    newDuration: number
  ) => {
    setBooking((prev) => ({
      ...prev,
      timeSelection: newTime,
      duration: newDuration,
    }));
  };

  const handleBooking = () => {
    try {
      const templateParams = {
        to_name: "Seller",
        user_name: "Customer",
        sport: booking.sport,
        date: booking.date,
        time: formatTime(booking.timeSelection),
        duration: `${booking.duration} hours`,
        tickets: booking.tickets.toString(),
        total_price: (booking.tickets * TICKET_PRICE).toFixed(2),
      };
      console.log(templateParams)

      emailjs
        .send(
          "service_z16dtz9", // Replace "YOUR_SERVICE_ID" with "service_z16dtz9"
          "template_4j6rkxp", // Replace "YOUR_TEMPLATE_ID" with "template_4j6rkxp"
          templateParams,
          "5SDFJB3Dvejs6P0n8" // Replace "YOUR_PUBLIC_KEY" with "5SDFJB3Dvejs6P0n8"
        )
        .then(
          () => {
            alert("Booking details sent successfully!");
          },
          (error) => {
            console.error("Failed to send email:", error);
            alert("Failed to send booking details.");
          }
        );
    } catch (error) {
      console.log("Error in handleBooking:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Game Theory - Joseph's Indian Vittal Mallya Road
        </h1>
        <h2 className="text-gray-600">St Joseph's</h2>

        <div className="bg-green-500 text-white py-3 px-4 rounded-md mt-4 text-center">
          Random text to show
        </div>
      </div>

      <div className="space-y-6">
        {/* Sports Selection */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Sports</label>
          <div className="flex items-center space-x-2 border rounded-md px-4 py-2 w-64">
            <span>Swimming</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Date Selection */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Date</label>
          <div className="flex items-center space-x-2 border rounded-md px-4 py-2 w-64">
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="outline-none"
            />
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Time Selection - Now using TimeDurationPicker */}
        <div className="flex items-center justify-between">
          <label className="text-gray-700 font-medium">Time & Duration</label>
          <div className="w-64">
            <TimeDurationPicker
              initialTime={booking.timeSelection}
              initialDuration={booking.duration}
              onSelect={(time, duration) =>
                handleTimeAndDurationChange(time, duration)
              }
            />
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-medium">Temperature Controlled Pool 1</h3>
              <p className="text-gray-600">
                INR {TICKET_PRICE.toFixed(2)} / Ticket
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full bg-gray-100"
                onClick={() =>
                  setBooking((prev) => ({
                    ...prev,
                    tickets: Math.max(0, prev.tickets - 1),
                  }))
                }
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
              <span>{booking.tickets}</span>
              <button
                className="p-2 rounded-full bg-green-500 text-white"
                onClick={() =>
                  setBooking((prev) => ({
                    ...prev,
                    tickets: prev.tickets + 1,
                  }))
                }
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="text-green-500 font-medium">
            INR {(booking.tickets * TICKET_PRICE).toFixed(2)}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full py-3 bg-gray-100 text-gray-500 rounded-md hover:bg-green-500 transition-colors"
          disabled={booking.tickets === 0}
          onClick={handleBooking}
        >
          Book
        </button>
      </div>

      {/* Shopping Cart */}
      <div className="mt-8 text-center text-gray-500">
        <div className="text-6xl mb-4">🛒</div>
        <p>Cart Is Empty</p>
      </div>
    </div>
  );
};

export default BookingPage;

export const ContactUs = () => {
  // Specify the type of the ref as HTMLFormElement
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current === null) return; // Check to ensure form.current is not null

    emailjs
      .sendForm(
        "service_z16dtz9", // Service ID
        "template_4j6rkxp", // Template ID
        form.current,
        "5SDFJB3Dvejs6P0n8" // Public Key
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" required />
      <label>Email</label>
      <input type="email" name="user_email" required />
      <label>Message</label>
      <textarea name="message" required />
      <input type="submit" value="Send" />
    </form>
  );
};
