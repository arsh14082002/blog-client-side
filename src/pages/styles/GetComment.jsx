import { getCommentsByPostId } from '@/api';
import React, { useEffect, useState } from 'react';

const GetComment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByPostId(postId);
        setComments(response.data);
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
      <div className="comment-list">
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.text}</p>
                <p>- {comment.author}</p>
                {/* Add functionality to edit/delete comments if needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default GetComment;
