// models/Navigation.js
const mongoose = require('mongoose');

const NavigationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  menuOrder: { type: Number, required: true },
  parentLink: { type: String, default: 'None' },
  showOnMenu: { type: String, enum: ['Yes', 'No'], default: 'Yes' },
});

module.exports = mongoose.model('Navigation', NavigationSchema);
