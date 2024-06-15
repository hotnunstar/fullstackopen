import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogUrl, setBlogUrl] = useState('');

    const handleCreateBlog = (event) => {
        event.preventDefault();
        createBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl,
        });
        setBlogTitle('');
        setBlogAuthor('');
        setBlogUrl('');
    };

    return (
        <div>
            <h3>Create new</h3>
            <form onSubmit={handleCreateBlog}>
                <div>
                    title
                    <input
                        type="text"
                        value={blogTitle}
                        name="blogTitle"
                        onChange={({ target }) => setBlogTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={blogAuthor}
                        name="blogAuthor"
                        onChange={({ target }) => setBlogAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        type="url"
                        value={blogUrl}
                        name="blogUrl"
                        onChange={({ target }) => setBlogUrl(target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default BlogForm;