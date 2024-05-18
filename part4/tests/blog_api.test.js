const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe(' blogs are returned correctly'),
    () => {
      test('there are three blogs', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 3)
      })

      test('id is correctly named', async () => {
        const response = await api.get('/api/blogs')
        assert(response.body.every((obj) => obj.hasOwnProperty('id')))
      })
    }

  describe('adding a specific blog'),
    () => {
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

      test('blog without likes field set likes to 0', async () => {
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
    }

  test('delete a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)
    assert(!titles.includes(blogToDelete.title))
  })

  test('update a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    var blogToUpdate = blogsAtStart[0]
    blogToUpdate.title = 'Full Stack Open is really helpful'

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map((r) => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)

    assert(title.includes('Full Stack Open is really helpful'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
