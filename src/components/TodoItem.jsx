// TodoItem.js
import React from 'react';
import { MdDelete } from 'react-icons/md';

const TodoItem = ({ todo, toggleComplete, removeTodo, updateStatus }) => {
  const handleStatusChange = (newStatus) => {
    updateStatus(todo.id, newStatus);
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded shadow-md mb-2 hover:shadow-lg transition-shadow">
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="mr-2 cursor-pointer"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text} (Vence: {new Date(todo.dueDate).toLocaleString()}) - Asignada a: {todo.assignedTo}
      </span>
      <select
        value={todo.status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="border rounded p-1 mx-2 bg-white text-gray-700"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={() => removeTodo(todo.id)} className="text-red-500 hover:text-red-700">
        <MdDelete />
      </button>
    </div>
  );
};

export default TodoItem;
