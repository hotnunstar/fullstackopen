import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        setErrorMessage('Failed to fetch blogs');
        setTimeout(() => setErrorMessage(null), 5000);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userLoggedBlogApp');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('userLoggedBlogApp', JSON.stringify(user));
      setUser(user);
      setSuccessMessage('Login successful');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('userLoggedBlogApp');
    setUser(null);
    setSuccessMessage('Logout successful');
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(`A new blog '${returnedBlog.title}' by ${returnedBlog.author} was added`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage('An error occurred while adding the blog, please try again');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
          <BlogForm createBlog={createBlog} />
          <h3>Blogs</h3>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      )}
    </div>
  );
}

export default App