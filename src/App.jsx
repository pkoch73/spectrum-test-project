import React, { useState } from 'react'
import {
  Provider,
  Heading,
  Form,
  TextField,
  Button,
  Divider,
  Card,
  Checkbox,
  Text
} from '@react-spectrum/s2'

function TodoApp() {
  const [todos, setTodos] = useState([])
  const [newTodoText, setNewTodoText] = useState('')

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setNewTodoText('')
    }
  }

  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleAddTodo()
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length
  const remainingCount = totalCount - completedCount

  return (
    <Provider theme="light">
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '2rem',
        minHeight: '100vh'
      }}>
        <Heading level={1}>My Todo List</Heading>
        
        <Form onSubmit={handleFormSubmit}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'flex-end',
            marginTop: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{ flex: 1 }}>
              <TextField
                label="Add new todo"
                placeholder="What do you need to do?"
                value={newTodoText}
                onChange={setNewTodoText}
              />
            </div>
            <Button
              variant="accent"
              onPress={handleAddTodo}
              isDisabled={!newTodoText.trim()}
            >
              Add Todo
            </Button>
          </div>
        </Form>

        <Divider />

        <div style={{ marginTop: '2rem' }}>
          {todos.length === 0 ? (
            <Card variant="secondary">
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <Text>No todos yet! Add your first todo above.</Text>
              </div>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {todos.map(todo => (
                <Card key={todo.id} variant="secondary">
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    padding: '1rem'
                  }}>
                    <Checkbox
                      isSelected={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <div style={{ flex: 1 }}>
                      <Text>
                        <span style={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          opacity: todo.completed ? 0.6 : 1,
                          fontSize: '1rem'
                        }}>
                          {todo.text}
                        </span>
                      </Text>
                    </div>
                    <Button
                      variant="secondary"
                      onPress={() => handleDeleteTodo(todo.id)}
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
          <>
            <Divider />
            <div style={{ 
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text>
                {remainingCount} of {totalCount} remaining
              </Text>
              <Text>
                {completedCount} completed
              </Text>
            </div>
          </>
        )}
      </div>
    </Provider>
  )
}

export default TodoApp