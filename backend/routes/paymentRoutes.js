const express = require("express");
const Razorpay = require("../config/razorpay");
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const crypto = require("crypto");

const router = express.Router();

router.post("/create-order", authMiddleware, async (req, res) => {
  try {
   const { bookingId } = req.body;

const booking = await Booking.findById(bookingId);

if (!booking) {
  return res.status(404).json({
    message: "Booking not found",
  });
}

if (booking.user.toString() !== req.userId) {
  return res.status(403).json({
    message: "You are not allowed to pay for this booking",
  });
}
if (booking.status === "cancelled") {
  return res.status(400).json({
    message: "Cannot pay for a cancelled booking",
  });
}

if (booking.paymentStatus === "paid") {
  return res.status(400).json({
    message: "Booking is already paid",
  });
}

const options = {
  amount: booking.amount * 100,
  currency: "INR",
  receipt: `nestlocker_${Date.now()}`,
};

    const order = await Razorpay.orders.create(options);
    booking.razorpayOrderId = order.id;
       await booking.save();

    res.status(200).json({
      message: "Order created successfully",
      order,
        bookingId: booking._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment order creation failed",
      error: error.message,
    });
  }
});
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.user.toString() !== req.userId) {
      return res.status(403).json({
        message: "You are not allowed to verify this payment",
      });
    }
    if (booking.razorpayOrderId !== razorpay_order_id) {
  return res.status(400).json({
    message: "Razorpay order does not match this booking",
  });
}

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Invalid payment signature",
      });
    }

    booking.paymentStatus = "paid";
    await booking.save();

    res.status(200).json({
      message: "Payment verified successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
});

module.exports = router;