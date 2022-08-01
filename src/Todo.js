import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")
  const [pageIsJustStartingUp, setPageIsJustStartingUp] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)

  //load local data from localstorage
  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    // to prevent initial trigger of useEffect (when page loads) from 
    // saving / overwriting local storage with nothing
    if (pageIsJustStartingUp) {
      setPageIsJustStartingUp(false)
    } else {
      const temp = JSON.stringify(todos)
      localStorage.setItem("todos", temp)
    }
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    //.
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    // setEditingText("")
  }


  return (
    <div className="App">
      <h1> Todo List

      </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit"> ➕</button>
      </form>
      <button onClick={() => setShowCompleted(!showCompleted)}> {showCompleted ? "hide completed" : "show completed"}</button>
      {todos
        .filter(t => showCompleted ? true : !t.completed)
        .map((todo) => <div key={todo.id}>

          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText} />)
            :
            (<div style={{ textDecoration: todo.completed ? "line-through" : "" }}>{todo.text}</div>)
          }


          <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed} />

          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>☑️</button>
          )
            :
            (
              <button onClick={() => setTodoEditing(todo.id)}>🖊️</button>
            )}
        </div>)}
    </div>
  );
}

export default App;
