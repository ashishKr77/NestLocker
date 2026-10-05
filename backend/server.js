require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./cron/bookingCron");

const connectDB = require("./config/db");

const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const lockerRoutes = require("./routes/lockerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

connectDB();
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/lockers", lockerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
    res.send("NestLocker API Running");
});

app.post("/test", (req, res) => {
    console.log(req.body);

    res.json({
        message: "Data received successfully",
        data: req.body
    });
});

app.listen(process.env.PORT, () => {
    console.log(`NestLocker server started on port ${process.env.PORT}`);
});