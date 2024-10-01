import axios from 'axios';
// https://blog-server-nbl8.onrender.com/api
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const registerUser = (data) => api.post('/signup', data);
export const loginUser = (data) => api.post('/login', data);
export const profileUser = () => api.get('/me');

export const createPost = (data) => api.post('/create', data);
export const getSinglePost = (id) => api.get(`/post/${id}`);
export const getPosts = () => api.get('/posts');
export const getUserPosts = () => api.get('/user-post');
export const updatePost = (postId, data) => api.put(`/post/${postId}`, data);
export const deletePost = (postId) => api.delete(`/post/${postId}`);
export const getRecentPosts = () => api.get('/recent-posts');
export const getRelatablePost = (postId) => api.get(`/posts/suggestions/${postId}`);
export const getPostsByTags = (tags) => api.get('/posts-by-tags', { params: { tags } });

export const createComment = (postId, data) =>
  api.post('/comments', { postId, comment: data.comment });

export const getCommentsByPostId = (postId) => api.get(`/comments/${postId}`);
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);
export const updateComment = (commentId, data) => api.put(`/comments/${commentId}`, data);

export default api;
