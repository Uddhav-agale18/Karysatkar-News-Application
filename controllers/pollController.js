const Poll = require('../model/pollModel');


exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Add a new poll
exports.createPoll = async (req, res) => {
  try {
    const newPoll = new Poll(req.body);
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

// Update a poll
exports.updatePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.status(200).json(poll);
  } catch (error) {
    res.status(400).json({ message: 'Bad request' });
  }
};

// Delete a poll
exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.status(200).json({ message: 'Poll deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Vote on a poll
exports.votePoll = async (req, res) => {
  const { optionIndex } = req.body; // Option index user selected
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    poll.options[optionIndex].votes += 1;

    await poll.save();
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
