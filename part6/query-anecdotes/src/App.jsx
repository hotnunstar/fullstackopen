import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationContextProvider } from './NotificationContext'

const App = () => {
   return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </div>
    </NotificationContextProvider>
  )
}

export default App