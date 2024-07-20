import { useState } from 'react';
import BlogInfo from './BlogInfo';

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false);

  const blogStyle = {
    padding: 5,
    border: '1px solid black',
    marginBottom: 5,
  };

  const blogTitleStyle = {
    display: 'inline-flex',
    gap: '5px'
  }

  return (
    <div style={blogStyle}>
      <div style={blogTitleStyle} className="blog">
        {blog.title}
        <button onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? 'Hide Info' : 'View Info'}
        </button>
      </div>
      {showInfo && <BlogInfo blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />}
    </div>
  );
};

export default Blog;