const express = require("express");
const Locker = require("../models/Locker");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { lockerNumber, location, size, price } = req.body;

    const locker = await Locker.create({
      lockerNumber,
      location,
      size,
      price,
    });

    res.status(201).json({
      message: "Locker created successfully",
      locker,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const lockers = await Locker.find();

    res.status(200).json({
      message: "Lockers fetched successfully",
      lockers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
router.get("/available", async (req, res) => {
  try {
    const lockers = await Locker.find({
      status: "available",
    });

    res.status(200).json({
      message: "Available lockers fetched successfully",
      lockers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;