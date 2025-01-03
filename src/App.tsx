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
    <main className="h-screen flex justify-center items-center bg-[url(/bg.svg)]">
      <div className="w-10/12 max-w-md md:max-w-2xl mx-auto bg-transparent border-4 border-green-600 rounded-2xl backdrop-blur-sm px-8 md:px-20 py-8 md:py-20">
        <div className="">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-green-600">TypeScript To-Do App</h1>

          <div>
            <form onSubmit={handleAppTodo} className="flex justify-between mt-4">
              <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} className="w-full mr-2 px-4 py-2 border-2 border-green-600 rounded-lg focus:outline-none" placeholder="Add a new todo..." />
              <button type="submit" className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500">Add</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App