const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true }, // Add content field for rich-text data
  visibility: { type: String, enum: ['public', 'private', 'unlisted'], default: 'public' },
  showOnlyToRegistered: { type: Boolean, default: false },
  category: { type: String, required: true }, // Category is required here
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  date: { type: Date, default: Date.now }, // Use Date type in schema
  updatedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 } // Add viewersCount field
});

// Middleware to set updatedAt before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now(); // Set updatedAt to the current date
  next();
});

module.exports = mongoose.model('Post', postSchema);
