import React, { useEffect, useState } from 'react';
Navigate;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/custom/Navbar';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import DeletePost from './pages/DeletePost';
import SinglePostPage from './pages/SinglePostPage';
import GetPostByTag from './pages/GetPostByTag';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  return (
    <div>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/profile" replace={true} />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/profile" replace={true} />
              ) : (
                <Register onRegisterSuccess={handleRegisterSuccess} />
              )
            }
          />

          <Route
            path="/profile"
            element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
          />

          <Route path="/:title" element={<SinglePostPage />} />

          <Route path="/post/:tagId" element={<GetPostByTag />} />

          <Route
            path="/create-post"
            element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />}
          />

          <Route
            path="post/update-post/:postId"
            element={isAuthenticated ? <UpdatePost /> : <Navigate to="/login" />}
          />

          <Route
            path="post/delete-post/:postId"
            element={isAuthenticated ? <DeletePost /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
