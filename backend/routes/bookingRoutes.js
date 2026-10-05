const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Locker = require("../models/Locker");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { lockerId, startTime, endTime } = req.body;
    if (!lockerId) {
  return res.status(400).json({
    message: "Locker ID is required",
  });
}

    if (!startTime || !endTime) {
  return res.status(400).json({
    message: "Start time and end time are required",
  });
}

const start = new Date(startTime);
const end = new Date(endTime);

if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  return res.status(400).json({
    message: "Invalid date format",
  });
}

if (start >= end) {
  return res.status(400).json({
    message: "End time must be after start time",
  });
}
if (start < new Date()) {
  return res.status(400).json({
    message: "Start time cannot be in the past",
  });
}
  if (!mongoose.Types.ObjectId.isValid(lockerId)) {
  return res.status(400).json({
    message: "Invalid locker ID",
  });
}


    const locker = await Locker.findById(lockerId);

    if (!locker) {
      return res.status(404).json({
        message: "Locker not found",
      });
    }

    

    // Check for overlapping booking
const existingBooking = await Booking.findOne({
  locker: lockerId,
  status: "active",
  startTime: { $lt: end },
  endTime: { $gt: start },
});

if (existingBooking) {
  return res.status(400).json({
    message: "Locker is already booked for this time period",
  });
}

    const booking = await Booking.create({
      user: req.userId,
      locker: lockerId,
      startTime,
      endTime,
      amount: locker.price,
    });



    res.status(201).json({
      message: "Locker booked successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// CANCEL BOOKING
router.put("/cancel/:bookingId", authMiddleware, async (req, res) => {
  try {

     if (!mongoose.Types.ObjectId.isValid(req.params.bookingId)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Check whether this booking belongs to logged-in user
    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "You are not allowed to cancel this booking",
      });
    }

    // Check if already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking is already cancelled",
      });
    }

    // Change booking status
    booking.status = "cancelled";
    await booking.save();

    // Make locker available again
    
    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// GET MY BOOKINGS
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.userId,
    })
      .populate("locker")
      .populate("user", "name email");

    res.status(200).json({
      message: "My bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;