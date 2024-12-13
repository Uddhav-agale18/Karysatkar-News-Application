const express = require("express");
const multer = require("multer");
const { uploadFile, getFiles } = require("../controllers/pdfController");

// Multer storage configuration for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./files";  // Directory to store PDFs
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });
const router = express.Router();

// Define PDF upload and retrieval routes
router.post("/upload-files", upload.single("file"), uploadFile);  // For uploading PDFs
router.get("/get-files", getFiles);  // For getting all uploaded PDFs

module.exports = router;
