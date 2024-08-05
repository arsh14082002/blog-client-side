import { createComment } from '@/api';
import React, { useState } from 'react';
import GetCommentByPost from './GetCommentByPost';

const CreateComments = ({ postId, refreshComments }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send `comment` as a string directly
      await createComment(postId, { comment });
      setComment('');
      refreshComments();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Submit</button>
        {error && <div>{error}</div>}
      </form>

      <GetCommentByPost />
    </div>
  );
};

export default CreateComments;
