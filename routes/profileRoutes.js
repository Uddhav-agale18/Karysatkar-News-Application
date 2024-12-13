const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfile } = require('../controllers/profileController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Profile routes
router.post('/', upload.single('logo'), createOrUpdateProfile);
router.get('/', getProfile);

module.exports = router;
