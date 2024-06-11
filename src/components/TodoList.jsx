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
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input, dueDate, assignedTo, completed: false, status: 'pending' }]);
    setInput('');
    setDueDate('');
    setAssignedTo('');
  };

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4">Lista de Tareas</h1>
      <div className="flex mb-4">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-1 p-2 border border-gray-300"
          placeholder="Añadir nueva tarea..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="border p-2"
          placeholder="Asignar a..."
        />
        <button 
          onClick={addTodo} 
          className="bg-blue-500 text-white p-2 hover:bg-blue-600"
        >
          Añadir
        </button>
      </div>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
