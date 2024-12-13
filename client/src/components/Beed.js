import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import SidebarPolls from './SidebarPolls';

const Beed = () => {
    const [beedPosts, setBeedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBeedPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts?category=beed-district');
                // Sort posts in descending order based on the `date` field
                const sortedPosts = response.data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBeedPosts(sortedPosts || []);
            } catch (error) {
                console.error('Error fetching Beed district posts:', error);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };
    
        fetchBeedPosts();
    }, []);
    

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = beedPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(beedPosts.length / itemsPerPage);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="flex flex-col md:flex-row p-2 md:space-x-4">
            <div className="w-full md:w-2/3 p-2">
                <div className="xs:p-0 lg:p-4 sm:p-2 rounded-sm bg-white shadow-lg overflow-hidden">
                    <nav className="text-gray-500 mb-3 text-sm md:text-base truncate m-1">
                        <Link to="/" className="hover:underline italic">Home</Link> /{' '}
                        <Link to="/beed-district" className="hover:underline italic">Beed District</Link>
                    </nav>
                    <h1 className="text-xl md:text-2xl font-bold mb-4 ml-1">Beed District News</h1>

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="flex flex-wrap">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((news) => (
                                    <div
                                        key={news._id}
                                        className="w-full sm:w-1/2 mb-4 px-2 cursor-pointer"
                                        onClick={() => handlePostClick(news._id)}
                                    >
                                        <div className="p-2 bg-white overflow-hidden">
                                            <img
                                                src={news.image ? `http://localhost:5000/uploads/${news.image}` : 'defaultImagePath.jpg'}
                                                alt={news.title}
                                                className="w-full h-40 md:h-56 object-cover rounded-sm mb-4"
                                            />
                                            <h2 className="text-base md:text-lg font-bold">{news.title}</h2>
                                            <div className="flex items-center justify-between mt-2 text-xs md:text-sm text-gray-600">
                                                {/* Date Icon */}
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M8 7V3m8 4V3m-8 0H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-3m-5 8h.01M12 16h.01M8 16h.01M8 12h.01M16 12h.01M16 16h.01"
                                                        />
                                                    </svg>
                                                    <span className="ml-1">{new Date(news.date).toLocaleDateString()}</span>
                                                </div>

                                                {/* Comment Count Icon */}
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 md:h-5 w-4 md:w-5 text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M8 10h.01M12 10h.01M16 10h.01M21 16.5a2.5 2.5 0 01-2.5 2.5H5l-3 3V5.5A2.5 2.5 0 014.5 3h15a2.5 2.5 0 012.5 2.5v11z"
                                                        />
                                                    </svg>
                                                    <span className="ml-1">{news.commentCount || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No posts available for Beed District.</p>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded disabled:opacity-50 m-2"
                        >
                            Previous
                        </button>
                        <span className="text-xs md:text-base">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded disabled:opacity-50 m-2"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <SidebarPolls />
        </div>
    );
};

export default Beed;
