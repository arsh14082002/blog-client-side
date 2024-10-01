import { getUserPosts, profileUser } from '@/api';
import { EllipsisVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileResponse = await profileUser();
        setProfile(profileResponse.data);

        const postsResponse = await getUserPosts();
        if (Array.isArray(postsResponse.data)) {
          setPosts(postsResponse.data);
        } else {
          throw new Error('Posts data is not an array');
        }

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch profile or posts');
        setLoading(false);
      }
    };

    getProfile();

    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.dropdown-menu')) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

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
      <div className="container mx-auto p-4 border-slate-300 border-2 border-solid w-fit rounded-md mt-6">
        <h1 className="text-2xl font-bold mb-4 text-center capitalize ">
          {profile.personal_info.fullname}
        </h1>
        <div className="bg-white p-4 rounded-lg flex justify-center items-center flex-col ">
          <img
            src={profile.personal_info.profile_img}
            alt={profile.personal_info.fullname}
            className="h-[100px] w-[100px] rounded-full"
          />
          <p>
            <strong>Username:</strong> {profile.personal_info.fullname}
          </p>
          <p>
            <strong>Email:</strong> {profile.personal_info.email}
          </p>
        </div>

        <div className="flex justify-center items-center gap-3">
          <div className="p-3 bg-slate-500 text-white font-bold rounded-lg">
            <span>Posts</span>
            <span>{profile.account_info.total_posts}</span>
          </div>

          <div className="p-3 bg-slate-500 text-white font-bold rounded-lg">
            <span>Reads</span>
            <span>{profile.account_info.total_reads}</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">My Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white p-4 rounded-lg shadow-md border-solid border-black border-3"
            >
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="mt-2">{post.des}</p>
              </div>

              <div className="flex gap-5">
                <Link
                  to={`/post/update-post/${toUrlFriendly(post._id)}`}
                  className="p-2 text-white font-bold rounded-lg bg-black"
                >
                  Update Post
                </Link>
                <button className="p-2 text-white font-bold rounded-lg bg-black">
                  <Link to={`/post/delete-post/${toUrlFriendly(post._id)}`}>Delete Post</Link>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
