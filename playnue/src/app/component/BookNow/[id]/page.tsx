"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
// Expanded court data with more details
const COURTS = [
  { 
    id: 1, 
    name: 'Main Court', 
    availability: 'Available', 
    description: 'Professional-grade football pitch',
    price: 1200 
  },
  { 
    id: 2, 
    name: 'Training Court A', 
    availability: 'Available', 
    description: 'Practice-oriented smaller pitch',
    price: 800 
  },
  { 
    id: 3, 
    name: 'Training Court B', 
    availability: 'Partially Booked', 
    description: 'Indoor training facility',
    price: 900 
  },
  { 
    id: 4, 
    name: 'VIP Court', 
    availability: 'Available', 
    description: 'Premium court with advanced facilities',
    price: 1500 
  }
];

interface Court {
  id: number;
  name: string;
  availability: string;
  description: string;
  price: number;
}

interface VenueDetails {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  price: number;
  courts: Court[];
}
// Generate time slots from 10 AM to 6 PM
const TIME_SLOTS = (() => {
  const slots = [];
  for (let hour = 10; hour <= 18; hour++) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    slots.push(`${displayHour}:00 ${period}`);
  }
  return slots;
})();

const ImpetusStadium = () => {
  const { id } = useParams();
  const [date, setDate] = useState('2024-11-21');
  const [startTime, setStartTime] = useState('10:00 AM');
  const [duration, setDuration] = useState(60);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<{id: number, name: string, price: number} | null>(null);
  const [isCourtPickerOpen, setIsCourtPickerOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [venue, setVenue] = useState<VenueDetails | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    setIsTimePickerOpen(false);
  };

  const handleDurationIncrease = () => {
    setDuration(duration + 30);
  };

  const handleDurationDecrease = () => {
    if (duration > 30) {
      setDuration(duration - 30);
    }
  };

  const handleCourtSelect = (court: {id: number, name: string, price: number}) => {
    setSelectedCourt(court);
    setIsCourtPickerOpen(false);
  };

  const handleAddToCart = () => {
    if (!selectedCourt) return;

    const bookingItem = {
      date,
      startTime,
      duration: `${duration} min`,
      court: selectedCourt.name,
      price: selectedCourt.price
    };
    setCart([...cart, bookingItem]);
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout:', cart);
    // Add actual checkout logic here
  };

  useEffect(() => {
    if (id) {
      // Replace this with your API call to fetch venue details
      const fetchVenue = async () => {
        const venueData: VenueDetails[] = [
          {
            id: 1,
            name: "John Doe Turf",
            city: "Lucknow",
            address: "70 Bright St, Lucknow",
            phone: "+91 9876543210",
            email: "johndoe@example.com",
            price: 150,
            courts: [
              { id: 1, name: "Main Court", availability: "Available", description: "Professional-grade football pitch", price: 1200 },
              { id: 2, name: "Training Court A", availability: "Available", description: "Practice-oriented smaller pitch", price: 800 },
            ],
          },
          {
            id: 2,
            name: "Jane Smith Turf",
            city: "Lucknow",
            address: "80 Bright St, Lucknow",
            phone: "+91 9876543211",
            email: "janesmith@example.com",
            price: 200,
            courts: [
              { id: 3, name: "Training Court B", availability: "Partially Booked", description: "Indoor training facility", price: 900 },
              { id: 4, name: "VIP Court", availability: "Available", description: "Premium court with advanced facilities", price: 1500 },
            ],
          },
        ];

        const selectedVenue = venueData.find((v) => v.id === (Array.isArray(id) ? parseInt(id[0]) : parseInt(id || "1")));
        setVenue(selectedVenue || null);
      };

      fetchVenue();
    }
  }, [id]);

  if (!venue) {
    return <div>Loading...</div>;
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Booking Section */}
        <div className="w-2/3 p-6">
          <h1 className="text-2xl font-bold mb-4">{venue.name}</h1>
          <p className="text-gray-500 mb-4">{venue.address}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-2">Sports</p>
              <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                <p>Football</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-2">Date</p>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full bg-gray-100 rounded-lg p-2 focus:outline-none"
              />
            </div>
            
            <div>
              <p className="font-medium mb-2">Start Time</p>
              <div
                className="flex items-center justify-between bg-gray-100 rounded-lg p-2 cursor-pointer"
                onClick={() => setIsTimePickerOpen(true)}
              >
                <p>{startTime}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-2">Duration</p>
              <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                <button
                  className="text-green-500 hover:text-green-600 focus:outline-none"
                  onClick={handleDurationDecrease}
                >
                  -
                </button>
                <input
                  type="text"
                  value={`${duration} min`}
                  readOnly
                  className="bg-transparent focus:outline-none mx-2 w-20 text-center"
                />
                <button
                  className="text-green-500 hover:text-green-600 focus:outline-none"
                  onClick={handleDurationIncrease}
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-2">Court</p>
              <div
                className="flex items-center justify-between bg-gray-100 rounded-lg p-2 cursor-pointer"
                onClick={() => setIsCourtPickerOpen(true)}
              >
                <p>{selectedCourt ? selectedCourt.name : '--Select Court--'}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg mt-4 w-full"
            onClick={handleAddToCart}
            disabled={!selectedCourt}
          >
            Add To Cart
          </button>
        </div>
        
        {/* Checkout Section */}
        <div className="w-1/3 bg-gray-50 p-6 border-l">
          <h2 className="text-lg font-medium mb-4">Booking Cart</h2>
          
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg p-3 mb-2 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.court}</p>
                    <p className="text-sm text-gray-500">{item.date} | {item.startTime}</p>
                    <p className="text-sm text-gray-500">{item.duration}</p>
                  </div>
                  <div>
                    <p className="font-semibold">₹{item.price}</p>
                    <button
                      className="text-red-500 text-sm hover:text-red-600 focus:outline-none"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span>Total Items</span>
                  <span>{cart.length}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
              
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg mt-4 w-full"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Time Picker Modal */}
      {isTimePickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Select Start Time</h3>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  className="bg-gray-100 hover:bg-green-100 rounded-lg py-2"
                  onClick={() => handleStartTimeChange(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 rounded-lg py-2"
              onClick={() => setIsTimePickerOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Court Picker Modal */}
      {isCourtPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Select Court</h3>
            {COURTS.map((court) => (
              <div 
                key={court.id}
                className="bg-gray-100 rounded-lg p-4 mb-2 cursor-pointer hover:bg-green-100"
                onClick={() => handleCourtSelect(court)}
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{court.name}</h4>
                    <p className="text-sm text-gray-500">{court.description}</p>
                  </div>
                  <div>
                    <span className="font-semibold">₹{court.price}</span>
                    <p className="text-sm text-green-600">{court.availability}</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 rounded-lg py-2"
              onClick={() => setIsCourtPickerOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImpetusStadium;