// routes/pollRoutes.js
const express = require('express');
const {
  getPolls,
  createPoll,
  updatePoll,
  deletePoll,
  votePoll,
} = require('../controllers/pollController');

const router = express.Router();

router.get('/', getPolls);
router.post('/', createPoll);
router.put('/:id', updatePoll);
router.delete('/:id', deletePoll);
router.post('/:id/vote', votePoll); // Add vote endpoint

module.exports = router;
