import { getPosts } from '@/api';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Home = () => {
  const id = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(id);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toUrlFriendly = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <div>
      <h1>All Posts</h1>
      <div className="grid grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center"
          >
            <img
              src={post.banner}
              alt={post.title}
              className="w-full h-[150px] object-cover mt-3 mb-3"
            />
            <h2 className="text-xl font-bold text-center">{post.title}</h2>
            <p className="text-center">{post.des}</p> {/* Displaying short description */}
            {/* <p>{post.author.personal_info.fullname}</p> */}
            <div className="flex gap-x-3 flex-wrap">
              {post.tags.map((tag, index) => (
                <Link key={index} to={`/post/${id}`} className="underline text-blue-600">
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

export default Home;
