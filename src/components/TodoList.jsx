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
      <h1 className="text-2xl font-bold text-center mb-4">Scrum Board</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex mb-4">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="flex-1 p-2 border border-gray-300 rounded-l"
            placeholder="Añadir nueva tarea..."
          />
          <input
            type="datetime-local"
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
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          >
            Añadir
          </button>
        </div>
        <div className="flex">
          <div className="w-1/3 p-2">
            <h2 className="text-lg font-bold mb-2">To Do</h2>
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
          <div className="w-1/3 p-2">
            <h2 className="text-lg font-bold mb-2">In Progress</h2>
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
          <div className="w-1/3 p-2">
            <h2 className="text-lg font-bold mb-2">Done</h2>
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
    </div>
  );
};

export default TodoList;
