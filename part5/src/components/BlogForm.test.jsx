import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const sendButton = screen.getByText('Create')

  await user.type(titleInput, 'Blog Title')
  await user.type(authorInput, 'Author Name')
  await user.type(urlInput, 'http://link.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Author Name')
  expect(createBlog.mock.calls[0][0].url).toBe('http://link.com')
})