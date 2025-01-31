import React from 'react'
import Refer from './Refer'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-4'>To Do App</h1>

        {/* Form */}
        <form action="">
          <input 
            type="text" 
            name='task' 
            placeholder='Task' 
            className="w-full p-2 focus:ps-4 duration-500 focus:border-sky-600 focus:outline focus:outline-sky-600 border border-gray-300 rounded-lg mb-2"
          />

          <input 
            type="text" 
            name='description' 
            placeholder='Description' 
            className="w-full p-2 focus:ps-4 duration-500 focus:border-sky-600 focus:outline focus:outline-sky-600 border border-gray-300 rounded-lg mb-2"
          />
          <button type='submit' className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Add Task</button>
        </form>

      </div>
    </div>
  )
}

export default App
