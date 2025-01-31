import React, { useState } from 'react';

const Refer = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ task: '', description: '', completed: false });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Add a new task
  const addTask = () => {
    if (newTask.task.trim() === '') return; // Prevent empty tasks
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ task: '', description: '', completed: false }); // Reset form
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">To-Do App</h1>

        {/* Add Task Form */}
        <div className="mb-6">
          <input
            type="text"
            name="task"
            value={newTask.task}
            onChange={handleInputChange}
            placeholder="Task"
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
          <button
            onClick={addTask}
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 mb-2 border border-gray-300 rounded-lg flex justify-between items-center ${
                task.completed ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <div>
                <h3 className={`font-bold ${task.completed ? 'line-through' : ''}`}>
                  {task.task}
                </h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleCompletion(task.id)}
                  className={`p-2 rounded-lg ${
                    task.completed
                      ? 'bg-yellow-500 hover:bg-yellow-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Refer;