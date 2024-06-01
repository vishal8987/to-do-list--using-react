// src/TodoList.js
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  // Handle editing a task
  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  // Handle saving the edited task
  const handleSaveTask = () => {
    if (editTask.trim() === '') return;
    const updatedTasks = tasks.map((task, index) => 
      index === editIndex ? { ...task, text: editTask } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask('');
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditTask('');
  };

  // Handle removing a task
  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Handle toggling task completion
  const handleToggleTask = (index) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className='todo'>
      <h1>To-Do List</h1>
      <div className='add-task'>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className='filter-task'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <div className='all-task'>
        {filteredTasks.map((task, index) => (
          <li key={index} className='task-edit'>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <div className="btn">
                <button onClick={handleSaveTask}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
                <div className="btn">
                <button onClick={() => handleToggleTask(index)}>
                  {task.completed ? <i class="fa-regular fa-circle-xmark"></i> : <i class="fa-regular fa-circle-check"></i>}
                </button>
                <button onClick={() => handleEditTask(index)}><i class="fa-regular fa-pen-to-square"></i></button>
                <button onClick={() => handleRemoveTask(index)}><i class="fa-solid fa-trash"></i></button>
                </div>
              </>
            )}
          </li>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
