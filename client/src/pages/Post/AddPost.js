import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Posts from './Posts'; // Adjust the path as necessary
import { FaTimes } from 'react-icons/fa';

const AddPost = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [postDetails, setPostDetails] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    visibility: 'public',
    addToRecommended: false,
    showOnlyToRegistered: false,
    category: '',
    image: null,
    date: today,
    views: 0, // Initialize the views field
  });
  const [originalPostDetails, setOriginalPostDetails] = useState(postDetails); // Store original post details
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [editPost, setEditPost] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      const sortedPosts = response.data.posts || [];
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort fetched posts by date (newest first)
      setPosts(sortedPosts);  // Store the sorted posts
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Clear posts in case of error
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  useEffect(() => {
    if (editPost) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      setPostDetails({
        title: editPost.title,
        slug: editPost.slug,
        description: editPost.description,
        content: editPost.content,
        visibility: editPost.visibility,
        addToRecommended: editPost.addToRecommended,
        showOnlyToRegistered: editPost.showOnlyToRegistered,
        category: editPost.category,
        image: null,
        date: today, // Set today's date here
        views: editPost.views || 0, // Maintain the views count from the original post
      });
      setIsFormVisible(true);
    }
  }, [editPost]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPostDetails((prevDetails) => {
      let newValue = type === 'checkbox' ? checked : type === 'number' ? Number(value) : value;

      if (name === 'viewsPercentage') {
        // If the percentage is removed (i.e., 0 or empty), revert views to the original value
        let updatedViews = prevDetails.views;
        if (newValue !== 0 && newValue !== '') {
          // Calculate updated views based on the percentage
          updatedViews = prevDetails.originalViews * (1 + newValue / 100); // Use originalViews for calculation
        }

        return {
          ...prevDetails,
          viewsPercentage: newValue,
          views: Math.ceil(updatedViews), // Update views and round to nearest whole number
        };
      }

      return {
        ...prevDetails,
        [name]: newValue,
      };
    });
  };



  const handleImageChange = (e) => {
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      image: e.target.files[0],
    }));
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      content: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
  
    if (editPost) {
      const percentage = postDetails.viewsPercentage || 0; // Get the percentage entered by the admin
      const updatedViews = Math.ceil(postDetails.views * (1 + percentage / 100)); // Increase views by the percentage
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        views: updatedViews,
      }));
    }
  
    const formData = new FormData();
    Object.entries(postDetails).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        if (key === 'date' && !postDetails.date) {
          formData.append(key, formattedDate);
        } else {
          formData.append(key, value);
        }
      }
    });
  
    setLoading(true);
    try {
      const response = editPost
        ? await axios.put(`http://localhost:5000/api/posts/${editPost._id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
        : await axios.post('http://localhost:5000/api/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
  
      // Handle sorting after adding/updating the post
      setPosts((prevPosts) => {
        let updatedPosts;
        if (editPost) {
          updatedPosts = prevPosts.map((post) => (post._id === editPost._id ? response.data.post : post));
        } else {
          updatedPosts = [response.data.post, ...prevPosts];
        }
  
        // Sort the posts by date (newest first) after adding or updating
        return updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
      });
  
      setSuccessMessage(`Post ${editPost ? 'updated' : 'added'} successfully!`);
  
      // Resetting form
      setPostDetails({
        title: '',
        slug: '',
        description: '',
        content: '',
        visibility: 'public',
        addToRecommended: false,
        showOnlyToRegistered: false,
        category: '',
        image: null,
        date: today,
        views: 0,
        viewsPercentage: 0,
      });
      setIsFormVisible(false);
      setEditPost(null); // Clear edit post state
    } catch (error) {
      console.error('Error adding post:', error);
      setError(error.response?.data.message || 'Failed to add post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (editPost && postDetails.views !== editPost.views) {
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        originalViews: editPost.views, // Store the original value of views
      }));
    }
  }, [editPost]);
  const handleCloseForm = () => {
    setIsFormVisible(false);
    setPostDetails(originalPostDetails); // Reset to original post details
    setEditPost(null); // Clear edit post state
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <div>
      <div className="p-4 sm:p-6 mx-auto bg-white rounded-sm shadow-md max-w-lg sm:max-w-3xl ml-0 sm:ml-6">
        <section className="mb-2">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 ml-2 sm:ml-4">Add Post</h2>

          <div className="flex items-center mb-4 ml-2 sm:ml-4">
            <button
              onClick={() => setIsFormVisible(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 sm:w-auto"
            >
              Add Post
            </button>

            {isFormVisible && (
              <button
                onClick={handleCloseForm}
                className="ml-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 sm:w-auto"
                type="button"
              >
                <FaTimes className="inline mr-2" /> Close Form
              </button>
            )}
          </div>

          {isFormVisible && (
            <div className="">
              <form onSubmit={handleSubmit} className="bg-gray-100 p-4 sm:p-6 rounded-md">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={postDetails.title}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="slug">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={postDetails.slug}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={postDetails.description}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Content</label>
                  <div className="">
                    <CKEditor
                      className="h-80"
                      editor={ClassicEditor}
                      data={postDetails.content}
                      onChange={handleContentChange}
                      config={{
                        toolbar: [
                          'undo', 'redo', '|',
                          'heading', '|',
                          'bold', 'italic', 'underline', 'strikethrough', '|',
                          'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                          'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|',
                          'bulletedList', 'numberedList', '|',
                          'outdent', 'indent', '|',
                          'blockQuote', 'insertTable', '|',
                          'imageUpload', 'mediaEmbed', '|',
                          'removeFormat'
                        ],
                        fontSize: {
                          options: [9, 11, 13, 'default', 15, 17, 19, 21, 23, 25],
                        },
                        fontFamily: {
                          options: [
                            'default', 'Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana',
                          ],
                        },
                        fontColor: {
                          colors: [
                            { color: 'hsl(0, 0%, 0%)', label: 'Black' },
                            { color: 'hsl(0, 75%, 60%)', label: 'Red' },
                            { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
                            { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
                            { color: 'hsl(120, 75%, 60%)', label: 'Green' },
                            { color: 'hsl(180, 75%, 60%)', label: 'Cyan' },
                            { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
                            { color: 'hsl(300, 75%, 60%)', label: 'Magenta' }
                          ]
                        },
                        fontBackgroundColor: {
                          colors: [
                            { color: 'hsl(0, 0%, 100%)', label: 'White' },
                            { color: 'hsl(0, 0%, 0%)', label: 'Black' }
                          ]
                        },
                        alignment: {
                          options: ['left', 'center', 'right', 'justify'],
                        },
                        table: {
                          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Visibility</label>
                  <select
                    name="visibility"
                    value={postDetails.visibility}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="category">Category</label>
                  <select
                    name="category"
                    value={postDetails.category}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="marathi-news">मराठी बातम्या</option>
                    <option value="politics">राजकीय</option>
                    <option value="jalna-district">जालना-जिल्हा</option>
                    <option value="beed-district">बीड जिल्हा</option>
                    <option value="weather">हवामान</option>
                    <option value="agriculture">शेती विशेष</option>
                    <option value="latest-post">Latest Post</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="showOnlyToRegistered"
                      checked={postDetails.showOnlyToRegistered}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5"
                    />
                    <span className="ml-2">Show only to registered users</span>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="addToRecommended"
                      checked={postDetails.addToRecommended}
                      onChange={handleInputChange}
                      className="form-checkbox h-5 w-5"
                    />
                    <span className="ml-2">Add to recommended posts</span>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={postDetails.date}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1" htmlFor="image">Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1" htmlFor="viewsPercentage">Increase Views by (%)</label>
                  <input
                    type="number"
                    name="viewsPercentage"
                    value={postDetails.viewsPercentage || 0}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    min="0"
                    placeholder="Enter percentage"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1" htmlFor="views">Views</label>
                  <input
                    type="number"
                    name="views"
                    value={postDetails.views}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none"
                    readOnly // Make it read-only so the admin can't manually change it
                  />
                </div>



                {/* <div className="mb-4">
                  <label className="block mb-1" htmlFor="views">Views</label>
                  <input
                    type="number"
                    name="views"
                    value={postDetails.views}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-md focus:outline-none"
                  />
                </div> */}

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 sm:w-auto rounded hover:bg-blue-700 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : editPost ? 'Update Post' : 'Add Post'}
                </button>
              </form>
            </div>
          )}
        </section>
      </div>

      <div className="w-full p-4 sm:p-6 mx-auto bg-white rounded-sm shadow-md max-w-lg sm:max-w-3xl ml-0 sm:ml-10">
        <section className="mt-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 ml-2 sm:ml-4">Posts List</h2>

          <Posts
            posts={currentPosts}
            setEditPost={setEditPost}
            onDelete={setPosts}
            loading={loading}
          />

          {/* Pagination */}
          <section className="mt-4">
            <nav>
              <ul className="pagination flex flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className={`page-item ${pageNumber === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600'
                      } py-2 px-4 rounded cursor-pointer mb-2 transition duration-200 hover:bg-blue-500`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </section>
      </div>


    </div>
  );
};

export default AddPost;
