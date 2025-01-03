import { useState } from "react"

interface Todo {
  id: number
  content: string
  status: boolean
}

const App = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingContent, setEditingContent] = useState("")

  const handleAppTodo = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedValue = newTodo.trim()
    if (!trimmedValue) return

    setTodos([...todos, { id: Date.now(), content: trimmedValue, status: false }])

    setNewTodo("")
  }

  const handleToggleStatus = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    ))
  }

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingContent(todo.content)
  }

  const handleUpdate = (id: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedValue = editingContent.trim()
    if (!trimmedValue) return

    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, content: trimmedValue } : todo
    ))
    setEditingId(null)
    setEditingContent("")
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingContent("")
  }

  return (
    <main className="h-screen flex justify-center items-center bg-[url(/bg.svg)] text-lg md:text-xl">
      <div className="w-10/12 max-w-md md:max-w-2xl mx-auto bg-transparent border-4 border-green-600 rounded-2xl backdrop-blur-sm px-8 md:px-20 py-8 md:py-20">
        <div className="">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-orange-800">TypeScript To-Do App</h1>

          <div>
            <form onSubmit={handleAppTodo} className="flex justify-between mt-8">
              <input
                type="text"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                className="w-full px-4 py-2 border-2 border-green-600 rounded-lg focus:outline-none"
                placeholder="Add a new todo..."
              />
              <button
                type="submit"
                disabled={!newTodo.trim()}
                className="px-4 py-2 mx-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-400 transition-colors"
              >Add</button>
            </form>

            <div className="w-full mt-4 md:mt-8 h-80 max-h-[60vh] overflow-y-auto">
              {todos.length === 0 ? (
                <img src="/empty.svg" alt="" className="w-full select-none" />
              ) : (
                <ul className="space-y-2 mt-4">
                  {todos.map(todo => (
                    <li
                      key={todo.id}
                      className="flex justify-between items-center px-4 py-2 bg-green-100 rounded-lg"
                    >
                      {editingId === todo.id ? (
                        <form onSubmit={e => handleUpdate(todo.id, e)} className="flex w-full">
                          <input
                            type="text"
                            value={editingContent}
                            onChange={e => setEditingContent(e.target.value)}
                            className="w-full px-2 py-1 border-2 border-green-600 rounded-lg focus:outline-none"
                          />
                          <button
                            type="submit"
                            className="green-btn"
                          >Update</button>
                          <button
                            type="button"
                            onClick={handleEditCancel}
                            className="red-btn"
                          >Cancel</button>
                        </form>
                      ) : (
                        <>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={todo.status}
                              onChange={() => handleToggleStatus(todo.id)}
                              className="size-5 border-2 border-green-600 rounded checked:bg-orange-400 checked:border-transparent focus:outline-none cursor-pointer mr-4"
                            />
                            <span className={`font-semibold ${todo.status ? "line-through text-gray-500" : "text-gray-800"}`}>
                              {todo.content}
                            </span>
                          </label>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleEdit(todo)}
                              className="green-btn"
                            >Edit</button>
                            <button
                              type="button"
                              onClick={() => handleDelete(todo.id)}
                              className="red-btn"
                            >Delete</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App