// TodoList.js
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
    setTodos([...todos, { id: Date.now(), text: input, dueDate, assignedTo, completed: false, status: 'To Do' }]);
    setInput('');
    setDueDate('');
    setAssignedTo('');
  };

  const updateStatus = (id, newStatus) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, status: newStatus} : todo));
  };

  const removeTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  };

  const getColumnTodos = (status) => {
    return todos.filter(todo => todo.status === status);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Scrum Board</h1>
      <div className="flex mb-6 space-x-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-1 p-2 border border-gray-300 rounded-l outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Añadir nueva tarea..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border p-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Asignar a..."
        />
        <button 
          onClick={addTodo} 
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition-colors"
        >
          Añadir
        </button>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-700">To Do</h2>
          {getColumnTodos('To Do').map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              updateStatus={updateStatus}
            />
          ))}
        </div>
        <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-700">In Progress</h2>
          {getColumnTodos('In Progress').map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              updateStatus={updateStatus}
            />
          ))}
        </div>
        <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Done</h2>
          {getColumnTodos('Done').map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              updateStatus={updateStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
