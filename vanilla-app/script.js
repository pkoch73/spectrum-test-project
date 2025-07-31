// Application state
let todos = [];
let notes = [];
let selectedNoteId = null;

// DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const addTodoBtn = document.getElementById('add-todo-btn');
const todosContainer = document.getElementById('todos-container');
const todosEmpty = document.getElementById('todos-empty');
const todoStats = document.getElementById('todo-stats');
const remainingCount = document.getElementById('remaining-count');
const totalCount = document.getElementById('total-count');

const newNoteBtn = document.getElementById('new-note-btn');
const noteTitleInput = document.getElementById('note-title-input');
const notesList = document.getElementById('notes-list');
const noteEditorHeader = document.getElementById('note-editor-header');
const currentNoteTitle = document.getElementById('current-note-title');
const currentNoteDate = document.getElementById('current-note-date');
const noteContent = document.getElementById('note-content');
const noteEditorPlaceholder = document.getElementById('note-editor-placeholder');

// Utility functions
function generateId() {
    return Date.now().toString();
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

function formatNoteDate(date) {
    const now = new Date();
    const noteDate = new Date(date);
    const diffTime = Math.abs(now - noteDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Today';
    } else if (diffDays === 2) {
        return 'Yesterday';
    } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
    } else {
        return noteDate.toLocaleDateString();
    }
}

// Todo functions
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const todo = {
        id: generateId(),
        text: text,
        completed: false,
        dueDate: todoDate.value || null,
        createdAt: new Date()
    };

    todos.push(todo);
    todoInput.value = '';
    todoDate.value = '';
    renderTodos();
    updateTodoStats();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        updateTodoStats();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
    updateTodoStats();
}

function renderTodos() {
    if (todos.length === 0) {
        todosContainer.innerHTML = '<div class="empty-state"><p>No todos yet!</p></div>';
        return;
    }

    const todosHtml = todos.map(todo => `
        <div class="todo-item">
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.completed ? 'checked' : ''}
                onchange="toggleTodo('${todo.id}')"
            >
            <div class="todo-content">
                <div class="todo-text ${todo.completed ? 'completed' : ''}">
                    ${todo.text}
                </div>
                ${todo.dueDate ? `<div class="todo-date">Due: ${formatDate(todo.dueDate)}</div>` : ''}
            </div>
            <button class="todo-delete" onclick="deleteTodo('${todo.id}')">×</button>
        </div>
    `).join('');

    todosContainer.innerHTML = todosHtml;
}

function updateTodoStats() {
    if (todos.length === 0) {
        todoStats.style.display = 'none';
        return;
    }

    const completed = todos.filter(t => t.completed).length;
    const total = todos.length;
    const remaining = total - completed;

    remainingCount.textContent = remaining;
    totalCount.textContent = total;
    todoStats.style.display = 'block';
}

// Notes functions
function createNote() {
    const title = noteTitleInput.value.trim() || `Note ${notes.length + 1}`;
    
    const note = {
        id: generateId(),
        title: title,
        content: '',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    notes.unshift(note);
    noteTitleInput.value = '';
    renderNotes();
    selectNote(note.id);
}

function selectNote(id) {
    selectedNoteId = id;
    const note = notes.find(n => n.id === id);
    
    if (note) {
        currentNoteTitle.textContent = note.title;
        currentNoteDate.textContent = formatNoteDate(note.updatedAt);
        noteContent.value = note.content;
        
        noteEditorHeader.style.display = 'block';
        noteContent.style.display = 'block';
        noteEditorPlaceholder.style.display = 'none';
        
        renderNotes(); // Re-render to update selection
    }
}

function updateNoteContent() {
    if (!selectedNoteId) return;
    
    const note = notes.find(n => n.id === selectedNoteId);
    if (note) {
        note.content = noteContent.value;
        note.updatedAt = new Date();
        currentNoteDate.textContent = formatNoteDate(note.updatedAt);
        renderNotes();
    }
}

function deleteNote(id, event) {
    event.stopPropagation();
    
    notes = notes.filter(n => n.id !== id);
    
    if (selectedNoteId === id) {
        selectedNoteId = null;
        noteEditorHeader.style.display = 'none';
        noteContent.style.display = 'none';
        noteEditorPlaceholder.style.display = 'flex';
    }
    
    renderNotes();
}

function renderNotes() {
    if (notes.length === 0) {
        notesList.innerHTML = '<div class="empty-state"><p>No notes yet</p></div>';
        return;
    }

    const notesHtml = notes.map(note => `
        <div class="note-item ${selectedNoteId === note.id ? 'selected' : ''}" onclick="selectNote('${note.id}')">
            <div class="note-item-header">
                <div class="note-item-title">${note.title}</div>
                <button class="note-item-delete" onclick="deleteNote('${note.id}', event)">×</button>
            </div>
            <div class="note-item-date">${formatNoteDate(note.updatedAt)}</div>
            <div class="note-item-preview">${note.content.substring(0, 50)}...</div>
        </div>
    `).join('');

    notesList.innerHTML = notesHtml;
}

// Event listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

todoInput.addEventListener('input', () => {
    addTodoBtn.disabled = !todoInput.value.trim();
});

newNoteBtn.addEventListener('click', createNote);

noteContent.addEventListener('input', updateNoteContent);

// Initialize the app
function init() {
    addTodoBtn.disabled = true;
    renderTodos();
    renderNotes();
    updateTodoStats();
}

// Start the application
init();

// Make functions globally available for onclick handlers
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.selectNote = selectNote;
window.deleteNote = deleteNote;