import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: ''
    });
  };

  return (
    <div>
      <h3>Create new Blog</h3>
      <form onSubmit={addBlog}>
        {Object.keys(newBlog).map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}</label>
            <input
              type={field === 'url' ? 'url' : 'text'}
              id={field}
              name={field}
              value={newBlog[field]}
              onChange={(event) => {
                const { name, value } = event.target;
                setNewBlog(prevState => ({
                  ...prevState,
                  [name]: value
                }));
              }}
            />
          </div>
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;