const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  incrementViewers,
} = require('../controllers/postController');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the filename to current timestamp + original extension
  },
});

const upload = multer({ storage });

// Define routes
router.post('/', upload.single('image'), createPost);
router.get('/', getAllPosts); // Filter by category using a query parameter
router.get('/:id', getPostById);
router.post('/:id/increment-viewers', incrementViewers);
router.put('/:id', upload.single('image'), updatePost);
router.delete('/:id', deletePost);

module.exports = router;