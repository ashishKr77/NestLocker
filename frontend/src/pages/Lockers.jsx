import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Lockers() {
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLockers = async () => {
      try {
        const response = await axios.get(
          "https://nestlocker.onrender.com/api/lockers"
        );

        console.log("Lockers:", response.data);

        setLockers(
          response.data.lockers.filter(
            (locker) => locker.status === "available"
          )
        );

        setLoading(false);
      } catch (error) {
        console.log(
          "Failed to fetch lockers:",
          error.response?.data?.message || "Something went wrong"
        );

        setLoading(false);
      }
    };

    fetchLockers();
  }, []);

  return (
    <div className="min-h-[80vh] bg-gray-50 px-6 py-10">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Available Lockers
      </h1>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 mt-8">
          Loading lockers...
        </p>
      )}

      {/* Empty State */}
      {!loading && lockers.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-xl font-semibold text-gray-700">
            No lockers available
          </p>

          <p className="text-gray-500 mt-2">
            Please check again later.
          </p>
        </div>
      )}

      {/* Locker Cards */}
      {!loading && lockers.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6">

          {lockers.map((locker) => (
            <div
              key={locker._id}
              className="bg-white p-6 rounded-xl shadow-md"
            >

              <h2 className="text-xl font-bold text-gray-900">
                Locker {locker.lockerNumber}
              </h2>

              <p className="mt-2 text-gray-600">
                Location: {locker.location}
              </p>

              <p className="text-gray-600">
                Size: {locker.size}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                ₹{locker.price}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Status: {locker.status}
              </p>

              <button
                onClick={() =>
                  navigate("/booking", {
                    state: { locker: locker },
                  })
                }
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
              >
                Book Now
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Lockers;