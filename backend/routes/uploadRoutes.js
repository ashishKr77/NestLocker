const express = require("express");
const upload = require("../config/multer");
const multer = require("multer");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

router.post(
  "/id",
  authMiddleware,
  upload.single("id"),
 async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "ID file is required",
        });
      }

    const user = await User.findById(req.userId);

if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}
const oldIdProof = user.idProof;

user.idProof = req.file.filename;
await user.save();


if (oldIdProof) {
  const oldFilePath = `uploads/${oldIdProof}`;

  if (fs.existsSync(oldFilePath)) {
    fs.unlinkSync(oldFilePath);
  }
}


res.status(200).json({
  message: "ID uploaded successfully",
  file: req.file.filename,
});
    } catch (error) {
      res.status(500).json({
        message: "File upload failed",
        error: error.message,
      });
    }
  }
);
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message: "File upload error",
      error: error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next();
});

module.exports = router;