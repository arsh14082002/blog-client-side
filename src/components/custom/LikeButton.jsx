// components/LikeButton.js

import React, { useState } from 'react';
import axios from 'axios';
import { Heart } from 'lucide-react';

const LikeButton = ({ postId, isLiked, onLike, onUnlike }) => {
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      if (isLiked) {
        await axios.post(`/api/posts/${postId}/unlike`);
        onUnlike();
      } else {
        await axios.post(`/api/posts/${postId}/like`);
        onLike();
      }
    } catch (error) {
      console.error('Failed to like/unlike post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-gray-500'}`} />
      <span>{isLiked ? 'Unlike' : 'Like'}</span>
    </button>
  );
};

export default LikeButton;
