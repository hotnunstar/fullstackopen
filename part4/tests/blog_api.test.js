const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const Test = require('supertest/lib/test')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 3)
})

test('id is correctly named', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body.every((obj) => obj.hasOwnProperty('id')))
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Full Stack Open is really helpful',
    author: 'Nuno Araújo',
    url: 'https://github.com/hotnunstar/fullstackopen',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map((r) => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(title.includes('Full Stack Open is really helpful'))
})

test('blog without likes field', async () => {
  const newBlog = {
    title: 'Full Stack Open is really helpful',
    author: 'Nuno Araújo',
    url: 'https://github.com/hotnunstar/fullstackopen',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Nuno Araújo',
    likes: 2,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
