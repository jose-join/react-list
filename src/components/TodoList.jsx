import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input || !dueDate || !assignedTo) return;
    setTodos([...todos, { id: Date.now(), text: input, dueDate, assignedTo, completed: false, status: 'pending' }]);
    setInput('');
    setDueDate('');
    setAssignedTo('');
  };

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Lista de Tareas</h1>
      <div className="flex flex-col space-y-2 mb-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="p-2 border border-gray-300 rounded"
          placeholder="Añadir nueva tarea..."
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          placeholder="Asignar a..."
        />
        <button 
          onClick={addTodo} 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Añadir
        </button>
      </div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          toggleComplete={(id) => setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))}
          removeTodo={(id) => setTodos(todos.filter(todo => todo.id !== id))}
          updateStatus={(id, newStatus) => setTodos(todos.map(todo => todo.id === id ? {...todo, status: newStatus} : todo))}
        />
      ))}
    </div>
  );
};

export default TodoList;
