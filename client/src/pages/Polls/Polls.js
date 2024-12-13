import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePoll from './CreatePoll'; // Adjust the import path as necessary

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/polls');
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const handleEditPoll = (poll) => {
    setSelectedPoll(poll);
    setShowForm(true);
  };

  const handleDeletePoll = async (pollId) => {
    try {
      await axios.delete(`http://localhost:5000/api/polls/${pollId}`);
      setPolls((prev) => prev.filter((poll) => poll._id !== pollId));
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setSelectedPoll(null);
    fetchPolls(); // Refresh the polls
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No Date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleViewResult = (poll) => {
    setSelectedPoll(poll);
    setShowResultModal(true);
  };

  const closeModal = () => {
    setShowResultModal(false);
    setSelectedPoll(null);
  };

  const calculateTotalVotes = (options) => {
    return options.reduce((total, option) => total + (option.votes || 0), 0);
  };

  const calculatePercentage = (votes, totalVotes) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(2) : 0;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Polls</h1>
      <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200 mb-4 ml-4">
        Create Poll
      </button>
      {showForm && (
        <CreatePoll
          poll={selectedPoll}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowForm(false); setSelectedPoll(null); }}
        />
      )}
      <div className="overflow-x-auto ml-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md ">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-b border-gray-300 text-left py-3 px-2 sm:px-4">#</th>
              <th className="border-b border-gray-300 text-left py-3 px-2 sm:px-4">Question</th>
              <th className="border-b border-gray-300 text-left py-3 px-2 sm:px-4">Vote Permission</th>
              <th className="border-b border-gray-300 text-left py-3 px-2 sm:px-4">Status</th>
              <th className="border-b border-gray-300 text-left py-3 px-2 sm:px-4">Date Added</th>
              <th className="border-b border-gray-300 text-left py-3 px-2 sm:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll, index) => (
              <tr key={poll._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-3 px-2 sm:px-4 border-b border-gray-300 text-center">{index + 1}</td>
                <td className="py-3 px-2 sm:px-4 border-b border-gray-300">
                  {poll.question} <br />
                  <button
                    onClick={() => handleViewResult(poll)}
                    className="underline text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    View Result
                  </button>
                </td>
                <td className="py-3 px-2 sm:px-4 border-b border-gray-300 text-center">{poll.votePermission}</td>
                <td className="py-3 px-2 sm:px-4 border-b border-gray-300 text-center">{poll.status}</td>
                <td className="py-3 px-2 sm:px-4 border-b border-gray-300 text-center">{formatDate(poll.dateAdded)}</td>
                <td className="py-3 px-2 sm:px-4 border-b border-gray-300 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEditPoll(poll)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePoll(poll._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for View Result */}
      {showResultModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h1 className="text-2xl font-semibold mb-4">{selectedPoll?.question}</h1>
            <h4 className="text-lg mb-4">Total Votes: {calculateTotalVotes(selectedPoll?.options) || 0}</h4>

            <ul className="list-disc pl-5 mb-4">
              {selectedPoll?.options.map((option) => {
                const totalVotes = calculateTotalVotes(selectedPoll.options);
                const percentage = calculatePercentage(option.votes || 0, totalVotes);
                
                return (
                  <li key={option._id} className="mb-2">
                    <div className="flex justify-between items-center">
                      <span>{option.text}</span>
                      <span>{option.votes || 0} votes ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Polls;
