import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SidebarPolls from './SidebarPolls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';

const PostDetail = () => {
  const { postId, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        if (response.data.success) {
          const fetchedPost = response.data.post;
          setPost({
            ...fetchedPost,
            views: fetchedPost.views || 0,
          });
          setComments(fetchedPost.comments || []);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post details');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const incrementViewersCount = async () => {
      try {
        // Check local storage to see if the post has been viewed
        const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts')) || [];
        
        // If this post has not been viewed, increment the view count
        if (!viewedPosts.includes(postId)) {
          const response = await axios.post(`http://localhost:5000/api/posts/${postId}/increment-viewers`);
          if (response.data.success) {
            setPost((prevPost) => ({
              ...prevPost,
              views: response.data.views || prevPost.views,
            }));
            console.log('Updated Viewers Count:', response.data.views);

            // Add postId to local storage to mark it as viewed
            viewedPosts.push(postId);
            localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
          }
        }
      } catch (err) {
        console.error('Error incrementing viewers count:', err);
      }
    };

    // Call incrementViewersCount only if post exists and postId is defined
    if (post && postId) {
      incrementViewersCount();
    }
  }, [post, postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
        text: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
      setError('Failed to post comment');
    }
  };

  if (loading) {
    return <p className="text-gray-500 text-center mt-10">Loading post details...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!post) {
    return <p className="text-gray-500 text-center mt-10">Post not found</p>;
  }

  const categorySlug = post.category;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 p-4">
        <nav className="text-gray-500 mb-4">
          <Link to="/" className="hover:underline no-underline italic">Home</Link> /{' '}
          <Link to={`/${categorySlug}`} className="hover:underline no-underline italic">{categorySlug}</Link> /{' '}
          <span className='no-underline italic text-sm'>{post.title}</span>
        </nav>

        <h2 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h2>
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>
            Published on: <span className="font-medium">{new Date(post.date).toLocaleDateString()}</span>
          </span>
          <span>
            Updated on: <span className="font-medium">{new Date(post.updatedAt).toLocaleDateString()}</span>
          </span>
        </div>
        <div className="flex space-x-4 mt-4 mb-3">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 text-white bg-blue-600 hover:bg-blue-500 p-1 rounded-full" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 text-white bg-pink-600 hover:bg-pink-500 p-1 rounded-full" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 text-white bg-blue-400 hover:bg-blue-300 p-1 rounded-full" />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6 text-white bg-green-600 hover:bg-green-500 p-1 rounded-full" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 text-white bg-blue-700 hover:bg-blue-600 p-1 rounded-full" />
          </a>
        </div>
        <div className="flex items-center justify-end mt-4 mb-4">
                    <span className="text-gray-600 mr-2">Total Views:</span>
          <span className="text-gray-600">{post.views || 0}</span>
        </div>

        {post.image && (
          <div className="mb-6">
            <img
              src={`http://localhost:5000/uploads/${post.image}`}
              alt={post.title}
              className="w-full h-80 object-cover"
            />
          </div>
        )}
        <p className="text-lg text-gray-700 leading-relaxed mb-6"><strong>{post.description}</strong></p>
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: post.content }}></div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Comments</h3>
          <form  className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              placeholder="Add a comment..."
              rows="4"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">Post Comment</button>
          </form>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="mb-2 border-b border-gray-300 pb-2">
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
      
     <SidebarPolls/>
     
     
    </div>
  );
};

export default PostDetail;
