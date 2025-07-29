import React, { useState } from 'react'
import {
  Button,
  Form,
  CheckboxGroup,
  Divider
} from '@adobe/react-spectrum'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }])
      setInputValue('')
    }
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Todo List</h1>
      
      <Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="todo-input" style={{ display: 'block', marginBottom: '0.5rem' }}>
              New Todo
            </label>
            <input
              id="todo-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          <Button
            variant="accent"
            type="submit"
            isDisabled={!inputValue.trim()}
          >
            Add
          </Button>
        </div>
      </Form>

      <Divider />

      <div style={{ marginTop: '1rem' }}>
        {todos.length === 0 ? (
          <p>No todos yet. Add one above!</p>
        ) : (
          <div>
            {todos.map(todo => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px'
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{
                    flex: 1,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.6 : 1
                  }}
                >
                  {todo.text}
                </span>
                <Button
                  variant="secondary"
                  size="S"
                  onPress={() => removeTodo(todo.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {todos.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <p>
            {todos.filter(todo => !todo.completed).length} of {todos.length} remaining
          </p>
        </div>
      )}
    </div>
  )
}

export default App