import React, { useState } from 'react';
import './TodoApp.css'; // Create a CSS file for styling (TodoApp.css)

const TodoApp = () => {
  const [tasks, setTasks] = useState([]); // State to store the tasks
  const [currentTask, setCurrentTask] = useState(''); // State to store the current task
  const [editIndex, setEditIndex] = useState(null); // State to track the task being edited

  const handleInputChange = (event) => {
    setCurrentTask(event.target.value); // Update the current task as the user types
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentTask !== '') {
      if (editIndex !== null) {
        // If an editIndex exists, update the task at that index
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = {
          ...updatedTasks[editIndex],
          task: currentTask,
        };
        setTasks(updatedTasks);
        setEditIndex(null); // Clear the editIndex
      } else {
        setTasks([...tasks, { task: currentTask, status: 'pending' }]); // Add the current task to the tasks array with a default status of 'pending'
      }
      setCurrentTask(''); // Clear the input field
    }
  };

  const handleEdit = (index) => {
    setCurrentTask(tasks[index].task); // Set the current task as the selected task to edit
    setEditIndex(index); // Set the index of the task being edited
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Remove the task at the specified index
    setTasks(updatedTasks);
  };

  const toggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      status: updatedTasks[index].status === 'pending' ? 'completed' : 'pending', // Toggle the status between 'pending' and 'completed'
    };
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={currentTask}
          onChange={handleInputChange}
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
      </form>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className={`task ${task.status}`}>
            <span>{task.task}</span>
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => toggleStatus(index)}>
                {task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;