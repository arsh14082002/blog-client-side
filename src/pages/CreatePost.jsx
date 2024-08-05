import React, { useMemo, useRef, useState } from 'react';
import { createPost } from '@/api';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUploader from '@/components/custom/FileUploader';
import { X } from 'lucide-react';

const CreatePost = () => {
  const quill = useRef();

  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState(null);
  const [des, setDes] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const handleFileSelect = (file) => {
    setBanner(file);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmedInput = tagInput.trim();
      if (trimmedInput) {
        const newTags = trimmedInput.split(/[\s,]+/).filter((tag) => tag.length > 0);
        setTags((prevTags) => [...new Set([...prevTags, ...newTags])]);
        setTagInput('');
      }
    }
  };

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('title', title);
    formData.append('des', des);
    formData.append('content', content);
    formData.append('tags', JSON.stringify(tags));
    if (banner) {
      formData.append('banner', banner);
    }

    try {
      const response = await createPost(formData);
      setTitle('');
      setDes('');
      setContent('');
      setTags([]);
      setBanner(null);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link'],
          ['clean'],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'clean',
  ];

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 p-1 border-solid border-black rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="banner">Banner</label>
          <FileUploader onFileSelect={handleFileSelect} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="des">Description</label>
          <textarea
            type="text"
            name="des"
            id="des"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="border-2 p-1 border-solid border-black rounded-lg w-full resize-none h-[150px]"
          ></textarea>
        </div>
        <div className="flex flex-col gap-1">
          <label>Editor Content</label>
          <QuillEditor
            ref={(el) => (quill.current = el)}
            className="border-2 p-1"
            theme="snow"
            value={content}
            formats={formats}
            modules={modules}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tagInput}
            onChange={handleTagChange}
            onKeyDown={handleTagKeyPress}
            className="border-2 p-1 border-solid border-black rounded-lg"
          />
          <div className="flex flex-wrap gap-4 mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-slate-400 flex justify-center items-center gap-1 p-2 rounded-xl"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTag(index)}>
                  <X />
                </button>
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading} // Disable button when loading
          className={`bg-black text-white p-2 font-bold rounded-lg ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
