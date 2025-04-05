import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, likes: action.payload.likes }
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    commentBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.blog
          ? blog
          : { ...blog, comments: [...blog.comments, action.payload] }
      )
    },
  },
})

export const { setBlogs, appendBlog, likeBlog, removeBlog, commentBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    dispatch(showNotification(`Blog added: '${content.title}'`, 'success', 10))
  } catch (error) {
    dispatch(showNotification('Failed to add blog', 'error', 10))
  }
}

export const updateLikeBlog = (content) => async (dispatch) => {
  try {
    const updatedBlog = { ...content, likes: content.likes + 1 }
    const savedBlog = await blogService.update(updatedBlog)
    dispatch(likeBlog(savedBlog))
    dispatch(
      showNotification(
        `You liked '${content.title}' by ${content.author}`,
        'success',
        10
      )
    )
  } catch (error) {
    dispatch(showNotification('Failed to like blog', 'error', 10))
  }
}

export const deleteBlog = (content) => async (dispatch, getState) => {
  try {
    await blogService.remove(content.id)
    const blogs = getState().blogs.filter((b) => b.id !== content.id)
    dispatch(setBlogs(blogs))
    dispatch(
      showNotification(
        `You successfully deleted '${content.title}' by ${content.author}`,
        'success',
        10
      )
    )
  } catch (error) {
    dispatch(showNotification('Failed to delete blog', 'error', 10))
  }
}

export const updateCommentBlog = (id, comment) => async (dispatch) => {
  try {
    const savedComment = await blogService.createComment(id, comment)
    dispatch(commentBlog(savedComment))

    dispatch(
      showNotification(
        `Comment '${savedComment.comment}' was added`,
        'success',
        10
      )
    )
  } catch (error) {
    dispatch(showNotification('Failed to comment blog', 'error', 10))
  }
}

export default blogSlice.reducer
