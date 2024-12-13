import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [visiblePostsCount, setVisiblePostsCount] = useState(6);

    const fetchAllPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            console.log(response.data);

            // Sort posts by date (newest first)
            const sortedPosts = response.data.posts || [];
            sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));  // Sort in descending order

            setPosts(sortedPosts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to load posts');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
    };

    const handleLoadMore = () => {
        setVisiblePostsCount((prevCount) => prevCount + 6);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full p-2 overflow-hidden">
                <div className="xs:p-1 lg:p-4 sm:p-2 rounded-sm mb-2 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-2xl font-bold">All Posts</h1>
                        <Link to="/posts" className="text-blue-500 hover:underline focus:outline-none">
                            View All Posts &gt;
                        </Link>
                    </div>
                    <hr className="border-b-2 border-gray-400 mb-4" />

                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="flex flex-wrap -mx-2 overflow-hidden">
                            {posts.length > 0 ? (
                                posts.slice(0, visiblePostsCount).map((post) => (
                                    <div
                                        key={post._id}
                                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 px-2 mb-4"
                                    >
                                        <div className="p-1 bg-white">
                                            <Link to={`/post/${post._id}`} className="no-underline">
                                                <img
                                                    src={post.image ? `http://localhost:5000/uploads/${post.image}` : 'defaultImagePath.jpg'}
                                                    alt={post.title}
                                                    className="w-full lg:h-48 sm:h-48 object-cover rounded-sm mb-4"
                                                />
                                                <h3 className="text-lg font-bold mb-1">{post.title}</h3>
                                                <p className="text-gray-800 text-sm line-clamp-2">{post.excerpt}</p>
                                            </Link>
                                            <div className="flex items-center justify-between mt-2 text-xs sm:text-sm text-gray-600">
                                                <div className="flex items-center text-gray-500">
                                                    {/* Date icon */}
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
                                                    {formatDate(post.date)}
                                                </div>
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600"
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
                                                    <span className="ml-1">{post.commentCount || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No posts available.</p>
                            )}
                        </div>
                    )}

                    {visiblePostsCount < posts.length && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleLoadMore}
                                className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestPosts;
