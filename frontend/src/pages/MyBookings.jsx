import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePayment = async (bookingId) => {
    const token = localStorage.getItem("token");

    try {
      // Create Razorpay order
      const response = await axios.post(
        "https://nestlocker.onrender.com/api/payments/create-order",
        {
          bookingId: bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Payment order created:", response.data);

      const order = response.data.order || response.data;

      // Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NestLocker",
        description: "Locker Booking",
        order_id: order.id,

        handler: async function (paymentResponse) {
          console.log("Payment successful:", paymentResponse);

          try {
            const verifyResponse = await axios.post(
              "https://nestlocker.onrender.com/api/payments/verify-payment",
              {
                bookingId: bookingId,
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,
                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,
                razorpay_signature:
                  paymentResponse.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log(
              "Payment verified:",
              verifyResponse.data
            );

            // Update payment status immediately
            setBookings((prevBookings) =>
              prevBookings.map((booking) =>
                booking._id === bookingId
                  ? { ...booking, paymentStatus: "paid" }
                  : booking
              )
            );

            alert("Payment successful!");
          } catch (error) {
            console.log(
              "Payment verification failed:",
              error.response?.data?.message ||
                "Something went wrong"
            );

            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );
          }
        },

        theme: {
          color: "#16a34a",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(
        "Payment order failed:",
        error.response?.data?.message ||
          "Something went wrong"
      );

      alert(
        error.response?.data?.message ||
          "Payment order failed"
      );
    }
  };

  const handleCancel = async (bookingId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://nestlocker.onrender.com/api/bookings/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking cancelled:", response.data);

      // Update status immediately
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      console.log(
        "Cancel failed:",
        error.response?.data?.message ||
          "Something went wrong"
      );

      alert(
        error.response?.data?.message ||
          "Cancel failed"
      );
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "https://nestlocker.onrender.com/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("My bookings:", response.data);

        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        console.log(
          "Failed to fetch bookings:",
          error.response?.data?.message ||
            "Something went wrong"
        );

        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-[80vh] bg-gray-50 px-6 py-10">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        My Bookings
      </h1>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 mt-8">
          Loading bookings...
        </p>
      )}

      {/* Empty State */}
      {!loading && bookings.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-xl font-semibold text-gray-700">
            No bookings found
          </p>

          <p className="text-gray-500 mt-2">
            Book a locker to see your bookings here.
          </p>
        </div>
      )}

      {/* Booking Cards */}
      {!loading && bookings.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6">

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow-md"
            >

              <h2 className="text-xl font-bold text-gray-900">
                Locker {booking.locker?.lockerNumber}
              </h2>

              <p className="mt-2 text-gray-600">
                Location: {booking.locker?.location}
              </p>

              <p className="text-gray-600">
                Start:{" "}
                {new Date(booking.startTime).toLocaleString()}
              </p>

              <p className="text-gray-600">
                End:{" "}
                {new Date(booking.endTime).toLocaleString()}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                Amount: ₹{booking.amount}
              </p>

              <p className="mt-2 text-gray-600">
                Status: {booking.status}
              </p>

              <p className="mt-2 text-gray-600">
                Payment:{" "}
                {booking.paymentStatus === "paid"
                  ? "Paid"
                  : "Pending"}
              </p>

              {/* Pay Now */}
              {booking.status === "active" &&
                booking.paymentStatus !== "paid" && (
                  <button
                    onClick={() =>
                      handlePayment(booking._id)
                    }
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Pay Now
                  </button>
                )}

              {/* Cancel Booking */}
              {booking.status === "active" && (
                <button
                  onClick={() =>
                    handleCancel(booking._id)
                  }
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyBookings;