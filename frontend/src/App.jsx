import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lockers from "./pages/Lockers";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import IDUpload from "./pages/IDUpload";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lockers" element={<Lockers />} />
        <Route
             path="/booking"
              element={
             <ProtectedRoute>
               <Booking />
            </ProtectedRoute>
      }
/>

<Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/upload-id"
  element={
    <ProtectedRoute>
      <IDUpload />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;