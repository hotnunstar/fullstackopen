import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider, useDispatch, useSelector } from 'react-redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatch = useDispatch()
  const feedback = useSelector(state => state)

  return (
    <div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>reset stats</button>
      <div>good {feedback.good}</div>
      <div>ok {feedback.ok}</div>
      <div>bad {feedback.bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}> {/* ✅ Wrap everything inside Provider */}
    <App />
  </Provider>
)