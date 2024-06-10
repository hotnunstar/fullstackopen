const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to Create a React Chatbot',
    author: 'Tan Jin',
    url: 'https://www.freecodecamp.org/news/how-to-create-a-react-chatbot',
    likes: 50,
    user: '6666cd31ec14053540db6c12',
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '6666cf9bbbb3dcbb974af7ee',
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '6666cd31ec14053540db6c12',
  },
]

const initialUsers = [
  {
    username: 'admin',
    name: 'Admin',
    passwordHash: '$2b$10$CUUn9BKfiBRVJmu/JrtWwuS8OJgZX6QF5c/o.yoEBjBt0cuuV1d26',
  },
  {
    username: 'hellas',
    name: 'Arto Hellas',
    passwordHash: '$2b$10$ueEbyDdaJwwvfqKoMhSo/u7F9mECkx3rVSra06BaFcX45cPPxGabu',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
}
