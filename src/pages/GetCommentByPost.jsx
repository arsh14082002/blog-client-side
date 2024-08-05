import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentsByPostId } from '@/api'; // Adjust the import path if necessary

const GetCommentByPost = () => {
  const { postId } = useParams(); // Extract postId correctly
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsByPostId(postId);
        setComments(fetchedComments);
      } catch (error) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <div>
                <img src={comment.userId.profile_img} alt={comment.userId.fullname} />
                <strong>{comment.userId.fullname}</strong>
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default GetCommentByPost;
