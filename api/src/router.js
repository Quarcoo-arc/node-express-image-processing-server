const { Router } = require("express");
const { diskStorage } = require("multer");
const multer = require("multer");

const storage = diskStorage({
  destination: "api/uploads",
  filename: "filename",
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype !== "image/png") {
    req.fileValidationError = "Wrong File Type";
    callback(null, false, new Error("Wrong file type"));
  } else {
    callback(null, true);
  }
};

const upload = multer({ fileFilter: fileFilter(), storage: storage });

const router = Router();

router.post("/upload", upload.single("photo"), (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: request.fileValidationError });
  } else if (!req.fileValidationError) {
    return res.status(201).json({ success: true });
  }
});

const filename = (req, file, callback) => {
  callback(null, file.originalname);
};

module.exports = router;
