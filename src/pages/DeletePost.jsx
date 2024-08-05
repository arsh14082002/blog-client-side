import { deletePost, getSinglePost } from '@/api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const DeletePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getSinglePost(postId);
        setPost(response.data);
      } catch (error) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      setMessage('Delete successfully');
      navigate('/'); // Redirect to home or another page after deletion
    } catch (error) {
      console.error('Failed to delete post', error);
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="post">
      {message && <div className="text-green-500 mb-4">{message}</div>}
      {post && (
        <>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} /> <p>{post.content}</p>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default DeletePost;
