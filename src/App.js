import React, {useState, useEffect, useRef } from 'react';
import './App.css';
import {v4 as uuidv4} from "uuid"

function App() {

const firstRender = useRef(true)

const [inputValue, setInputValue] = useState("")
const [todos, setTodos] = useState([])
const [buttonName, setButtonName] = useState("Add")
const [itemId, setItemId] = useState()
const [checked, setChecked] = useState(false)

const addTodo = (e) => {
  e.preventDefault()
  if(buttonName==="Edit") {
    let ls = JSON.parse(localStorage.getItem("Todo"))
    ls.map(val => {
      if(val.id===itemId) {
       val.text=inputValue
      }
    })
    setTodos(ls)
    setInputValue("")
    setButtonName("Add")
  } else if (inputValue.trim() === "") {
    return;
  } else  {
    setTodos([...todos, {
    text: inputValue,
    id: uuidv4(),
    check: false
  }])
  setInputValue("")
  }
}

const removetodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id))
}

const donetodo = (id) => {
  setItemId(id)
  setChecked(true)
}

const edittodo = (id) => {
  let result = todos.filter(todo => todo.id === id)
  setInputValue(result.map(val => val.text))
  setButtonName("Edit")
  setItemId(id)
}

useEffect(() => {
  if (firstRender.current) {
    firstRender.current = false
  } else if (checked === true) {
    let ls = JSON.parse(localStorage.getItem("Todo"))
    ls.map(val => {
      if(val.id===itemId) {
       val.check=!val.check
      }
    })
    setTodos(ls)
    setChecked(false)
  } else {
    localStorage.setItem("Todo", JSON.stringify([...todos]))
  }
}, [todos, checked])

useEffect(() => {
  if (localStorage.getItem("Todo") !== null) {
    const newTodos = localStorage.getItem("Todo")
    setTodos(JSON.parse([...todos, newTodos]))  
  }
}, [])

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input
            autoFocus
            type="text"
            placeholder="Add task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">{buttonName}</button>
        </form>
        {todos.map(todo => (
          <div key={todo.id} className="todo">
            <p>{ todo.check === true ? (<p className="todo_item"> {todo.text} </p>) : (<p>{todo.text}</p>) }</p>
            <div className="todoIcons">
            <i onClick={() => edittodo(todo.id)} className="fas fa-edit"></i>
            <i onClick={() => donetodo(todo.id)} className="far fa-check-square"></i>
            <i onClick={() => removetodo(todo.id)} className="fas fa-trash-alt"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
