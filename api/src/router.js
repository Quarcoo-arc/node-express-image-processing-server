const { Router } = require("express");
const { diskStorage } = require("multer");
const path = require("path");
const imageProcessor = require("./imageProcessor");
const multer = require("multer");
const { resolve } = require("path");

const filename = (req, file, callback) => {
  callback(null, file.originalname);
};

const storage = diskStorage({
  destination: "api/uploads/",
  filename,
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype !== "image/png") {
    req.fileValidationError = "Wrong File Type";
    callback(null, false, new Error("Wrong file type"));
  } else {
    callback(null, true);
  }
};

const upload = multer({ fileFilter, storage });

const photoPath = resolve(__dirname, "../../client/photo-viewer.html");

const router = Router();

router.post("/upload", upload.single("photo"), (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  } else if (!req.fileValidationError) {
    return res.status(201).json({ success: true });
  }
});

router.get("/photo-viewer", (req, res) => {
  res.sendFile(photoPath);
});

module.exports = router;
