const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to Create a React Chatbot',
    author: 'Tan Jin',
    url: 'https://www.freecodecamp.org/news/how-to-create-a-react-chatbot',
    likes: 50,
    user: '66546e5d2166d204d986465d',
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '66546e5d2166d204d986465d',
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '66546e5d2166d204d986465d',
  },
]

const initialUsers = [
  {
    username: 'admin',
    name: 'Admin',
    passwordHash: '$2b$10$f2cM4UvEjyW1xGG3bMQ98.188MH23cs94AfPutH87yADxyx1CPwiy',
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
