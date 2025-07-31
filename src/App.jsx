import React, { useState } from 'react'
import {
  Provider,
  Button,
  Form,
  TextField,
  Checkbox,
  Divider,
  Heading,
  Text,
  Card
} from '@react-spectrum/s2'

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
    <Provider theme="light">
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <Heading level={1}>Todo List</Heading>
        
        <Form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <TextField
                label="New Todo"
                value={inputValue}
                onChange={setInputValue}
                placeholder="Enter a new todo item"
              />
            </div>
            <Button
              variant="accent"
              isDisabled={!inputValue.trim()}
              onPress={addTodo}
            >
              Add
            </Button>
          </div>
        </Form>

        <Divider />

        <div style={{ marginTop: '1.5rem' }}>
          {todos.length === 0 ? (
            <Text>No todos yet. Add one above!</Text>
          ) : (
            <div>
              {todos.map(todo => (
                <Card key={todo.id} variant="secondary">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem' }}>
                    <Checkbox
                      isSelected={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <div style={{ flex: 1 }}>
                      <Text>
                        <span
                          style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            opacity: todo.completed ? 0.6 : 1
                          }}
                        >
                          {todo.text}
                        </span>
                      </Text>
                    </div>
                    <Button
                      variant="secondary"
                      onPress={() => removeTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {todos.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <Text>
              {todos.filter(todo => !todo.completed).length} of {todos.length} remaining
            </Text>
          </div>
        )}
      </div>
    </Provider>
  )
}

export default App