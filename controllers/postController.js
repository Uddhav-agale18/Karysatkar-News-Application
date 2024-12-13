const Post = require('../model/postModel');
const path = require('path');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, slug, description, content, visibility, showOnlyToRegistered, category } = req.body;

    // Validate required fields
    if (!title || !slug || !description || !content || !visibility || !category) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const image = req.file ? req.file.filename : null;

    const newPost = new Post({
      title,
      slug,
      description,
      content,
      visibility,
      showOnlyToRegistered,
      category,
      image,
      date: new Date(), // Set the current date
    });

    const savedPost = await newPost.save();
    res.status(201).json({ success: true, post: savedPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all posts or filter by category
exports.getAllPosts = async (req, res) => {
  const { category } = req.query;

  try {
    let posts;
    if (category) {
      posts = await Post.find({ category });
    } else {
      posts = await Post.find();
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.incrementViewers = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    post.views = (post.views || 0) + 1; // Increment the 'views' count
    await post.save(); // Save the updated post

    res.status(200).json({ success: true, views: post.views });
  } catch (error) {
    console.error('Error incrementing viewers:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { title, slug, description, content, visibility, showOnlyToRegistered, category, views } = req.body;

    // Validate required fields
    if (!title || !slug || !description || !content || !visibility || !category) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const image = req.file ? req.file.filename : undefined;

    // Build the updated data object
    const updatedData = {
      title,
      slug,
      description,
      content,
      visibility,
      showOnlyToRegistered,
      category,
      ...(image && { image }), // Include the image if it's provided
      views: views !== undefined ? views : 0,
    };

    // Conditionally update the `updatedAt` field if certain fields are modified
    if (title || description || content || image) {
      updatedData.updatedAt = Date.now();
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
