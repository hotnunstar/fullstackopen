const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { comment: 1 })
  response.json(blogs)
})

// Post blog
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const body = request.body

  if (!body.title || !body.url)
    return response.status(400).json({ error: 'title and url are required' })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
  })
  response.status(201).json(populatedBlog)
})

// Put blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  const populatedBlog = await updatedBlog.populate('user', {
    username: 1,
    name: 1,
  })
  response.status(201).json(populatedBlog)
})

// Delete blog
blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user._id.toString()) {
      user.blogs = user.blogs.pull(blog._id)
      await user.save()
      await Blog.findByIdAndDelete(request.params.id)

      response.status(204).end()
    } else response.status(401).json({ error: 'user invalid' })
  }
)

// Post blog comment
blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (request, response) => {
    const { comment } = request.body
    const user = request.user
    const blogId = request.params.id

    if (!comment)
      return response.status(400).json({ error: 'Comment is required' })

    const blog = await Blog.findById(blogId)
    if (!blog) return response.status(404).json({ error: 'Blog not found' })

    const newComment = new Comment({
      comment,
      user: user.id,
      blog: blogId,
    })

    const savedComment = await newComment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    const populatedComment = await savedComment.populate('user', {
      username: 1,
      name: 1,
    })

    response.status(201).json(populatedComment)
  }
)

module.exports = blogsRouter
