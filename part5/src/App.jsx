import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef()

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
      blogService.setToken(user.token)
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
      returnedBlog.user = user;
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(`A new blog '${returnedBlog.title}' by ${returnedBlog.author} was added`);
      blogFormRef.current.toggleVisibility()
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage('An error occurred while adding the blog, please try again');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject);
      setSuccessMessage(`You liked '${returnedBlog.title}' by ${returnedBlog.author}`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage('An error occurred while liking the blog, please try again');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      try {
        await blogService.remove(blogObject);
        setBlogs(blogs => blogs.filter((blog) => blog !== blogObject))
        setSuccessMessage('The blog has been removing');
        setTimeout(() => setSuccessMessage(null), 5000);
      } catch {
        setErrorMessage('An error occurred while removing the blog, please try again');
        setTimeout(() => setErrorMessage(null), 5000);
      }
    } else return false
  }

  return (
    <div>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <h3>Blogs</h3>
          {blogs.slice().sort((a, b) => b.likes - a.likes).map(blog => (<Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />))}
        </div>
      )}
    </div>
  );
}

export default App