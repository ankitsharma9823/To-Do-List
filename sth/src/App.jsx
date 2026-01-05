import React, { useState } from 'react'
import { Trash2, Edit2 } from 'lucide-react'

const App = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const Todokey = "react_todo"
  const [task, setTask] = useState(() => {
    const tododata = localStorage.getItem(Todokey)
    return tododata ? JSON.parse(tododata) : []
  })

  localStorage.setItem(Todokey, JSON.stringify(task))

  const submitHandler = (e) => {
    e.preventDefault()

    if (!title.trim() || !description.trim()) {
      setMessage("Please enter both title & description")
      return
    }

    const copyTask = [...task]
    if (editingIndex !== null) {
      copyTask[editingIndex] = { title, description }
      setEditingIndex(null)
    } else {
      copyTask.push({ title, description })
    }

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

  const RemoveAll = () => setTask([])

  const Edit = (idx) => {
    setTitle(task[idx].title)
    setDescription(task[idx].description)
    setEditingIndex(idx)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">To-Do List</h1>

      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 w-full max-w-md bg-white text-black p-6 rounded-lg shadow-lg border border-gray-300"
      >
        <input
          type="text"
          placeholder="Enter your task title"
          className="border-2 border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter your task description"
          className="border-2 border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />

        {message && <p className="text-red-600">{message}</p>}

        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition flex items-center justify-center gap-2"
        >
          {editingIndex !== null ? "Update" : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <h2 className="text-3xl font-bold text-black mt-8 mb-4">Work List</h2>
      {task.length === 0 ? (
        <p className="text-gray-500 text-lg">No tasks yet. Add your first task!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {task.map((elem, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between hover:shadow-lg transition group"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{elem.title}</h3>
                <p className="text-gray-700 mb-4">{elem.description}</p>
              </div>

              <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => Edit(idx)}
                  className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white transition"
                  title="Edit Task"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => Remove(idx)}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded text-white transition"
                  title="Remove Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
