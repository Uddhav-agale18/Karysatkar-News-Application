import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SidebarPolls = () => {
    const [polls, setPolls] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [pollSubmitted, setPollSubmitted] = useState(false);
    const [viewResults, setViewResults] = useState(false);
    const [currentPoll, setCurrentPoll] = useState(null);

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/polls');
            setPolls(response.data);
            const activePoll = response.data.find(poll => poll.status === 'Active');
            if (activePoll) {
                setCurrentPoll(activePoll);
            }
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    const handleVote = async (e) => {
        e.preventDefault();
        if (!selectedOption) return;

        const optionIndex = currentPoll.options.findIndex(option => option.text === selectedOption);

        try {
            await axios.post(`http://localhost:5000/api/polls/${currentPoll._id}/vote`, { optionIndex });

            const updatedOptions = currentPoll.options.map((option, index) => {
                if (index === optionIndex) {
                    return { ...option, votes: (option.votes || 0) + 1 };
                }
                return option;
            });

            setCurrentPoll({ ...currentPoll, options: updatedOptions, totalVotes: calculateTotalVotes(updatedOptions) });
            setPollSubmitted(true);
        } catch (error) {
            console.error('Error submitting vote:', error);
        }
    };

    const handlePollCreated = () => {
        fetchPolls();
    };

    const calculateTotalVotes = (options) => {
        return options.reduce((total, option) => total + (option.votes || 0), 0);
    };

    return (
        <div className="w-full md:w-2/3 lg:w-1/2 max-w-md mx-auto p-4 bg-white rounded-sm shadow-sm mb-3 mt-2">
            {currentPoll ? (
                <>
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-4 text-center">Voting Poll</h2>
                    {!pollSubmitted && (
                        <form onSubmit={handleVote}>
                            <h2 className="mb-2 font-bold text-lg md:text-base">{currentPoll.question}</h2>
                            {currentPoll.options.map((option, index) => (
                                <div key={index} className="mb-2 flex items-center">
                                    <label className="flex items-center text-gray-700">
                                        <input
                                            type="radio"
                                            name="pollOption"
                                            value={option.text}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm md:text-base">{option.text}</span>
                                    </label>
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full md:w-auto md:px-6 transition-colors hover:bg-blue-600"
                            >
                                Submit Vote
                            </button>
                        </form>
                    )}

                    {pollSubmitted && (
                        <>
                            <p className="text-green-600 font-semibold mt-4 text-center">
                                Thank you for voting!
                            </p>
                            <button
                                onClick={() => setViewResults(!viewResults)}
                                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded w-full md:w-auto md:px-6 transition-colors hover:bg-yellow-600"
                            >
                                {viewResults ? 'Hide Results' : 'View Results'}
                            </button>

                            {viewResults && (
                                <div className="mt-4">
                                    <h4 className="font-bold text-sm md:text-base">Poll Results</h4>
                                    <ul className="text-sm md:text-base mt-2">
                                        {currentPoll.options.map((option, index) => (
                                            <li key={index} className="mb-1">
                                                {option.text}: {option.votes || 0} votes
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="font-bold mt-2 text-sm md:text-base">Total Votes: {calculateTotalVotes(currentPoll.options)}</p>
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <p className="text-gray-700 text-center">No active polls available at the moment.</p>
            )}
        </div>
    );
};

export default SidebarPolls;
