// Posts.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Posts = ({ posts, setPosts, setEditPost, currentPage = 0, itemsPerPage = 10 }) => {
  
  // Fetch posts from the server on component mount
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts'); // Adjust URL as needed
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [setPosts]);

  // Handle edit action
  const handleEdit = (post) => {
    setEditPost(post);
    // Optionally, you could refetch the posts after a successful edit
    fetchPosts(); // Uncomment if you want to fetch posts after editing
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`); 
        fetchPosts(); // Refetch posts after deletion
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <table className="min-w-full border-collapse border border-gray-300 text-sm ml-1 mt-4">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Image</th>
          <th className="border border-gray-300 p-2">Title</th>
          <th className="border border-gray-300 p-2">Category</th>
          <th className="border border-gray-300 p-2">Date</th>
          <th className="border border-gray-300 p-2">Views</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <tr key={post._id}>
              <td className="border border-gray-300 p-2">{currentPage * itemsPerPage + index + 1}</td>
              <td className="border border-gray-300 p-2">
                <img src={`http://localhost:5000/uploads/${post.image || 'defaultImagePath.jpg'}`} alt={post.title} className="w-20 h-20 object-cover" />
              </td>
              <td className="border border-gray-300 p-2">{post.title}</td>
              <td className="border border-gray-300 p-2">{post.category}</td>
              <td className="border border-gray-300 p-2">{new Date(post.createdAt).toLocaleString()}</td>
              <td className="border border-gray-300 p-2">{post.views}</td> {/* Display view count */}
              <td className="border border-gray-300 pb-5 pt-5 flex justify-center space-x-2">
                <button onClick={() => handleEdit(post)} className="text-yellow-500 hover:bg-yellow-200 rounded p-1" title="Edit">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:bg-red-200 rounded p-1" title="Delete">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="border border-gray-300 p-4 text-center">No posts available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Posts;
