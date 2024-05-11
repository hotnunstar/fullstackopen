const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.reduce((maxBlog, currentBlog) =>
    maxBlog.likes > currentBlog.likes ? maxBlog : currentBlog
  )

const mostBlogs = (blogs) =>
  _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .maxBy('blogs')
    .value()

const mostLikes = (blogs) => ({
  author: ((blog) => blog.author)(_.maxBy(blogs, 'likes')),
  likes: _.sumBy(
    _.filter(blogs, { author: _.maxBy(blogs, 'likes').author }),
    'likes'
  ),
})

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
