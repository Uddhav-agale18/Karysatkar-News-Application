import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarPolls from './SidebarPolls';
import axios from 'axios';

const Politics = () => {
    const [politicsNews, setPoliticsNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchPoliticsNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts?category=politics');
            // Sort the posts by date in descending order
            const sortedPosts = response.data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            setPoliticsNews(sortedPosts || []);
        } catch (error) {
            console.error('Error fetching politics news:', error);
            setError('Failed to load political news');
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchPoliticsNews();
    }, []);

    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = politicsNews.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(politicsNews.length / itemsPerPage);

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full p-2">
                <div className="xs:p-0 lg:p-4 sm:p-2 rounded-sm mb-2 bg-white shadow-lg">
                    <nav className="text-gray-500 mb-4">
                        <Link to="/" className="hover:underline no-underline italic">Home</Link> /{' '}
                        <Link to="/politics-news" className="hover:underline no-underline italic">Politics</Link>
                    </nav>
                    <h1 className="text-2xl font-bold mb-4">Political News</h1>

                    {loading ? (
                        <p className="text-gray-500">Loading news...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="flex flex-wrap -mx-2">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((news) => (
                                    <div
                                        key={news._id}
                                        className="w-full md:w-1/2 px-2 mb-4 cursor-pointer"
                                    >
                                        <div className="p-2  bg-white">
                                            <Link to={`/post/${news._id}`} className="no-underline">
                                                <img
                                                    src={news.image ? `http://localhost:5000/uploads/${news.image}` : 'defaultImagePath.jpg'}
                                                    alt={news.title}
                                                    className="w-full h-56 object-cover rounded-sm mb-4"
                                                />
                                                <h2 className="text-lg font-bold">{news.title}</h2>
                                            </Link>
                                            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    {/* Adjusted the icon size and margin */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-600 mr-2"
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
                                                    <span className="text-gray-500 text-xs ml-1">{new Date(news.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    {/* Adjusted the icon size and margin */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-600 mr-2"
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
                                <p>No political news available.</p>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 m-2"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 m-2"
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

export default Politics;
