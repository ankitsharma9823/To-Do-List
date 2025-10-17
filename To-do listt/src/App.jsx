import React, { useState } from 'react'

const App = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  const Todokey = "react_todo"
  const [task, setTask] = useState(()=>{
    const tododata = localStorage.getItem(Todokey)
    if(!tododata) return []
    return JSON.parse(tododata)
  })
 
  localStorage.setItem(Todokey, JSON.stringify(task))

  const submitHandler = (e)=>{
    e.preventDefault()

    if(title.trim() === '' || description.trim() === ''){
      setMessage("Please enter both title & description")
      return
    }

    const copyTask = [...task]
    copyTask.push({title, description})
    setTask(copyTask)

    setTitle('')
    setDescription('')
    setMessage('')
  }

  const Remove = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    setTask(copyTask)
  }

  const RemoveAll = ()=>{
    setTask([])
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">To-Do List</h1>

      {/* Form */}
      <form 
        onSubmit={submitHandler} 
        className="flex flex-col gap-3 w-full max-w-md bg-white text-black p-6 rounded-lg shadow-md border border-gray-300"
      >
        <input
          type="text"
          placeholder="Enter your task title"
          className="border-2 border-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter your task description"
          className="border-2 border-gray-400 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />

        {message && <p className="text-red-600">{message}</p>}

        <button 
          type="submit" 
          className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <h2 className="text-3xl font-bold text-black mt-8 mb-4">Work List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {task.map((elem, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow border border-gray-300 flex flex-col justify-between">
            <h3 className="text-xl text-black font-bold mb-2">{elem.title}</h3>
            <p className="text-black mb-4">{elem.description}</p>
            <button 
              onClick={() => Remove(idx)} 
              className="bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {task.length > 0 && (
        <button 
          onClick={RemoveAll} 
          className="mt-6 bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition"
        >
          Remove All
        </button>
      )}
    </div>
  )
}

export default App
