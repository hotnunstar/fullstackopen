import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: "Component testing is done with react-testing-library",
        author: "Nuno A."
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: "Component testing is done with react-testing-library",
        author: "Nuno A.",
        Link: 'https://text.com/',
        Likes: 5,
    }

    render(<Blog blog={blog} />);

    const user = userEvent.setup()
    const button = screen.getByText('View Info')
    await user.click(button)

    expect(screen.getByText('Link:')).toBeDefined();
    expect(screen.getByText('Likes:')).toBeDefined();
})

test('clicking the like button twice calls updateBlog twice', async () => {
    const blog = {
        title: "Component testing is done with react-testing-library",
        author: "Nuno A.",
        Link: 'https://text.com/',
        Likes: 5,
    }

    const mockUpdateBlog = vi.fn();

    render(<Blog blog={blog} updateBlog={mockUpdateBlog} />);

    const user = userEvent.setup()
    const button = screen.getByText('View Info')
    await user.click(button)

    const likeButton = screen.getByText('Like');
    await userEvent.click(likeButton);
    await userEvent.click(likeButton);

    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
});