const BlogInfo = ({ blog, user, updateBlog, removeBlog }) => {
  const pStyle = {
    margin: 0
  }

  const blogInfoStyle = {
    paddingTop: '5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  }

  const buttonStyle = {
    width: 'fit-content',
  }

  const addLike = (event) => {
    event.preventDefault()
    blog.likes += 1;
    updateBlog(blog);
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog);
  }

  return (
    <div style={blogInfoStyle}>
      <p style={pStyle}>Link: {blog.url}</p>
      <p style={pStyle}>Likes: {blog.likes} <button onClick={addLike}>Like</button></p>
      <p style={pStyle}>Author: {blog.author}</p>
      {user && user.username === blog.user.username && (<button onClick={deleteBlog} style={buttonStyle}>Delete</button>)}
    </div>
  );
};

export default BlogInfo;