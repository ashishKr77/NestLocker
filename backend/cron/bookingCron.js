const cron = require("node-cron");
const Booking = require("../models/Booking");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const result = await Booking.updateMany(
      {
        status: "active",
        endTime: { $lt: now },
      },
      {
        $set: {
          status: "completed",
        },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(
        `${result.modifiedCount} booking(s) marked as completed`
      );
    }
  } catch (error) {
    console.error("Booking cron error:", error.message);
  }
});