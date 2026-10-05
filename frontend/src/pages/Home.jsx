import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50">

      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <div className="max-w-4xl text-center">

          <p className="text-green-600 font-semibold text-base sm:text-lg mb-3">
            Smart & Secure Storage
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Store Your Belongings
            <span className="text-green-600"> Safely & Easily</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Find and reserve a secure locker whenever you need it.
            Simple booking, secure storage and hassle-free access.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <button
              onClick={() => navigate("/lockers")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Find a Locker
            </button>

            <a
              href="#features"
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Learn More
            </a>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-6 bg-white"
      >
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
            Why NestLocker?
          </h2>

          <p className="text-center text-gray-500 mt-3 max-w-2xl mx-auto">
            Everything you need for simple and convenient locker reservation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

            {/* Secure */}
            <div className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">
                🔒 Secure
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Your belongings stay protected in secure lockers.
              </p>
            </div>

            {/* Easy Booking */}
            <div className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">
                ⚡ Easy Booking
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Choose a locker and reserve it in just a few clicks.
              </p>
            </div>

            {/* Easy Payment */}
            <div className="p-6 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900">
                💳 Easy Payment
              </h3>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Make secure payments through Razorpay.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;