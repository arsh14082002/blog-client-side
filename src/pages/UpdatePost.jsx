import { getSinglePost, updatePost } from '@/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUploader from '@/components/custom/FileUploader';

const MAX_DESCRIPTION_LENGTH = 200;

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', des: '', tags: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState('');
  const [desLength, setDesLength] = useState(0); // State for description length

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getSinglePost(postId);
        setPost(response.data);
        setPreview(response.data.banner);
        setDesLength(response.data.des.length); // Initialize description length
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'des') {
      const truncatedValue = value.slice(0, MAX_DESCRIPTION_LENGTH);
      setPost({ ...post, des: truncatedValue });
      setDesLength(truncatedValue.length); // Update description length
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('des', post.des);
    formData.append('content', post.content);
    formData.append('tags', JSON.stringify(post.tags));
    if (banner) {
      formData.append('banner', banner);
    }

    try {
      const response = await updatePost(postId, formData);
      setMessage('Post updated successfully');
      navigate(`/${postId}`);
    } catch (error) {
      setError('Failed to Update Post');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Update Post</h1>

      {message && <div className="text-green-500 mb-4">{message}</div>}

      <form onSubmit={handleUpdatePost} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={post.title}
            onChange={handleChange}
            className="border-2 p-1 border-solid border-black rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="des">Description</label>

          <textarea
            type="text"
            name="des"
            id="des"
            value={post.des}
            onChange={handleChange}
            className="border-2 p-1 border-solid border-black rounded-lg w-full resize-none h-[150px] "
          ></textarea>
          <p className="text-gray-500">
            {desLength}/{MAX_DESCRIPTION_LENGTH} characters
          </p>
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="content">Content</label>
          <QuillEditor
            className=" p-1 rounded-lg h-80"
            theme="snow"
            value={post.content}
            onChange={(value) => setPost({ ...post, content: value })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="banner">Banner Image</label>
          <FileUploader onFileSelect={handleFileChange} />
          {preview && <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
        </div>

        <button type="submit" className="bg-black text-white p-2 font-bold rounded-lg">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
