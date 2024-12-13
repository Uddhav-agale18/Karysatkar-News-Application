// routes/navigationRoutes.js
const express = require('express');
const router = express.Router();
const Navigation = require('../model/Navigation');

// Get all navigation links
router.get('/', async (req, res) => {
  try {
    const navigationLinks = await Navigation.find().sort({ menuOrder: 1 });
    res.json(navigationLinks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching navigation links' });
  }
});

// Add a new navigation link
router.post('/', async (req, res) => {
  try {
    const newLink = new Navigation(req.body);
    await newLink.save();
    res.json(newLink);
  } catch (error) {
    res.status(500).json({ error: 'Error adding new link' });
  }
});

router.put('/reorder', async (req, res) => {
  try {
    for (const [index, link] of req.body.entries()) {
      await Navigation.updateOne({ _id: link._id }, { menuOrder: index + 1 });
    }
    res.json({ message: 'Order updated' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
});

// Delete a navigation link
router.delete('/:id', async (req, res) => {
  try {
    await Navigation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Link deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting link' });
  }
});

// Update menu limit
router.put('/menu-limit', async (req, res) => {
  // Save the menu limit in your preferred way (could be in a separate collection or environment variable)
  res.json({ message: 'Menu limit updated' });
});

module.exports = router;
