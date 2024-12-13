const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../model/CommentsModel'); // Assuming your Comment model is in models/Comment.js
const router = express.Router();

// POST route to add a new comment
router.post('/:postId', async (req, res) => {
  const { postId } = req.params; // Extract postId from the route parameters
  const { text } = req.body; // Extract comment text from the request body

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Comment text is required' });
  }

  try {
    // Create a new comment
    const newComment = new Comment({
      text,
      postId,
    });

    // Save the new comment to the database
    await newComment.save();

    // Respond with the newly created comment
    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error posting comment:', err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

// GET route to fetch comments for a specific post
router.get('/:postId', async (req, res) => {
    const { postId } = req.params; // Extract postId from the route parameters
    console.log('Fetching comments for postId:', postId); // Add this log to check postId
  
    try {
      // Fetch all comments associated with the postId
      const comments = await Comment.find({ postId }).exec();
  
      if (!comments || comments.length === 0) {
        return res.status(404).json({ error: 'No comments found for this post' });
      }
  
      // Respond with the list of comments
      res.status(200).json(comments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  });
  

module.exports = router;
