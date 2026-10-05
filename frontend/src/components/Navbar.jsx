import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    window.addEventListener("login", handleLogin);

    return () => {
      window.removeEventListener("login", handleLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
        >
          NestLocker
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-green-600"
          >
            Home
          </Link>

          <Link
            to="/lockers"
            className="text-gray-700 hover:text-green-600"
          >
            Lockers
          </Link>

          <Link
            to="/bookings"
            className="text-gray-700 hover:text-green-600"
          >
            My Bookings
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 border-t pt-4">

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-green-600"
          >
            Home
          </Link>

          <Link
            to="/lockers"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-green-600"
          >
            Lockers
          </Link>

          <Link
            to="/bookings"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 hover:text-green-600"
          >
            My Bookings
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50"
              >
                Register
              </Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;