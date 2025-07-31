import React, { useState } from 'react'
import {
  Provider,
  Heading,
  Form,
  TextField,
  TextArea,
  Button,
  Divider,
  Card,
  Checkbox,
  Text,
  DatePicker
} from '@react-spectrum/s2'

function ProductivityApp() {
  // Todo state
  const [todos, setTodos] = useState([])
  const [newTodoText, setNewTodoText] = useState('')
  const [todoDate, setTodoDate] = useState(null)

  // Notes state
  const [notes, setNotes] = useState([])
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [editingNoteContent, setEditingNoteContent] = useState('')

  // Todo functions
  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
        dueDate: todoDate,
        createdAt: new Date()
      }
      setTodos([...todos, newTodo])
      setNewTodoText('')
      setTodoDate(null)
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

  // Notes functions
  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title: newNoteTitle.trim() || `Note ${notes.length + 1}`,
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
    setEditingNoteContent('')
    setNewNoteTitle('')
  }

  const handleSelectNote = (noteId) => {
    const note = notes.find(n => n.id === noteId)
    if (note) {
      setSelectedNoteId(noteId)
      setEditingNoteContent(note.content)
    }
  }

  const handleUpdateNoteContent = (content) => {
    setEditingNoteContent(content)
    if (selectedNoteId) {
      setNotes(notes.map(note =>
        note.id === selectedNoteId
          ? { ...note, content, updatedAt: new Date() }
          : note
      ))
    }
  }

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNoteId === id) {
      setSelectedNoteId(null)
      setEditingNoteContent('')
    }
  }

  const selectedNote = notes.find(note => note.id === selectedNoteId)

  const formatDate = (date) => {
    if (!date) return ''
    return date.toDate ? date.toDate().toLocaleDateString() : date.toLocaleDateString()
  }

  const formatNoteDate = (date) => {
    const now = new Date()
    const noteDate = new Date(date)
    const diffTime = Math.abs(now - noteDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return 'Today'
    } else if (diffDays === 2) {
      return 'Yesterday'
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`
    } else {
      return noteDate.toLocaleDateString()
    }
  }

  return (
    <Provider theme="light">
      <div style={{ 
        display: 'flex',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {/* Left Side - Todo App */}
        <div style={{ 
          flex: '0 0 400px',
          padding: '2rem',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto'
        }}>
          <Heading level={1}>Todos</Heading>
          
          <Form onSubmit={(e) => { e.preventDefault(); handleAddTodo(); }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '1.5rem',
              marginBottom: '2rem'
            }}>
              <TextField
                label="New todo"
                placeholder="What needs to be done?"
                value={newTodoText}
                onChange={setNewTodoText}
              />
              <DatePicker
                label="Due date (optional)"
                value={todoDate}
                onChange={setTodoDate}
              />
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

          <div style={{ marginTop: '1.5rem' }}>
            {todos.length === 0 ? (
              <Card variant="secondary">
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <Text>No todos yet!</Text>
                </div>
              </Card>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {todos.map(todo => (
                  <Card key={todo.id} variant="secondary">
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '0.75rem',
                      padding: '0.75rem'
                    }}>
                      <Checkbox
                        isSelected={todo.completed}
                        onChange={() => handleToggleTodo(todo.id)}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text>
                          <div style={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            opacity: todo.completed ? 0.6 : 1,
                            fontSize: '0.9rem',
                            wordBreak: 'break-word'
                          }}>
                            {todo.text}
                          </div>
                        </Text>
                        {todo.dueDate && (
                          <Text>
                            <div style={{ 
                              fontSize: '0.75rem', 
                              color: '#666',
                              marginTop: '0.25rem'
                            }}>
                              Due: {formatDate(todo.dueDate)}
                            </div>
                          </Text>
                        )}
                      </div>
                      <Button
                        variant="secondary"
                        onPress={() => handleDeleteTodo(todo.id)}
                      >
                        ×
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              fontSize: '0.875rem',
              color: '#666',
              textAlign: 'center'
            }}>
              <Text>
                {todos.filter(todo => !todo.completed).length} of {todos.length} remaining
              </Text>
            </div>
          )}
        </div>

        {/* Right Side - Notes App (macOS Style) */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          height: '100vh'
        }}>
          {/* Notes Sidebar */}
          <div style={{ 
            flex: '0 0 300px',
            borderRight: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Notes Header */}
            <div style={{ 
              padding: '1rem',
              borderBottom: '1px solid #e0e0e0',
              backgroundColor: '#f8f9fa'
            }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <Heading level={2}>Notes</Heading>
                <Button
                  variant="accent"
                  onPress={handleCreateNote}
                >
                  New
                </Button>
              </div>
              <TextField
                placeholder="Note title..."
                value={newNoteTitle}
                onChange={setNewNoteTitle}
              />
            </div>

            {/* Notes List */}
            <div style={{ 
              flex: 1,
              overflowY: 'auto'
            }}>
              {notes.length === 0 ? (
                <div style={{ 
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#666'
                }}>
                  <Text>No notes yet</Text>
                </div>
              ) : (
                notes.map(note => (
                  <div
                    key={note.id}
                    onClick={() => handleSelectNote(note.id)}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid #e0e0e0',
                      cursor: 'pointer',
                      backgroundColor: selectedNoteId === note.id ? '#e3f2fd' : 'transparent',
                      ':hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <Text>
                        <div style={{ 
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          marginBottom: '0.25rem'
                        }}>
                          {note.title}
                        </div>
                      </Text>
                      <Button
                        variant="secondary"
                        onPress={(e) => {
                          e.stopPropagation()
                          handleDeleteNote(note.id)
                        }}
                      >
                        ×
                      </Button>
                    </div>
                    <Text>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#666',
                        marginBottom: '0.25rem'
                      }}>
                        {formatNoteDate(note.updatedAt)}
                      </div>
                    </Text>
                    <Text>
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#888',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {note.content.substring(0, 50)}...
                      </div>
                    </Text>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {selectedNote ? (
              <>
                <div style={{ 
                  padding: '1rem',
                  borderBottom: '1px solid #e0e0e0',
                  backgroundColor: '#f8f9fa'
                }}>
                  <Heading level={3}>{selectedNote.title}</Heading>
                  <Text>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {formatNoteDate(selectedNote.updatedAt)}
                    </div>
                  </Text>
                </div>
                <div style={{ 
                  flex: 1,
                  padding: '1rem'
                }}>
                  <TextArea
                    value={editingNoteContent}
                    onChange={handleUpdateNoteContent}
                    placeholder="Start writing..."
                  />
                </div>
              </>
            ) : (
              <div style={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666'
              }}>
                <Text>Select a note to edit or create a new one</Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default ProductivityApp