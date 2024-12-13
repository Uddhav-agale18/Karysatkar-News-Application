import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CreatePoll = ({ poll, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    language: 'Marathi',
    question: '',
    options: [{ text: '', votes: 0 }], // Include votes count for each option
    votePermission: 'All users can vote',
    status: 'Active',
  });

  useEffect(() => {
    if (poll) {
      setFormData({
        language: poll.language,
        question: poll.question,
        options: poll.options.map(option => ({
          text: option.text,
          votes: option.votes || 0, // Initialize votes if exists
        })),
        votePermission: poll.votePermission,
        status: poll.status,
      });
    }
  }, [poll]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].text = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleVoteChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index].votes = Number(value); // Store votes as a number
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleAddOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { text: '', votes: 0 }],
    }));
  };

  const handleRemoveOption = (index) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (poll) {
        // Update existing poll
        await axios.put(`http://localhost:5000/api/polls/${poll._id}`, formData);
      } else {
        // Create new poll
        await axios.post('http://localhost:5000/api/polls', formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Error saving poll:", error);
    }
  };

  const calculatePercentages = (optionVotes) => {
    const totalVotes = optionVotes.reduce((total, option) => total + option.votes, 0);
    return totalVotes > 0
      ? optionVotes.map(option => ({
          ...option,
          percentage: ((option.votes / totalVotes) * 100).toFixed(2), // Calculate percentage
        }))
      : optionVotes.map(option => ({ ...option, percentage: 0 })); // If no votes, set to 0
  };

  const optionsWithPercentages = calculatePercentages(formData.options);

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md relative mb-4 max-w-md mx-auto">
      <div>
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded mb-4 flex items-center"
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          
        </button>
        <label className="block font-semibold mb-2">Select Language</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        >
          <option value="Marathi">Marathi</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
      </div>
      <div className="mt-4">
        <label>Question</label>
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mt-4">
        <label>Options</label>
        {formData.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              className="border p-2 w-full mr-2"
              placeholder="Option text"
            />
            <input
              type="number"
              value={option.votes}
              onChange={(e) => handleVoteChange(index, e.target.value)}
              min="0"
              className="border p-2 w-20 mr-2"
              placeholder="Votes"
            />
            <span className="ml-2 mr-2">{optionsWithPercentages[index]?.percentage}%</span>
            <button
              type="button"
              onClick={() => handleRemoveOption(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        >
          Add Option
        </button>
      </div>
      <div className="mt-4">
        <label className="block font-semibold mb-2">Vote Permission</label>
        <div className="flex flex-col">
          <label className="mr-4">
            <input
              type="radio"
              name="votePermission"
              value="All users can vote"
              checked={formData.votePermission === 'All users can vote'}
              onChange={handleChange}
              className="mr-2"
            />
            All users can vote
          </label>
          <label>
            <input
              type="radio"
              name="votePermission"
              value="Only registered users can vote"
              checked={formData.votePermission === 'Only registered users can vote'}
              onChange={handleChange}
              className="mr-2"
            />
            Only registered users can vote
          </label>
        </div>
      </div>
      <div className="mt-4">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="mt-4 flex justify-between">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {poll ? 'Update Poll' : 'Create Poll'}
        </button>
      </div>
    </form>
  );
};

export default CreatePoll;
