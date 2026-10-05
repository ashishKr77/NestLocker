import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const locker = location.state?.locker;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!locker) {
      alert("Please select a locker first.");
      navigate("/lockers");
      return;
    }

    if (!startTime || !endTime) {
      alert("Please select both start and end time.");
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      alert("End time must be after start time.");
      return;
    }

    const token = localStorage.getItem("token");

    setLoading(true);

    try {
      const response = await axios.post(
        "https://nestlocker.onrender.com/api/bookings",
        {
          lockerId: locker._id,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking successful:", response.data);

      alert("Booking successful!");

      navigate("/bookings");
    } catch (error) {
      console.log(
        "Booking failed:",
        error.response?.data?.message ||
          "Something went wrong"
      );

      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // If user directly opens /booking or refreshes the page
  if (!locker) {
    return (
      <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900">
            No Locker Selected
          </h1>

          <p className="text-gray-500 mt-3">
            Please select a locker before booking.
          </p>

          <button
            onClick={() => navigate("/lockers")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            View Lockers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Book Your Locker
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Select your booking time
        </p>

        {/* Locker Details */}
        <div className="mt-8 p-5 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900">
            Locker {locker.lockerNumber}
          </h2>

          <p className="text-gray-600 mt-2">
            Location: {locker.location}
          </p>

          <p className="text-gray-600">
            Size: {locker.size}
          </p>

          <p className="text-green-600 font-semibold mt-2">
            ₹{locker.price}
          </p>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleBooking}
          className="mt-6 space-y-5"
        >

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>

            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>

            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Book Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Booking..." : "Book Locker"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Booking;