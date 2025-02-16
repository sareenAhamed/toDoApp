import React, { useEffect, useState } from 'react'


const App = () => {

  const[tasks, setTasks] = useState([])
  const[task, setTask] = useState("")
  const[description, setDescription] = useState("")

  useEffect(() => {
    const fetchToDos = async () => { 
      try {
        const response = await fetch("http://localhost:8080/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchToDos();
  }, []);

  // For Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim() || !description.trim()) {
      alert("Task and Description cannot be empty!");
      return;
    }

    const newTask = {
      task,
      description,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:8080/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const data = await response.json();

      // Update task list
      setTasks([...tasks, data]);

      // Clear input fields
      setTask("");
      setDescription("");

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // For Delete
  const handleDelete = async(id) => {
    try {
      const response = await fetch(`http://localhost:8080/task/${id}`, {
        method: "DELETE",
      })

      if(!response.ok){
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task.id !== id));
      alert("Task successfully deleted!");

    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  }

  // Edit
  
    
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>To Do App</h1>

        {/* Form */}
        <form action="http://localhost:8080/add-task" method='POST'>
          <input 
            type="text" 
            name='task' 
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Task' 
            className="w-full p-2 focus:ps-4 duration-500 focus:border-sky-600 focus:outline focus:outline-sky-600 border border-gray-300 rounded-lg mb-2"
          />

          <input 
            type="text" 
            name='description' 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description' 
            className="w-full p-2 focus:ps-4 duration-500 focus:border-sky-600 focus:outline focus:outline-sky-600 border border-gray-300 rounded-lg mb-2"
          />
          <button type='submit' className="w-full bg-blue-500 text-white p-2 mb-5 rounded-lg hover:bg-blue-600" onClick={handleSubmit}>Add Task</button>
        </form>

        {/* Task List */}

        {tasks.map((task) => (
  <div 
    key={task.id} 
    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 border-l-4 border-blue-500"
  >
    {/* Task Details */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{task.task}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
    
    {/* Buttons */}
    <div className="flex gap-2">
      <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
        ✅ Completed
      </button>
      <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300" onClick={(() => handleDelete(task.id))}>
        🗑️ Delete
      </button>
      <button className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300" onClick={(() => handleEdit(task.id))}>
        ✏️ Edit
      </button>
    </div>
  </div>
))}

        

      </div>
    </div>
  )
}


export default App
