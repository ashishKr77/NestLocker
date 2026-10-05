const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema(
  {
    lockerNumber: {
      type: String,
      required: true,
      unique: true,
    },

    location: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const Locker = mongoose.model("Locker", lockerSchema);

module.exports = Locker;