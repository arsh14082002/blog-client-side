import { getRelatablePost, getSinglePost } from '@/api';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './styles/singlePage.scss';
import GetComment from './styles/GetComment';
import CreateComments from './CreateComments';
import { Helmet } from 'react-helmet';
import Loader from '@/components/custom/Loader';
import LikeButton from '@/components/custom/LikeButton';

const SinglePostPage = () => {
  const id = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]); // State for related posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentsUpdated, setCommentsUpdated] = useState(false); // Track comments update
  const [isLiked, setIsLiked] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await getSinglePost(id.title);
        setPost(postResponse.data);

        const relatedResponse = await getRelatablePost(id.title);
        setRelatedPosts(relatedResponse.data);

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const toUrlFriendly = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const refreshComments = () => {
    setCommentsUpdated(!commentsUpdated); // Trigger comments update
  };

  const handleLike = () => setIsLiked(true);
  const handleUnlike = () => setIsLiked(false);

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <div className="single_post_page">
      {post && (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{post.title}</title>
          <link rel="canonical" href="" />
        </Helmet>
      )}

      <div className="single_post_page_header mx-auto p-4">
        {post ? (
          <div className="bg-white p-4 rounded-lg ">
            <h1 className="text-[60px] font-bold mb-4">{post.title}</h1>
            <img src={post.banner} alt="" className="w-full h-80 object-cover" />

            <div className="single_post_blog">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />{' '}
            </div>
            <div className="mt-5">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-600 px-2
                  py-1 rounded-sm mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p>Post not found</p>
        )}
        {/* 
        <LikeButton
          postId={id.title}
          isLiked={isLiked}
          onLike={handleLike}
          onUnlike={handleUnlike}
        /> */}

        {/* <CreateComments postId={id.title} token={token} refreshComments={refreshComments} />
        <GetComment postId={id.title} /> */}

        {relatedPosts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold">Related Post</h2>

            <div className="grid grid-cols-4 gap-3">
              {relatedPosts.map((relatedPost) => (
                <div
                  key={relatedPost._id}
                  className="border-2 border-solid border-black p-3 rounded"
                >
                  <img
                    src={relatedPost.banner}
                    alt={relatedPost.title}
                    className="h-32 object-cover w-full"
                  />
                  <h4 to={`/${toUrlFriendly(relatedPost._id)}`} className="text-xl font-bold">
                    {relatedPost.title}
                  </h4>

                  <p>{relatedPost.des}</p>

                  <button className="p-2 text-white font-bold text-center flex justify-center items-center rounded-lg bg-black w-full mt-3">
                    <Link to={'/relatedPost._id'}>Read Blog</Link>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePostPage;
