import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/authReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(handleLogin(username, password))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-lime-100 border border-lime-900 w-fit p-4 rounded-lg"
    >
      <h1 className="text-xl font-bold text-center text-lime-700 pb-4 border-b border-b-lime-300">
        Login
      </h1>
      <div className="flex flex-col pt-4">
        <span className="text-sm text-lime-700">Username</span>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          className="border border-lime-900 rounded-lg bg-transparent px-2"
        />
      </div>
      <div className="py-4 flex flex-col">
        <span className="text-sm text-lime-700">Password</span>
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          className="border border-lime-900 rounded-lg bg-transparent px-2"
        />
      </div>
      <div className="flex justify-center">
        <button
          id="login-button"
          type="submit"
          className="rounded-lg border border-lime-900 px-4 py-1 bg-lime-900 text-lime-100 hover:text-lime-900 hover:bg-lime-100 hover:cursor-pointer transition-all duration-300 ease-in-out"
        >
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
