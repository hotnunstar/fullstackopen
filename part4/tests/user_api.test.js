const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({ _id: { $ne: '6666cd31ec14053540db6c12' } })
  await User.insertMany(helper.initialUsers)
})

test('there are three users', async () => {
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 3)
})

test('a valid user can be added ', async () => {
  const newUser = {
    username: 'nuno',
    name: 'Nuno Araújo',
    password: 'nuno',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')

  const username = response.body.map((r) => r.username)

  assert.strictEqual(response.body.length, helper.initialUsers.length + 2)

  assert(username.includes('nuno'))
})

test('user without username is not added', async () => {
  const newUser = {
    name: 'Test',
    password: 'test',
  }

  await api.post('/api/users').send(newUser).expect(400)
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.initialUsers.length + 1)
})

test('user without password is not added', async () => {
  const newUser = {
    username: 'test',
    name: 'Test',
  }

  await api.post('/api/users').send(newUser).expect(400)
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.initialUsers.length + 1)
})

test('user with username length less than 3 is not added', async () => {
  const newUser = {
    username: 'te',
    name: 'Test',
    password: 'test',
  }

  await api.post('/api/users').send(newUser).expect(400)
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.initialUsers.length + 1)
})

test('user with password length less than 3 is not added', async () => {
  const newUser = {
    username: 'test',
    name: 'Test',
    password: 'te',
  }

  await api.post('/api/users').send(newUser).expect(400)
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.initialUsers.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})
