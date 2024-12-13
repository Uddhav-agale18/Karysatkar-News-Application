import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaNewspaper, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const BreakingNews = () => {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all posts
    const fetchAllPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data.posts || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to load posts');
            setLoading(false);
        }
    };

    // Fetch posts on component mount
    useEffect(() => {
        fetchAllPosts();
    }, []);

    // Automatically change the news every 3 seconds
    useEffect(() => {
        if (posts.length > 0) {
            const interval = setInterval(handleNext, 3000);
            return () => clearInterval(interval);
        }
    }, [posts.length]);

    // Handle "Next" Button - Change from bottom to top
    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            return (prevIndex - 1 + posts.length) % posts.length;
        });
    };

    // Handle "Prev" Button - Change from top to bottom
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            return (prevIndex + 1) % posts.length;
        });
    };

    return (
        <div className="relative mb-3 p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center">
                {/* Left Side: Breaking News Label */}
                <p className="text-xs font-semibold flex items-center bg-orange-400 text-white px-2 py-1 sm:mr-2">
                    <FaNewspaper className="mr-1" />
                    <span className="hidden sm:inline">Breaking News</span>
                </p>

                {/* Center: News Content */}
                <div className="flex-1 text-center mx-4 overflow-hidden">
                    {loading ? (
                        <div>Loading news...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : posts.length > 0 ? (
                        <div className="truncate">{posts[currentIndex].title}</div> // Truncate content to avoid overflow
                    ) : (
                        <div>No breaking news available</div>
                    )}
                </div>

                {/* Right Side: Prev and Next Buttons */}
                <div className="flex items-center space-x-2 ml-auto">
                    <button
                        onClick={handlePrev}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-normal sm:py-1 sm:px-3 py-1 px-2 rounded border border-gray-400"
                        disabled={loading || posts.length === 0}
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-normal sm:py-1 sm:px-3 py-1 px-2 rounded border border-gray-400"
                        disabled={loading || posts.length === 0}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BreakingNews;
