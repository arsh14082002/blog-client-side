import { getPostsByTags } from '@/api';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const GetPostByTag = () => {
  const { tagId } = useParams();

  console.log(tagId);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await getPostsByTags(tagId);
        setPosts(response.data);
      } catch (err) {
        setError('Error fetching posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [tagId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const toUrlFriendly = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <div>
      <h1>Get Post By {tagId}</h1>

      <div className="grid grid-cols-4 gap-3x">
        {posts.map((post) => (
          <div key={post._id}>
            <img src={post.banner} alt={post.title} className="object-cover" />
            <h2>{post.title}</h2>

            <div className="flex gap-x-3 flex-wrap">
              {post.tags.map((tag, index) => (
                <Link key={index} to={`/post/${tag}`} className="underline text-blue-600">
                  {tag}
                </Link>
              ))}
            </div>
            <button className="p-2 text-white font-bold text-center flex justify-center items-center rounded-lg bg-black w-full mt-3">
              <Link to={`/${toUrlFriendly(post._id)}`}>Read Post</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetPostByTag;
